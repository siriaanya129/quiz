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
  const [emailChecked, setEmailChecked] = useState(false);
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

  // Validate Gmail format
  function isValidGmail(email) {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  }

  // Check Firestore for existing attempt
  async function handleEmailNext() {
    setEmailError('');
    setEmailChecked(false);
    if (!isValidGmail(userEmail)) {
      setEmailError('Please enter a valid Gmail address.');
      return;
    }
    // Query Firestore for this email
    const responsesRef = collection(db, "quizResponses");
    const q = query(responsesRef, where("gmail", "==", userEmail.trim().toLowerCase()));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setAlreadyAttempted(true);
    } else {
      setEmailChecked(true);
      setNameStep(true);
    }
  }

  // Save responses to Firestore (add Gmail)
  async function saveQuizResponse(finalAnswers) {
    const responseData = {
      timestamp: new Date().toISOString(),
      gmail: userEmail.trim().toLowerCase(), // Save Gmail for attempt check
      responses: finalAnswers
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
        question: q.question,
        difficulty: q.difficulty,
        type: q.type,
        selectedOption: q.options[selectedIndex],
        correctOption: q.options[q.answer],
        isCorrect,
        score: questionScore,
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
        <h1>Hello people I'm Siri Kumar, the same boring Big dude from class </h1>
          <h1> I just got promoted to a prof. so I'm gonna take a quick test on your 3rd sem course Stats!.. </h1>
          <p>
            Just kidding <br /> I need your help as samples for my main EL.. You can take a screenshot of this page and use it to blackmail me into manual labour I would help you in any way possible but before that i sincerely ask for your help!... <br /> <br /> Click below to start.<br /><br />
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

  // Gmail input page
  if (started && !emailStep) {
    return (
      <div className="quiz-viewport">
        <div className="name-container">
          <h2>Enter Your Gmail</h2>
          <input
            className="name-input"
            type="email"
            placeholder="youraddress@gmail.com"
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
            disabled={alreadyAttempted}
          />
          <button
            className="next-btn"
            onClick={handleEmailNext}
            disabled={userEmail.trim().length === 0 || alreadyAttempted}
          >
            Next
          </button>
          {emailError && <div style={{ color: "#c62828", marginTop: 10 }}>{emailError}</div>}
          {alreadyAttempted && (
            <div style={{ color: "#c62828", marginTop: 14, fontWeight: 600 }}>
              This Gmail has already attempted the quiz.<br />Only one attempt is allowed.
            </div>
          )}
        </div>
      </div>
    );
  }

  // Name input page (optional, keep if you want to display name in UI)
  if (nameStep && !showScore) {
    return (
      <div className="quiz-viewport">
        <div className="name-container">
          <h2>Enter Your Name</h2>
          <input
            className="name-input"
            type="text"
            placeholder="Your name"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <button
            className="next-btn"
            onClick={() => setEmailStep(true)}
            disabled={userName.trim().length === 0}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // Results page (no retry button)
  if (showScore) {
    return (
      <div className="quiz-viewport">
        <div className="result-card">
          <h2>Thank you, {userName}!</h2>
          <div className="result-score">Your Score: {score}</div>
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
