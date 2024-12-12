import React from 'react';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import "../../../components/hover.css";

const TeachersClassroom = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const savedAuth = JSON.parse(localStorage.getItem("auth"));
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        async function getClassrooms() {
            const res = await axios.get(`http://localhost:3000/teacher/${savedAuth.id}/classrooms`);
            console.log(res.data.classrooms);
            setClassrooms(res.data.classrooms);
            setLoading(false);
        }

        getClassrooms();
    }, [savedAuth.id]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredClassrooms = classrooms.filter(classroom =>
        classroom.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="text-center mt-8">Loading Classrooms...</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
                <h1 className="text-2xl font-bold text-center mb-8">Your Classrooms</h1>

                <TextField
                    label="Search Classrooms"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ marginBottom: 4 }}
                />

                {filteredClassrooms && filteredClassrooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClassrooms.map((classroom) => {
                            return (
                                <Card
                                    className="relative mb-8 h-48 hover-card cursor-pointer"
                                    key={classroom._id}
                                    onClick={() => navigate(`/teacher/classrooms/${classroom._id}/students`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <CardContent className="flex flex-col justify-center items-center h-full relative">
                                        <Typography variant="h5" className="font-bold text-sky-800 text-center">
                                            {classroom.name}
                                        </Typography>
                                        <Typography variant="body2" className="text-gray-600 text-center mt-2">
                                            {classroom.students.length} Students
                                        </Typography>
                                        <Typography variant="body2" className="text-gray-600 text-center">
                                            {classroom.teachers.length} Teachers
                                        </Typography>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center mt-8">
                        <p className="text-gray-500">No classrooms found available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeachersClassroom;