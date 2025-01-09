const Question = require("../models/Question");


const createQuestion = async (req, res) => {
  try {
    const { questionText, options, correctAnswer } = req.body;
    const question = new Question({
      questionText,
      options,
      correctAnswer,
    });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createQuestion, getAllQuestions };
