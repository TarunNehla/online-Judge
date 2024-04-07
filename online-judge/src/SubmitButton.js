// SubmitButton.js
import React from 'react';

const SubmitButton = ({ problemId, language, code, handleOutputChange}) => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Login first to submit your response'); // Display a warning message
      return; // Stop the submission process
    }

    try {
      const response = await fetch('http://localhost:5000/generateCodeFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({token, problemId, language, code }),
      });

      const data = await response.json();
      if (response.status === 200) {
        console.log('Code file generated and saved successfully.');
        handleOutputChange(data.output)
        // Handle additional success operations here, if necessary
      } else {
        console.error('Error generating and saving code file:', data.message);
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
