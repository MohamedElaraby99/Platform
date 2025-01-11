const Exam = require("../models/Exam");
const Submission = require("../models/SubmitExam");

const getExamsWithScores = async (req, res) => {
  try {
    const { user_id, stage } = req;
    console.log({ user_id, stage });
    

    // Fetch all exams
    const exams = await Exam.find({ stage });

    // Fetch user's submissions
    const submissions = await Submission.find({ userId: user_id });

    // Create a map of examId to user submissions for fast lookup
    const submissionMap = submissions.reduce((acc, submission) => {
      acc[submission.examId.toString()] = submission;
      return acc;
    }, {});

    const currentTime = new Date();

    // Process exams to include status, scores, and attendance
    const examsWithScores = exams.map((exam) => {
      const examStartTime = exam.date;
      const examEndTime = new Date(exam.date.getTime() + exam.duration * 60000);

      // Determine exam status
      const status =
        currentTime < examStartTime
          ? "قادم" // Upcoming
          : currentTime >= examStartTime && currentTime <= examEndTime
          ? "متاح" // Active
          : "انتهى"; // Ended

      // Get user's submission for this exam, if it exists
      const userSubmission = submissionMap[exam._id.toString()];

      // Calculate user score and attendance
      const userScore =
        status === "متاح" || status === "انتهى"
          ? userSubmission?.score || null
          : null;

      const attendance =
        status === "انتهى" && !userSubmission ? "لم يحضر" : null;

      return {
        id: exam._id,
        title: exam.title,
        description: exam.description,
        date: exam.date,
        duration: exam.duration,
        questionsCount: exam.questions.length,
        questions: status === "قادم" ? [] : exam.questions, // Show questions only if not upcoming
        userScore,
        attendance,
        status,
      };
    });

    res.status(200).json(examsWithScores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching exams and scores" });
  }
};

const addExam = async (req, res) => {
  try {
    const { title, description, date, duration, questions, stage } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: "Exam title is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Exam description is required" });
    }
    if (!date) {
      return res.status(400).json({ message: "Exam date is required" });
    }
    if (!stage) {
      return res.status(400).json({ message: "Exam stage is required" });
    }
    if (!duration || duration <= 0) {
      return res
        .status(400)
        .json({ message: "Valid exam duration is required" });
    }
    if (!Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one question is required" });
    }

    // Validate questions
    for (const question of questions) {
      const { text, options, correctAnswer } = question;
      if (!text) {
        return res.status(400).json({ message: "Question text is required" });
      }
      if (!Array.isArray(options) || options.length < 2) {
        return res
          .status(400)
          .json({ message: "Each question must have at least two options" });
      }
      if (
        correctAnswer == null ||
        correctAnswer < 0 ||
        correctAnswer >= options.length
      ) {
        return res.status(400).json({
          message: "Correct option must be a valid index within the options",
        });
      }
    }

    // Create new exam document
    const newExam = new Exam({
      title,
      description,
      date: new Date(date), // Ensure the date is a valid Date object
      duration,
      questions,
      stage,
    });

    // Save to database
    await newExam.save();

    res.status(201).json(newExam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating exam" });
  }
};

const submitExam = async (req, res) => {
  try {
    const { user_id } = req; // From middleware
    const { exam_id, answers } = req.body;

    // Fetch the exam
    const exam = await Exam.findById(exam_id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Check if the student has already submitted the exam
    const existingSubmission = await Submission.findOne({ user_id, exam_id });
    if (existingSubmission) {
      return res.status(400).json({
        message: "You have already submitted this exam.",
        score: existingSubmission.score, // Optionally return the previous score
      });
    }

    // Calculate the score
    let score = 0;
    const detailedAnswers = answers.map((answer) => {
      const question = exam.questions.id(answer.questionId);
      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) score++;
      return {
        questionId: question._id,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
      };
    });

    // Save new submission
    const submission = new Submission({
      user_id,
      exam_id,
      answers: detailedAnswers,
      score,
    });
    await submission.save();

    res.status(201).json({
      message: "Exam submitted successfully",
      score,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting exam" });
  }
};

const updateExam = async (req, res) => {
  const { id } = req.params; // Exam ID from URL parameters
  const { title, description, date, duration, questions, stage } = req.body;

  try {
    // Validate required fields
    if (!title && !description && !date && !duration && !questions && !stage) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    // Fetch the existing exam
    const existingExam = await Exam.findById(id);
    if (!existingExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Validate questions if provided
    if (questions) {
      for (const question of questions) {
        const { text, options, correctAnswer } = question;
        if (!text) {
          return res.status(400).json({ message: "Question text is required" });
        }
        if (!Array.isArray(options) || options.length < 2) {
          return res.status(400).json({
            message: "Each question must have at least two options",
          });
        }
        if (
          correctAnswer == null ||
          correctAnswer < 0 ||
          correctAnswer >= options.length
        ) {
          return res.status(400).json({
            message: "Correct answer must be a valid index within options",
          });
        }
      }
    }

    // Update exam fields
    if (title) existingExam.title = title;
    if (description) existingExam.description = description;
    if (date) existingExam.date = new Date(date);
    if (duration) existingExam.duration = duration;
    if (questions) existingExam.questions = questions;
    if (stage) existingExam.stage = stage;

    // Save updated exam
    const updatedExam = await existingExam.save();

    res.status(200).json({
      message: "Exam updated successfully",
      exam: updatedExam,
    });
  } catch (error) {
    console.error("Error updating exam:", error);
    res.status(500).json({ message: "Error updating exam" });
  }
};

const deleteExam = async (req, res) => {
  const { id } = req.params; // Exam ID from URL

  try {
    // Find and delete the exam
    const exam = await Exam.findByIdAndDelete(id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Delete all submissions related to the exam
    await Submission.deleteMany({ examId: id });

    res.status(200).json({
      message: "Exam and associated submissions deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ message: "Error deleting exam" });
  }
};

module.exports = {
  getExamsWithScores,
  addExam,
  updateExam,
  deleteExam,
  submitExam,
};
