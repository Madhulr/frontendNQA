import React, { useState, useEffect } from 'react';
import './DemoList.css';
import axios from 'axios';

const DemoList = () => {
  const [demoData, setDemoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDemoData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/demo-list');
        if (response.status === 200) {
          setDemoData(response.data);
        } else {
          console.error('Failed to fetch demo data');
        }
      } catch (error) {
        console.error('Server error. Please try again later.');
      }
    };

    fetchDemoData();
  }, []);

  const handleMoveBackToEnquiryList = async (id) => {
    try {
      const user = demoData.find((u) => u.id === id);
      const response = await axios.post('http://localhost:5000/api/enquiries', user);
      if (response.status === 200) {
        setDemoData((prev) => prev.filter((u) => u.id !== id));
        console.log('Moved back to Enquiry List:', user);
      } else {
        console.error('Failed to move back to Enquiry List');
      }
    } catch (error) {
      console.error('Server error. Please try again later.');
    }
  };

  const filteredData = demoData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="demo-list-container">
      <div className="header">
        <h2>Demo List</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button><i className="fas fa-search"></i></button>
        </div>
      </div>

      <table className="demo-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Package Code</th>
            <th>Package</th>
            <th>Demo Class Status</th>
            <th>Move?</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.code}</td>
              <td>{user.package}</td>
              <td>{user.status}</td>
              <td>
                <button
                  className={`move-btn ${
                    user.status !== 'Completed' ? 'disabled-btn' : ''
                  }`}
                  disabled={user.status !== 'Completed'}
                  onClick={() => handleMoveBackToEnquiryList(user.id)}
                >
                  Back to Enquiry List
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DemoList;