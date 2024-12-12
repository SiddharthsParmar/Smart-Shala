import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';

const ClassroomAttendancePage = () => {
  const { classroomId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    async function fetchStudents() {
      const savedAuth = JSON.parse(localStorage.getItem("auth"));
      if (savedAuth && savedAuth.id) {
        const res = await axios.get(`http://localhost:3000/teacher/${savedAuth.id}/classrooms/${classroomId}/manual-attendance`);
        setStudents(res.data.students);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    fetchStudents();
  }, [classroomId]);

  const markAttendance = async (studentId, status) => {
    const url = status === 'present' ? 
      `http://localhost:3000/student/${studentId}/attendance/present` : 
      `http://localhost:3000/student/${studentId}/attendance/absent`;
    await axios.get(url);
    alert(`Student marked ${status}`);
  };

  if (loading) {
    return <div className="text-center mt-8">Loading ...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
        <button onClick={() => navigate(-1)} className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Back to Classrooms</button>
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Classroom Attendance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <div key={student._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">{student.name}</h3>
                  <div className="flex space-x-4">
                    <button 
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200" 
                      onClick={() => markAttendance(student._id, 'present')}
                    >
                      Mark Present
                    </button>
                    <button 
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200" 
                      onClick={() => markAttendance(student._id, 'absent')}
                    >
                      Mark Absent
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomAttendancePage;