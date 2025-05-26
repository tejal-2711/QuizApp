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
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Hippopotamus", "Giraffe", "Blue Whale"],
    correctAnswer: "Blue Whale",
  },
  {
    id: 3,
    question: "What is the capital city of Australia?",
    options: ["Brisbane", "Melbourne", "Canberra", "Sydney"],
    correctAnswer: "Canberra",
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    id: 5,
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    correctAnswer: "Diamond",
  },
  {
    id: 6,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2",
  },
];

app.get("/", (req, res) => {
  res.send("Backend is running");
});

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
