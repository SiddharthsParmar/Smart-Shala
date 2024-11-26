import React, { useState, useEffect } from 'react';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';
import axios from 'axios';

const AddHomeworkPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [homeworkTitle, setHomeworkTitle] = useState('');
  const [homeworkDescription, setHomeworkDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    // Fetch classrooms from the server
    async function fetchClassrooms() {
      try {
        const response = await axios.get('http://localhost:3000/getclassrooms');
        setClassrooms(response.data.classrooms);
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      }
    }
    fetchClassrooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', homeworkTitle);
      formData.append('description', homeworkDescription);
      formData.append('dueDate', dueDate);
      formData.append('subject', subject);
      formData.append('classroomId', selectedClassroom);
      if (file) {
        formData.append('file', file);
      }

      await axios.post('http://localhost:3000/teacher/add-homework', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Homework assigned successfully');
      // Reset form fields
      setHomeworkTitle('');
      setHomeworkDescription('');
      setDueDate('');
      setSubject('');
      setSelectedClassroom('');
      setFile(null);
    } catch (error) {
      console.error('Error assigning homework:', error);
      alert('Failed to assign homework');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Assign Homework</h1>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="classroom">
              Classroom
            </label>
            <select
              id="classroom"
              value={selectedClassroom}
              onChange={(e) => setSelectedClassroom(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a classroom</option>
              {classrooms.map((classroom) => (
                <option key={classroom._id} value={classroom._id}>
                  {classroom.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Homework Title
            </label>
            <input
              id="title"
              type="text"
              value={homeworkTitle}
              onChange={(e) => setHomeworkTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Homework Description
            </label>
            <textarea
              id="description"
              value={homeworkDescription}
              onChange={(e) => setHomeworkDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
              Upload File
            </label>
            <input
              id="file"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Assign Homework
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHomeworkPage;