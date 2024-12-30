// src/components/PersonalityQuiz.js
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './PersonalityQuiz.css';

const questions = [
  { id: 1, text: "Tends to be quiet.", reverse: true, domain: "extraversion" },
  { id: 2, text: "Is compassionate, has a soft heart.", domain: "agreeableness" },
  { id: 3, text: "Tends to be disorganized.", reverse: true, domain: "conscientiousness" },
  { id: 4, text: "Worries a lot.", domain: "negativeEmotionality" },
  { id: 5, text: "Is fascinated by art, music, or literature.", domain: "openMindedness" },
  { id: 6, text: "Is dominant, acts as a leader.", domain: "extraversion" },
  { id: 7, text: "Is sometimes rude to others.", reverse: true, domain: "agreeableness" },
  { id: 8, text: "Has difficulty getting started on tasks.", reverse: true, domain: "conscientiousness" },
  { id: 9, text: "Tends to feel depressed, blue.", domain: "negativeEmotionality" },
  { id: 10, text: "Has little interest in abstract ideas.", reverse: true, domain: "openMindedness" },
  { id: 11, text: "Is full of energy.", domain: "extraversion" },
  { id: 12, text: "Assumes the best about people.", domain: "agreeableness" },
  { id: 13, text: "Is reliable, can always be counted on.", domain: "conscientiousness" },
  { id: 14, text: "Is emotionally stable, not easily upset.", reverse: true, domain: "negativeEmotionality" },
  { id: 15, text: "Is original, comes up with new ideas.", domain: "openMindedness" },
  { id: 16, text: "Is outgoing, sociable.", domain: "extraversion" },
  { id: 17, text: "Can be cold and uncaring.", reverse: true, domain: "agreeableness" },
  { id: 18, text: "Keeps things neat and tidy.", domain: "conscientiousness" },
  { id: 19, text: "Is relaxed, handles stress well.", reverse: true, domain: "negativeEmotionality" },
  { id: 20, text: "Has few artistic interests.", reverse: true, domain: "openMindedness" },
  { id: 21, text: "Prefers to have others take charge.", reverse: true, domain: "extraversion" },
  { id: 22, text: "Is respectful, treats others with respect.", domain: "agreeableness" },
  { id: 23, text: "Is persistent, works until the task is finished.", domain: "conscientiousness" },
  { id: 24, text: "Feels secure, comfortable with self.", reverse: true, domain: "negativeEmotionality" },
  { id: 25, text: "Is complex, a deep thinker.", domain: "openMindedness" },
  { id: 26, text: "Is less active than other people.", reverse: true, domain: "extraversion" },
  { id: 27, text: "Tends to find fault with others.", reverse: true, domain: "agreeableness" },
  { id: 28, text: "Can be somewhat careless.", reverse: true, domain: "conscientiousness" },
  { id: 29, text: "Is temperamental, gets emotional easily.", domain: "negativeEmotionality" },
  { id: 30, text: "Has little creativity.", reverse: true, domain: "openMindedness" }
];

const domainDescriptions = {
  extraversion: "Extraversion represents your energy and enthusiasm in social situations.",
  agreeableness: "Agreeableness reflects how you interact with and treat others.",
  conscientiousness: "Conscientiousness shows your organization and responsibility levels.",
  negativeEmotionality: "Negative Emotionality indicates your emotional sensitivity and stability.",
  openMindedness: "Open-Mindedness reflects your curiosity and creativity."
};

const PersonalityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion]: value
    });
  };

  const calculateResults = () => {
    const scores = {
      extraversion: [],
      agreeableness: [],
      conscientiousness: [],
      negativeEmotionality: [],
      openMindedness: []
    };

    questions.forEach((question, index) => {
      if (answers[index] !== undefined) {
        let score = parseInt(answers[index]);
        if (question.reverse) {
          score = 6 - score; // Reverse scoring
        }
        scores[question.domain].push(score);
      }
    });

    const results = Object.entries(scores).map(([domain, scores]) => {
      const average = scores.length > 0 
        ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)
        : 0;
      return {
        domain: domain.charAt(0).toUpperCase() + domain.slice(1),
        score: parseFloat(average),
        description: domainDescriptions[domain]
      };
    });

    return results;
  };

  if (showResults) {
    const results = calculateResults();
    
    return (
      <div className="quiz-card">
        <div className="quiz-header">
          <h2>Your Personality Profile</h2>
        </div>
        <div className="quiz-content">
          <div className="chart-container">
            <BarChart width={600} height={250} data={results}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="domain" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="score" fill="#4f46e5" />
            </BarChart>
          </div>
          
          <div className="results-container">
            {results.map((result, index) => (
              <div key={index} className="result-item">
                <div className="result-header">
                  <h3>{result.domain}</h3>
                  <span>{result.score}/5</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${result.score * 20}%` }} 
                  />
                </div>
                <p>{result.description}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => {
              setShowResults(false);
              setAnswers({});
              setCurrentQuestion(0);
            }}
            className="quiz-button"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <h2>Question {currentQuestion + 1} of {questions.length}</h2>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
      <div className="quiz-content">
        <p className="question-text">{questions[currentQuestion].text}</p>
        <div className="radio-group">
          {[
            ["1", "Disagree strongly"],
            ["2", "Disagree a little"],
            ["3", "Neutral; no opinion"],
            ["4", "Agree a little"],
            ["5", "Agree strongly"]
          ].map(([value, label]) => (
            <label key={value} className="radio-option">
              <input
                type="radio"
                name="answer"
                value={value}
                checked={answers[currentQuestion] === value}
                onChange={(e) => handleAnswer(e.target.value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        
        <div className="button-group">
          <button 
            onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className="quiz-button secondary"
          >
            Previous
          </button>
          <button 
            onClick={() => {
              if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
              } else {
                setShowResults(true);
              }
            }}
            disabled={!answers[currentQuestion]}
            className="quiz-button primary"
          >
            {currentQuestion < questions.length - 1 ? 'Next' : 'Show Results'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalityQuiz;