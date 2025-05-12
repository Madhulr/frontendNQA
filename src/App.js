import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import StudentEnquiryForm from './components/EnquiryForm';
import EnquiryList from './components/EnquiryList';
import DemoList from './components/DemoList';
import WithSidebar from './components/WithSidebar';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Sidebar-wrapped routes */}
        <Route
          path="/enquiry-form"
          element={
            <WithSidebar
              Component={StudentEnquiryForm}
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          }
        />
        <Route
          path="/enquiry-list"
          element={
            <WithSidebar
              Component={EnquiryList}
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          }
        />
        <Route
          path="/demo-list"
          element={
            <WithSidebar
              Component={DemoList}
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          }
        />

        {/* Optional 404 fallback */}
        {/*
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen bg-gray-100 text-xl text-red-500 font-semibold">
              404 - Page Not Found
            </div>
          }
        />
        */}
      </Routes>
    </Router>
  );
}

export default App;
