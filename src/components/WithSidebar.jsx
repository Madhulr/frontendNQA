import React from 'react';
import Sidebar from './Sidebar';

const WithSidebar = ({ Component, isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="app-container flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content-area flex-1 p-4">
        <Component />
      </div>
    </div>
  );
};

export default WithSidebar;
