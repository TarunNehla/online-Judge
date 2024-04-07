// DataTable.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DataTable = ({}) => {
  const [dataList, setDataList] = useState([]);
  const [submissions, setSubmissions] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    fetchDataFromBackend();
    if (token && storedUserId) {
      setUserId(storedUserId); // Set userId from localStorage
      setIsLoggedIn(true);
      fetchUserSubmissions(storedUserId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // The empty array means this effect will only run on mount and unmount.
  

  const fetchDataFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/plist');
      const data = await response.json();
      setDataList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchUserSubmissions = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/submissions/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const submissionData = await response.json();
      console.log('Submission data received:', submissionData);
      const submissionStatus = submissionData.reduce((acc, submission) => {
        acc[submission._id] = {
          result: submission.result,
          submissionTime: submission.submissionTime
        };
        return acc;
      }, {});
      console.log('Submission status:', submissionStatus);
      setSubmissions(submissionStatus);
    } catch (error) {
      console.error('Error fetching user submissions:', error);
    }
  };
  
  

  const getRowStyle = (problemId) => {
    console.log('Getting row style for problemId:', problemId); // Check the problemId value
    if (submissions[problemId] && submissions[problemId].result === 'correct') {
      console.log('Row style: green'); // Log if the style is green
      return { backgroundColor: 'green' };
    } else if (submissions[problemId] && submissions[problemId].result === 'incorrect') {
      console.log('Row style: red'); // Log if the style is red
      return { backgroundColor: 'red' };
    }
  };

  return (
    <div>
      <h2>Data Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((item) => (
            <tr key={item._id} style={isLoggedIn ? getRowStyle(item._id) : {}}>
              <td>{item.pname}</td>
              <td>{item.pdis}</td>
              <td>
                {/* Add a Link to navigate to the DetailView component */}
                <Link to={`/detail/${item._id}`}>
                  <button>Solve</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
