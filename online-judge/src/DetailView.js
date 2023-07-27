// DetailView.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import SubmitButton from './SubmitButton';

const DetailView = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [editorText, setEditorText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');

  // code to fetch email id from beckend
  const [userEmail, setUserEmail] = useState(''); // Add a state to store user's email

  useEffect(() => {
    // Fetch the user's email from the backend when the component mounts
    fetch('http://localhost:5000/getUserEmail', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserEmail(data.email); // Store the user's email in the state
      })
      .catch((error) => {
        console.error('Error fetching user email:', error);
      });
  }, []);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/plist`);
      const data = await response.json();
      const selectedItem = data.find((item) => item._id === id);
      setDetailData(selectedItem);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditorChange = (e) => {
    setEditorText(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here, for example, you can send the editorText and selectedLanguage to the backend
    console.log('Submitted text:', editorText);
    console.log('Selected language:', selectedLanguage);
    console.log('User email:', userEmail); // This will print the user's email in the console
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h2>Content from Backend</h2>
          {detailData ? (
            <>
              <p>ID: {id}</p>
              <p>Product Name: {detailData.pname}</p>
              <p>Product Description: {detailData.pdis}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Col>
        <Col md={6}>
          <h2>Text Editor</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="languageSelectBox">
              <Form.Label>Select Language:</Form.Label>
              <Form.Control as="select" value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editorTextArea">
              <Form.Control
                as="textarea"
                rows={5}
                value={editorText}
                onChange={handleEditorChange}
                placeholder="Write your code here..."
              />
            </Form.Group>
            <SubmitButton problemId={id} language={selectedLanguage} code={editorText} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailView;
