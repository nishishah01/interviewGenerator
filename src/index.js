// index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Display } from './Display';
import FormComponent from './FormComponent';
import SignUp from './SignUp';
import reportWebVitals from './reportWebVitals';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [isSignedUp, setIsSignedUp] = useState(false); 

  const handleSignUp = (userDetails) => {
    console.log('User signed up:', userDetails);
    setIsSignedUp(true); 
  };

  return (
    <React.StrictMode>
      {!isSignedUp ? ( 
        <SignUp onSignUp={handleSignUp} />
      ) : (
        <>
          <FormComponent setQuestions={setQuestions} />
          <Display questions={questions} />
        </>
      )}
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
