'use client'
import React, { useState } from "react";
import quizzes from "../quiz/data"
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

const Page = ({quizId}) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
  });

  

 // Récupérez les questions et les réponses du quiz sélectionné en fonction de l'identifiant
 const { questions } = quizzes[`quiz${quizId}`]; // Utilisez l'identifiant pour accéder au bon quiz
  const { question, answers, correctAnswer } = questions[activeQuestion];

  const onAnswerSelected = (answer, idx) =>{
    setSelectedAnswerIndex(idx)
    if(answer === correctAnswer){
        setResult((prev) => ({
          ...prev,
          score: prev.score + 5,
          correctAnswer: prev.correctAnswer + 1
        }));
    }else{
        setResult((prev) => ({
          ...prev,
          wrongAnswer: prev.wrongAnswer + 1
        }));
    }
  }

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    if(activeQuestion !== questions.length - 1){
        setActiveQuestion((prev) => prev + 1);
    }else{
        setShowResult(true);
    }
  }

  const resetQuiz = () => {
    setActiveQuestion(0);
    setShowResult(false);
    setResult({
      score: 0,
      correctAnswer: 0,
      wrongAnswer: 0
    });
  }

  return (
    <body className="bg-secondary-subtle">
      <nav className="bg-dark p-3">
        <h2 className="text-light">Quiz - App</h2>
      </nav>
      <div className="row">
        <div className="col-3"></div>
      <div className=" bg-secondary col-6 pb-5 rounded mt-4">
      <div className="container ">
        
        <div>
          <h2 className=" text-light p-4">
            Question : {activeQuestion + 1} <span>/{questions.length}</span>
          </h2>
        </div>
        <div className="row">
          {!showResult ? (
            <div className="col-8 container bg-light p-5 rounded ">
               <h3 className="text-dark mb-4">{question}</h3>
<div className="bg-light-subtle">
<ul className="list-unstyled">
  {answers.map((answer, idx) => (
     <li
     key={idx}
     onClick={() => onAnswerSelected(answer, idx)}
     className={`py-2 px-3 mb-2 rounded ${
       selectedAnswerIndex === idx
         ? "bg-info text-light"
         : "bg-secondary-subtle text-dark"
     }`}
     style={{ cursor: "pointer" }} // Ajoutez cette ligne pour définir le curseur
   >
     {answer}
   </li>
  ))}
</ul>
</div>
              <button onClick={nextQuestion} className="btn btn-warning" disabled={selectedAnswerIndex === null}>
                {activeQuestion === questions.length - 1 ? 'Finir le Quiz' : 'Next'}
              </button>
            </div>
          ) : (
            <div className="row">
            <div className="col-8 container bg-light p-5 rounded ">
              <h3>Résultats</h3>
              <h3>
                Pourcentage de réussite :{" "}
                {((result.correctAnswer / questions.length) * 100).toFixed(0)} %
              </h3>
              <p>Total Questions : <span>{questions.length}</span></p>
              <p>Total Score : <span>{result.score}</span></p>
              <p>Bonnes Réponses : <span>{result.correctAnswer}</span></p>
              <button onClick={resetQuiz} className="btn btn-warning">Refaire le quiz</button>
           <Link href="/" className="btn btn-primary ">Menu principal</Link>

            </div>
            </div>
          )}
        </div>
      </div>
      </div>
      </div>
    </body>
  );
};

export default Page;
