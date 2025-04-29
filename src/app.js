import './app.css';
import React, { useState } from 'react';
import { questions } from './questions';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [started, setStarted] = useState(false);
  const [emailStep, setEmailStep] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);
  const [userName, setUserName] = useState('');
  const [nameStep, setNameStep] = useState(false);
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

  // Updated: Validate allowed email domains
  function isValidEmail(email) {
    const trimmed = email.trim().toLowerCase();
    // Regex for valid email structure
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com|xyz\.edu\.in)$/;
    return emailRegex.test(trimmed);
  }

  async function handleEmailNext() {
    setEmailError('');
    if (!isValidEmail(userEmail)) {
      setEmailError('Please enter a valid Gmail, Hotmail, Yahoo, or xyz.edu.in email address.');
      return;
    }
    // Query Firestore for this email
    const responsesRef = collection(db, "quizResponses");
    const q = query(responsesRef, where("gmail", "==", userEmail.trim().toLowerCase()));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setAlreadyAttempted(true);
    } else {
      setEmailStep(true);
    }
  }

  // Save responses to Firestore with only required fields and final score
  async function saveQuizResponse(finalAnswers) {
    // Map each answer to only required fields
    const trimmedAnswers = finalAnswers.map(ans => ({
      difficulty: ans.difficulty,
      type: ans.type,
      isCorrect: ans.isCorrect
    }));

    // Calculate the final score
    const finalScore = finalAnswers.reduce((sum, ans) => sum + (ans.score || 0), 0);

    const responseData = {
      timestamp: new Date().toISOString(),
      gmail: userEmail.trim().toLowerCase(),
      responses: trimmedAnswers,
      finalScore
    };

    try {
      await addDoc(collection(db, "quizResponses"), responseData);
    } catch (err) {
      console.error('Failed to save response to Firestore:', err);
    }
  }

  async function handleAnswer(selectedIndex) {
    const q = questions[current];
    const isCorrect = selectedIndex === q.answer;
    const questionScore = getQuestionScore(isCorrect, q.difficulty);
    setScore(prev => prev + questionScore);
    const newUserAnswers = [
      ...userAnswers,
      {
        // Only these fields are needed for storage now, but we keep others for UI if needed
        difficulty: q.difficulty,
        type: q.type,
        isCorrect,
        score: questionScore,
        // The following fields are not stored in Firebase anymore
        question: q.question,
        selectedOption: q.options[selectedIndex],
        correctOption: q.options[q.answer],
      }
    ];
    setUserAnswers(newUserAnswers);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      await saveQuizResponse(newUserAnswers);
      setShowScore(true);
    }
  }

  // Welcome page
  if (!started) {
    return (
      <div className="quiz-viewport">
        <div className="welcome-container">
          <h1>Hey People Welcome to Stats quiz!..</h1>
          <p>
            I need your help as samples for my main EL.. You can take a screenshot of this page and use it to blackmail me into manual labour I would help you in any way possible but before that i sincerely ask for your help!...
          </p>
          <button className="start-btn" onClick={() => setStarted(true)}>
            Click below to start.
          </button>
          <div style={{ marginTop: 32, textAlign: 'left' }}>
            <b>Rules:</b>
            <ul>
              <li>Correct Answer: Easy(+2), Medium(+4), Hard(+6).</li>
              <li>Wrong Answer: Easy(-4), Medium(-2), Hard(-1).</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Email step
  if (!emailStep) {
    return (
      <div className="quiz-viewport">
        <div className="name-container">
          <h2>Enter your Email to continue</h2>
          <input
            className="name-input"
            type="email"
            placeholder="yourname@gmail.com"
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
            disabled={alreadyAttempted}
          />
          {emailError && <div style={{ color: 'red', marginBottom: 8 }}>{emailError}</div>}
          {alreadyAttempted && (
            <div style={{ color: 'red', marginBottom: 8 }}>
              You have already attempted this quiz.
            </div>
          )}
          <button
            className="next-btn"
            onClick={handleEmailNext}
            disabled={alreadyAttempted}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // Name step (if you want to collect name, otherwise skip)
  if (!nameStep) {
    return (
      <div className="quiz-viewport">
        <div className="name-container">
          <h2>Enter your Name</h2>
          <input
            className="name-input"
            type="text"
            placeholder="Your name"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <button
            className="next-btn"
            onClick={() => setNameStep(true)}
            disabled={!userName.trim()}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // Quiz page
  if (!showScore) {
    const q = questions[current];
    return (
      <div className="quiz-viewport">
        <div className="quiz-container">
          <div className="question-card">
            <h3>Question {current + 1} of {questions.length}</h3>
            <h4>{q.question}</h4>
            <div className="options-grid">
              {q.options.map((opt, idx) => (
                <button
                  className="option-btn"
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 14, color: '#1976d2' }}>
              <b>Difficulty:</b> {q.difficulty} &nbsp; <b>Type:</b> {q.type}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Result page
  return (
    <div className="quiz-viewport">
      <div className="result-card">
        <h2>Quiz Complete!</h2>
        <div className="result-score">Your Score: {score}</div>
        <div className="answers-list">
          <ul>
            {userAnswers.map((ans, idx) => (
              <li key={idx}>
                <b>Q{idx + 1}:</b> {ans.isCorrect ? "Correct" : "Wrong"} &mdash; <b>Type:</b> {ans.type}, <b>Difficulty:</b> {ans.difficulty}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
