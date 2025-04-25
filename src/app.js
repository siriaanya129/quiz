import './app.css';
import React, { useState } from 'react';
import { questions } from './questions';

function App() {
  const [started, setStarted] = useState(false);
  const [nameStep, setNameStep] = useState(false);
  const [userName, setUserName] = useState('');
  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  function getQuestionScore(isCorrect, difficulty) {
    if (isCorrect) {
      if (difficulty === 'easy') return 2;
      if (difficulty === 'medium') return 4;
      if (difficulty === 'hard') return 6;
    } else {
      if (difficulty === 'easy') return -4;
      if (difficulty === 'medium') return -2;
      if (difficulty === 'hard') return -1;
    }
    return 0;
  }

  async function handleAnswer(selectedIndex) {
    const q = questions[current];
    const isCorrect = selectedIndex === q.answer;
    const questionScore = getQuestionScore(isCorrect, q.difficulty);

    setScore(prev => prev + questionScore);
    setUserAnswers(prev => [
      ...prev,
      {
        question: q.question,
        difficulty: q.difficulty,
        type: q.type,
        selectedOption: q.options[selectedIndex],
        correctOption: q.options[q.answer],
        isCorrect,
        score: questionScore,
      }
    ]);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      // SUBMISSION HANDLER: Save responses as JSON (without name)
      const responseData = {
        timestamp: new Date().toISOString(),
        responses: [
          ...userAnswers,
          {
            question: q.question,
            difficulty: q.difficulty,
            type: q.type,
            selectedOption: q.options[selectedIndex],
            correctOption: q.options[q.answer],
            isCorrect,
            score: questionScore,
          }
        ]
      };
      try {
        await fetch('/api/saveResponse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ responseData })
        });
      } catch (err) {
        // You can show an error message to the user if needed
        console.error('Failed to save response:', err);
      }
      setShowScore(true);
    }
  }

  // Welcome page
  if (!started) {
    return (
      <div className="quiz-viewport">
        <div className="welcome-container">
        <h1>Hello people I'm Siri Kumar, the same boring Big dude from class </h1>
          <h1> I just got promoted to a prof. so I'm gonna take a quick test on your 3rd sem course Stats!.. </h1>
          <p>
            Just kidding <br /> I need your help as samples for my main EL.. You can take a screenshot of this page and use it to blackmail me into manual labour I would help you in any way possible but before that i sincerely ask for your help!... <br /> Click below to start.<br />
            <b>Rules:</b> Correct: Easy(+2), Medium(+4), Hard(+6).<br />
            Wrong: Easy(-4), Medium(-2), Hard(-1).
          </p>
          <button className="start-btn" onClick={() => setStarted(true)}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Name input page
  if (started && !nameStep) {
    return (
      <div className="quiz-viewport">
        <div className="name-container">
          <h2>Try to be Anonymous</h2>
          <input
            className="name-input"
            type="text"
            placeholder="Your nick-name"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <button
            className="next-btn"
            onClick={() => setNameStep(true)}
            disabled={userName.trim().length === 0}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // Results page
  if (showScore) {
    return (
      <div className="quiz-viewport">
        <div className="result-card">
          <h2>Thank you, {userName}!</h2>
          <div className="result-score">Your Score: {score}</div>
          <button className="start-btn" onClick={() => window.location.reload()}>Retry Quiz</button>
          <div className="answers-list">
            <h3>Review:</h3>
            <ul>
              {userAnswers.map((ans, idx) => (
                <li key={idx}>
                  <strong>Q:</strong> {ans.question}<br />
                  <span>
                    <strong>Your answer:</strong> {ans.selectedOption} &nbsp;
                    <strong>Correct:</strong> {ans.correctOption} &nbsp;
                    <strong>Score:</strong> {ans.score}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Quiz page
  const q = questions[current];
  return (
    <div className="quiz-viewport">
      <div className="quiz-container">
        <div className="question-card">
          <h3>Question {current + 1} / {questions.length}</h3>
          <h4>{q.question}</h4>
          <div className="options-grid">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                className="option-btn"
                onClick={() => handleAnswer(idx)}
              >
                {option}
              </button>
            ))}
          </div>
          <div style={{marginTop: 16, color: '#888', fontSize: 14}}>
            <em>Difficulty: {q.difficulty}, Type: {q.type}</em>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
