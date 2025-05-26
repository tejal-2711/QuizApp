import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { PieChart } from "react-minimal-pie-chart";

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/questions")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  const handleChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handleSubmit = () => {
    const orderedAnswers = questions.map((q) => answers[q.id]);
    axios
      .post("http://localhost:3001/api/submit", { answers: orderedAnswers })
      .then((res) => setScore(res.data.score))
      .catch((err) => console.error("Error submitting answers:", err));
  };

  const data = [
    { title: "Right answers", value: score, color: "#29636b" },
    {
      title: "Total questions",
      value: questions.length - score,
      color: "#dd6ceb",
    },
  ];

  return (
    <div className="quiz">
      <h1>Quiz App</h1>
      <div className="questions">
        {questions.map((q) => (
          <div key={q.id}>
            <p>{q.question}</p>
            {q.options.map((opt) => (
              <label key={opt}>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={opt}
                  onChange={() => handleChange(q.id, opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {score !== null && (
        <h3>
          Your Score: {score}/{questions.length}
        </h3>
      )}

      <PieChart
        data={[
          { title: "Correct", value: score, color: "#4caf50" },
          { title: "Wrong", value: questions.length - score, color: "#f44336" },
        ]}
        totalValue={questions.length}
        lineWidth={20}
        label={() => `${Math.round((score / questions.length) * 100)}%`}
        labelStyle={{
          fontSize: "15px",
          fontWeight: "bold",
          fill: "#333",
        }}
        labelPosition={0}
        style={{ height: "170px" }}
      />
    </div>
  );
}

export default App;
