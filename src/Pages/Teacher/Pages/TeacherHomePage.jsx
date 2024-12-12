import React, { useEffect, useState } from "react";
import TeacherLeftSideNavBar from "../Components/TeacherLeftSideNavBar";
import { useAuth } from "../../../context/auth";
import { useNavigate } from "react-router-dom";


const TeacherHomePage = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [teacherAuth] = useAuth(); // Assuming this is a context hook
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  // Handle navigation if user is not authenticated or not a teacher
  useEffect(() => {
    if (!teacherAuth?.token || teacherAuth.role !== "teacher") {
      navigate("/teacher/login", { replace: true }); // `replace` avoids adding this to browser history
    }
  }, [teacherAuth, navigate]);

  // Render the component
  if (!teacherAuth?.token || teacherAuth.role !== "teacher") {
    return null; // Avoid rendering anything while redirecting
  }

  return (
    <>
    
    <div className="flex flex-wrap">
      {/* Left Sidebar */}
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-width duration-300 ml-${
          isExpanded ? "64" : "16"
        } p-6 mr-50 overflow-x-auto`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center p-2 shadow-sm">
          {/* Title */}
          <div className="max-w-3xl">
          
           <h1>Good Morning Teacher</h1>
          </div>

          {/* Profile Icon */}
          <div className="flex items-center space-x-3">
          
           
          </div>
        </div>

        {/* Main Content */}
        <div className="justify-between gap-6">
          
        </div>
      </div>

      {/* Right Sidebar */}
      <div className=" w-64 p-4  border-2 border-gray-100 h-screen ">
      <div className="w-full h-20 bg-gray-300">
<h2>Teacher  </h2>
      </div>


      {/* Submitted Homework Section */}
      <div className="mb-6">
       
        <div className="flex flex-col space-y-2">
          
        </div>
      </div>

      {/* Approved Homework Section */}
      <div>
    
        <div className="flex flex-col space-y-2">
          
        </div>
      </div>
    </div>
    </div>

    
    </>
    
  );
};

export default TeacherHomePage;
