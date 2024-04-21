// Page principale pour choisir le quiz
'use client'
import React, { useState } from "react";
import Page from "./quiz/page"; // Assurez-vous que le chemin d'importation est correct

const MainPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const handleQuizSelection = (quizId: number) => {
    setSelectedQuiz(quizId);
  };

  return (
    <body className="bg-secondary-subtle">
      <nav>
        <h1 className="bg-dark p-3 text-light">Quiz - App</h1>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div className="bg-secondary rounded text-center col-8 m-3 p-3">
            <h1 className="text-light">Choisissez le thème du quiz :</h1>
            <div className="row">
              <div className="col-2"></div>
              <div className="m-3 bg-light rounded p-4 col-8">
                <button onClick={() => handleQuizSelection(1)} className="m-3 btn btn-primary p-4">Géographie</button> 
                <button onClick={() => handleQuizSelection(2)} className="m-3 btn btn-primary p-4">Histoire</button>
                <button onClick={() => handleQuizSelection(3)} className="m-3 btn btn-primary p-4">Science</button>
              </div>
            </div>
            {selectedQuiz !== null && <Page quizId={selectedQuiz} />} {/* Utilisation du composant Page */}
          </div>
        </div>
      </div>
    </body>
  );
};

export default MainPage;

