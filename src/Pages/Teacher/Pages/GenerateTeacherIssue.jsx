import React, { useState } from 'react';
import axios from 'axios';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar'; // Adjust the import path as needed
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const GenerateTeacherIssue = () => {
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('low');
  const [classroomId, setClassroomId] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/teacher/classrooms/${classroomId}/generate-issue`, {
        description,
        severity,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error generating issue:', error);
      toast.error('Failed to generate issue');
    }
  };

  const handleChange = (e) => {
    console.log(e);
  }

  useEffect(() => {
    async function fetchClassrooms() {
      const res = await axios.get(`http://localhost:3000/teacher/${savedAuth.id}/classrooms`);
      setClassrooms(res.data.classrooms);
      setLoading(false);
    }
    fetchClassrooms();
  },[]);

  if(loading) {
    return <div className="text-center mt-8">Loading ...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-inido-950">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-8 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Generate Issue</h2>
          <div className="mb-4">
            <label className="block ">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label for="classrooms">Select Classroom:</label>
            <select
              onChange={(e) => setClassroomId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            >
              {
                classrooms.map((classroom) => (
                  <option value={classroom._id} name={classroom.name}>{classroom.name}</option>
                ))
              }
            </select>
          </div>
          <button type="submit" className="w-full bg-sky-800 text-white p-2 rounded">Generate Issue</button>
        </form>
      </div>
    </div>
  );
};

export default GenerateTeacherIssue;