const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Allow requests from different origins (e.g., React on port 3000)
app.use(express.json()); // Parse incoming JSON bodies

// Dummy quiz data
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "2 + 2 equals?",
    options: ["3", "4", "5", "22"],
    correctAnswer: "4",
  },
];

// Health check / root endpoint
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Get all questions (hides correct answers)
app.get("/api/questions", (req, res) => {
  const safeQuestions = questions.map(({ correctAnswer, ...rest }) => rest);
  res.json(safeQuestions);
});

// Submit answers and return score
app.post("/api/submit", (req, res) => {
  const { answers } = req.body;
  let score = 0;

  questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      score++;
    }
  });

  res.json({ score });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
