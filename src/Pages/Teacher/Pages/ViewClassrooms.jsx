import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';

const ViewClassrooms = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const savedAuth = JSON.parse(localStorage.getItem("auth"));

    const toggleSidebar = () => {
        setIsExpanded((prevState) => !prevState);
    };

    useEffect(() => {
        async function fetchClassrooms() {
            try {
                const res = await axios.get(`http://localhost:3000/teacher/${savedAuth.id}/classrooms`);
                setClassrooms(res.data.classrooms);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching classrooms:', error);
                setLoading(false);
            }
        }
        fetchClassrooms();
    }, [savedAuth.id]);

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 transition-width duration-300 ml-${isExpanded ? "64" : "16"} p-8`}>
                <h1 className="text-3xl font-bold text-center mb-8 bg-sky-800 p-6 text-white">Classrooms</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {classrooms.map(classroom => (
                        <div
                            key={classroom._id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            onClick={() => navigate(`/teacher/classroom/${classroom._id}/submitted-homeworks`)}
                        >
                            <h2 className="text-xl font-semibold mb-2">{classroom.name}</h2>
                            <p className="text-gray-600">{classroom.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewClassrooms;