import React, { useState, useEffect } from 'react';
import './EnquiryList.css';
import { FiSearch } from 'react-icons/fi';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mode, setMode] = useState('single');
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/enquiries');
        if (response.status === 200) {
          setEnquiries(response.data);
        } else {
          console.error('Failed to fetch enquiries');
        }
      } catch (error) {
        console.error('Server error. Please try again later.');
      }
    };

    fetchEnquiries();
  }, []);

  const handleMoveToDemoList = async (id) => {
    try {
      const enquiry = enquiries.find((e) => e.id === id);
      const response = await axios.post('http://localhost:5000/api/demo-list', enquiry);
      if (response.status === 200) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        console.log('Moved to DemoList:', enquiry);
      } else {
        console.error('Failed to move to DemoList');
      }
    } catch (error) {
      console.error('Server error. Please try again later.');
    }
  };

  const handleEditClick = (id) => {
    setEditRowId(id);
    const enquiry = enquiries.find((e) => e.id === id);
    setEditData(enquiry);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/enquiries/${editRowId}`, editData);
      if (response.status === 200) {
        console.log('Edited data:', editData);
        setEnquiries((prev) =>
          prev.map((e) => (e.id === editRowId ? { ...e, ...editData } : e))
        );
        setEditRowId(null);
      } else {
        console.error('Failed to update enquiry');
      }
    } catch (error) {
      console.error('Server error. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const filtered = enquiries.filter((e) =>
    e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: 'fullName', headerName: 'Full Name', width: 180, editable: true },
    { field: 'phone', headerName: 'Phone Number', width: 180, editable: true },
    { field: 'email', headerName: 'Email Address', width: 250, editable: true },
    { field: 'location', headerName: 'Current Location', width: 180, editable: true },
    { field: 'module', headerName: 'Subject / Module', width: 180, editable: true },
    { field: 'trainingMode', headerName: 'Training Mode', width: 150, editable: true },
    { field: 'trainingTimings', headerName: 'Training Timings', width: 180, editable: true },
    { field: 'startTime', headerName: 'Start Time', width: 150, editable: true },
    { field: 'calling1', headerName: 'Calling 1', width: 150, editable: true },
    { field: 'calling2', headerName: 'Calling 2', width: 150, editable: true },
    { field: 'calling3', headerName: 'Calling 3', width: 150, editable: true },
    { field: 'calling4', headerName: 'Calling 4', width: 150, editable: true },
    { field: 'calling5', headerName: 'Calling 5', width: 150, editable: true },
    { field: 'previousInteraction', headerName: 'Previous Interaction', width: 220, editable: true },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      renderCell: (params) => (
        <div>
          {editRowId === params.row.id ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <>
              <button onClick={() => handleEditClick(params.row.id)}>Edit</button>
              <button onClick={() => handleMoveToDemoList(params.row.id)}>Move to DemoList</button>
            </>
          )}
        </div>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <div className="enquiry-list-page">
      <div className="toolbar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">
            <FiSearch />
          </button>
        </div>

        <div className="mode-buttons">
          <button
            className={mode === 'single' ? 'active' : ''}
            onClick={() => setMode('single')}
          >
            Single Mode
          </button>
          <button
            className={mode === 'batch' ? 'active batch' : 'batch'}
            onClick={() => setMode('batch')}
          >
            Batch Mode
          </button>
        </div>
      </div>

      <div className="table-container">
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={filtered}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            onCellEditCommit={(params) => {
              if (editRowId === params.id) {
                setEditData((prev) => ({ ...prev, [params.field]: params.value }));
              }
            }}
          />
        </Box>
      </div>
    </div>
  );
};

export default EnquiryList;