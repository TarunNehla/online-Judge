import React from 'react';
import Session from './Session'; // Import your Session component

const SubmitButton = ({ problemId, language, code, userEmail }) => {
  const session = Session(); // Initialize the Session component

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check user's login status before proceeding
    if (!session.isLoggedIn) {
      alert('Login first to submit your response'); // Display a warning message
      return; // Stop the submission process
    }

    try {
      const response = await fetch('http://localhost:5000/generateCodeFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, problemId, language, code }),
      });

      if (response.status === 200) {
        console.log('Code file generated and saved successfully.');
      } else {
        console.error('Error generating and saving code file.');
      }
    } catch (error) {
      console.error('Error generating and saving code file:', error);
    }
  };

  return (
    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
      Submit
    </button>
  );
};

export default SubmitButton;
