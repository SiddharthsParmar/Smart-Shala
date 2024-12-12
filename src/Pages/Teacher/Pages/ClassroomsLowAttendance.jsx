import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';

const ClassroomsLowAttendance = () => {
    const [classroomsData, setClassroomsData] = useState([]);
    const [message, setMessage] = useState('');
    const savedAuth = JSON.parse(localStorage.getItem("auth"));
    const teacherId = savedAuth ? savedAuth.id : null;
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState({});
    const audioRef = useRef(null); // Reference for audio element

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const fetchClassroomsData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/teacher/${teacherId}/classrooms-low-attendance`);
                setClassroomsData(response.data.classroomsData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setMessage('Error fetching data');
            }
        };

        fetchClassroomsData();
    }, [teacherId]);

    const handleCheckboxChange = (classroomId, studentId) => {
        setSelectedStudents(prevState => {
            const newState = { ...prevState };
            if (!newState[classroomId]) {
                newState[classroomId] = {};
            }
            newState[classroomId][studentId] = !newState[classroomId][studentId];
            return newState;
        });
    };

    const handleSendEmails = async () => {
        const studentsToSendEmails = [];
        for (const classroomId in selectedStudents) {
            for (const studentId in selectedStudents[classroomId]) {
                if (selectedStudents[classroomId][studentId]) {
                    const classroom = classroomsData.find(c => c.classroom._id === classroomId);
                    const student = classroom.lowAttendanceStudents.find(s => s._id === studentId);
                    studentsToSendEmails.push(student.email);
                }
            }
        }

        try {
            const response = await axios.post(`http://localhost:3000/send-emails`, { students: studentsToSendEmails });
            setMessage(response.data.message);
            playSound(); // Play sound on successful email sending
        } catch (error) {
            console.error("Error sending emails:", error);
            setMessage('Error sending emails');
        }
    };

    const handleSendSMS = async () => {
        const studentsToSendSMS = [];
        for (const classroomId in selectedStudents) {
            for (const studentId in selectedStudents[classroomId]) {
                if (selectedStudents[classroomId][studentId]) {
                    const classroom = classroomsData.find(c => c.classroom._id === classroomId);
                    const student = classroom.lowAttendanceStudents.find(s => s._id === studentId);
                    studentsToSendSMS.push("+91" + JSON.stringify(student.contact));
                }
            }
        }

        try {
            const response = await axios.post(`http://localhost:3000/teacher/send-low-attendance-sms`, { students: studentsToSendSMS });
            setMessage(response.data.message);
        } catch (error) {
            console.error("Error sending SMS:", error);
            setMessage('Error sending SMS');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
                <h1 className="text-3xl font-bold mb-4">Classrooms and Students with Low Attendance</h1>
                {message && <p className="mt-4 text-red-500">{message}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classroomsData.map(({ classroom, lowAttendanceStudents }) => (
                        <div key={classroom._id} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">{classroom.name}</h2>
                            {lowAttendanceStudents.length > 0 ? (
                                <div>
                                    <ul className="list-disc pl-5">
                                        {lowAttendanceStudents.map(student => (
                                            <li key={student._id} className="mb-2 flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    checked={selectedStudents[classroom._id]?.[student._id] || false}
                                                    onChange={() => handleCheckboxChange(classroom._id, student._id)}
                                                />
                                                {student.name} - {student.email}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>No students with attendance below 75%</p>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleSendEmails}
                    className="mt-8 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                >
                    Send Emails
                </button>
                <button
                    onClick={handleSendSMS}
                    className="mt-8 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                >
                    Send SMS
                </button>
            </div>
            {/* Audio element to play the sound */}
            <audio ref={audioRef} src="https://upload.wikimedia.org/wikipedia/commons/8/81/Alarm_or_siren.ogg" />
        </div>
    );
};

export default ClassroomsLowAttendance;
