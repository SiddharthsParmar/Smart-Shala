import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';

const ManualAttendancePage = () => {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    async function fetchClassrooms() {
      if (savedAuth && savedAuth.id) {
        const res = await axios.get(`http://localhost:3000/teacher/${savedAuth.id}/manual-attendance`);
        setClassrooms(res.data.classrooms);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    fetchClassrooms();
  }, [savedAuth]);

  const handleClassroomClick = (classroomId) => {
    navigate(`/teacher/classrooms/${classroomId}/manual-attendance`);
  };

  if (loading) {
    return <div className="text-center mt-8">Loading ...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Manual Attendance</h1>
          <p className="text-gray-600">Select a classroom to mark attendance</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <div
              key={classroom._id}
              className="bg-white p-6 rounded-lg shadow cursor-pointer"
              onClick={() => handleClassroomClick(classroom._id)}
            >
              <h2 className="text-lg font-semibold mb-4">Class: {classroom.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManualAttendancePage;