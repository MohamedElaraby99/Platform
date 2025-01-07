require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConnect");
const allowedOrigins = require("./config/allowedOrigins");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")

const PORT = process.env.PORT || 8000;

const app = express();

connectDB();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")))
console.log(path.join(__dirname, ".", "views", "404.html"));

app.use("/", require("./routes/root"))
app.use("/auth", require("./routes/authRoutes"))
app.use("/users", require("./routes/userRoutes"))

app.all("*", (req, res)=>{
    res.status(404)
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, ".", "views", "404.html"))
    }else if(req.accepts("json")){
        res.json({message: "404 Not Found"})
    }else{
        res.type("txt").send("404 Not Found")
    }
})

mongoose.connection.once("open", () => {
  console.log("Connect on MongoDB");
  app.listen(PORT, () => {
    console.log(`server runing on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});


