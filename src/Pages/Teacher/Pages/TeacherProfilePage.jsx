import React, { useEffect, useState } from 'react';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';
import TeacherProfile from '../Components/TeacherProfile';
import axios from 'axios';

const TeacherProfilePage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [teacher, setTeacher] = useState(null);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    // Fetch teacher data from the server
    async function fetchTeacher() {
      try {
        const response = await axios.get(`http://localhost:3000/teacher/${savedAuth.id}`); 
        setTeacher(response.data.teacher);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    }
    fetchTeacher();
  }, []);


  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Teacher Profile</h1>
        {teacher ? (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
            <TeacherProfile teacher={teacher} />
        
          </div>
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default TeacherProfilePage;