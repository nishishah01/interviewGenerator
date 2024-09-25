import React from 'react';

export const Display = ({ questions }) => {
  const handleSpeech = (question) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(question);
    synth.speak(utterance);
  };

  return (
    <div>
      {Array.isArray(questions) && questions.length > 0 && (
        questions.map((question, index) => (
          <div key={index}>
            <p>{question}</p>
            <button onClick={() => handleSpeech(question)}>🔊</button>
          </div>
        ))
      )}
    </div>
  );
};

//export const Display = () => {  
//const [questions, setQuestions] = useState([
  // Add some example questions for now
  //"What is your greatest strength?",
  //"Tell me about a time you overcame a challenge.",
  //"Why do you want this job?",
  //"Where do you see yourself in 5 years?",
  //"How do you handle pressure?"
//]);   
//here if i am adding these questions, then they are visible on the page alaong with the speaker , but when i am trying to make it random questions, it does not work.
