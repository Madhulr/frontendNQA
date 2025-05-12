import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdOutlineListAlt } from "react-icons/md";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import EnquiryForm from "../components/EnquiryForm"; // Import EnquiryForm
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: "/enquiry-form", name: "Enquiry Form", icon: <HiOutlineClipboardList /> },
    { path: "/enquiry-list", name: "Enquiry List", icon: <MdOutlineListAlt /> },
    { path: "/demo-list", name: "Demo List", icon: <BiSolidSpreadsheet /> },
  ];

  return (
    <div className={`flex ${isOpen ? "w-64" : "w-20"} bg-[#002147] h-screen p-3 pt-6 duration-300 relative`}>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <img
            src={isOpen ? "/nammaqa.jpg" : "/nammalogo.png"}
            alt="Logo"
            className="logo"
          />

          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            <h4>{isOpen ? <MdMenuOpen /> : <MdMenu />}</h4>
          </button>

          <ul className="sidebar-menu">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={location.pathname === item.path ? "active" : ""}
              >
                <Link to={item.path}>
                  {item.icon}
                  {isOpen && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar-footer">
          <h2>{isOpen && <p className="user-name">Name</p>}</h2>
          <button className="logout-btn">
            <FiLogOut /> {isOpen && "Logout"}
          </button>
        </div>
      </div>
      {/* { Render two instances of EnquiryForm } */}
      { <div className="forms-container">
        <EnquiryForm isSidebarOpen={isOpen} />
      </div> }
    </div>
  );
};

export default Sidebar;