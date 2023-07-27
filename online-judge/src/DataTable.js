// DataTable.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DataTable = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const fetchDataFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/plist');
      const data = await response.json();
      setDataList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
            <tr key={item._id}>
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
