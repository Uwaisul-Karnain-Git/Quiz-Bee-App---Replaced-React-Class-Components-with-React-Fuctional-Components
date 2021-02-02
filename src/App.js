import './assets/style.css';
import quizService from './quizService';
import { useState, useEffect } from 'react';
import QuestionBox from './components/QuestionBox';
import Results from './components/Results';

function App() {
  const [questionBank, setQuestionBank] = useState([]);
  const [score, setScore] = useState(0);
  const [responses, setResponses] = useState(0);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = () => {
    quizService().then(question => {
      setQuestionBank(question);
    })      
  };

  const computeAnswer = (answer, correctAnswer) => {
    if(answer === correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }

    setResponses(prevResponses => prevResponses < 5 ? (prevResponses + 1) : 5);
  };

  const playAgain = () => {
    getQuestions();
    setScore(0);
    setResponses(0);
  };

  return (
    <div className="container">
      <div className="title">
        QuizBee
      </div>

      {questionBank.length > 0 && responses < 5 && 
        questionBank.map(
          ({question, answers, correct, questionId}) => 
            //<h4 key={questionId}>{question}</h4>
            <QuestionBox 
              key={questionId} 
              question={question} 
              option={answers} 
              selected={answer => computeAnswer(answer, correct)}
            />
        )
      }

    {/* Display Answers */}
    {
      //responses === 5 ? (<h2>{score}</h2>) : null
      responses === 5 ? <Results score={score} playAgain={playAgain} /> : null
    }
    </div>
  );
}

export default App;
