// SubmitButton.js
import React from 'react';

const SubmitButton = ({ problemId, language, code, userEmail }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/generateCodeFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, problemId, language, code }), // Include the user's email in the request body
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
