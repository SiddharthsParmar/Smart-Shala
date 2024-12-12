import React, { useState } from 'react';
import axios from 'axios';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';

const CheckAllAttendance = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const teacherId = savedAuth ? savedAuth.id : null;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFetchStudents = async () => {
    if (!teacherId) {
      setMessage('Teacher ID not found');
      return;
    }

    try {
      console.log("Fetching students...");
      const response = await axios.post(`http://localhost:3000/teacher/${teacherId}/check-attendance`);
      console.log("Response:", response);
      setStudents(response.data.students);
      setMessage(response.data.message);
    } catch (error) {
      console.log("Error:", error);
      setMessage('Error fetching students');
    }
  };

  const handleSendEmails = async () => {
    if (!teacherId) {
      setMessage('Teacher ID not found');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/teacher/${teacherId}/send-emails`, { students });
      setMessage(response.data.message);
    } catch (error) {
      console.log("Error:", error);
      setMessage('Error sending emails');
    }
  };

  const handleSendSMS = async () => {
    if (!teacherId) {
      setMessage('Teacher ID not found');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/teacher/send-low-attendance-sms`, { students });
      setMessage(response.data.message);
    } catch (error) {
      console.log("Error:", error);
      setMessage('Error sending SMS');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Check Students Attendance</h1>
          <button
            onClick={handleFetchStudents}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Fetch Students
          </button>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
        {students.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Students with Attendance Below 75%</h2>
            <ul className="list-disc pl-5">
              {students.map(student => (
                <li key={student._id} className="mb-2">
                  {student.name} - {student.email}
                  {student.name} - {student.contact}
                </li>
              ))}
            </ul>
            {/* <button
              onClick={handleSendEmails}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Send Emails
            </button> */}
            <button
              onClick={handleSendSMS}
              className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
            >
              Send SMS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckAllAttendance;