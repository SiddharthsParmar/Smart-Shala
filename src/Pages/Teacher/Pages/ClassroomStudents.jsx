import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';

const ClassroomStudents = () => {
    const { classroomId } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('name');
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        async function fetchStudents() {
            try {
                const res = await axios.get(`http://localhost:3000/classroom/${classroomId}/students`);
                setStudents(res.data.students);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching students:', error);
                setLoading(false);
            }
        }

        fetchStudents();
    }, [classroomId]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredStudents = students.filter(student => {
        const value = student[searchCategory] ? student[searchCategory].toString().toLowerCase() : '';
        return value.includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return <div className="text-center mt-8">Loading Students....</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
                <Typography variant="h4" className="mb-8">Classroom Students</Typography>
                <Box mb={4} mt={3}>
                    <div className="flex justify-between items-center">
                        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel id="search-category-label">Search By</InputLabel>
                            <Select
                                labelId="search-category-label"
                                value={searchCategory}
                                onChange={(e) => setSearchCategory(e.target.value)}
                                label="Search By"
                            >
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="email">Email</MenuItem>
                                <MenuItem value="contact">Contact</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearch}
                            sx={{ marginLeft: 2, flex: 1 }}
                        />
                    </div>
                </Box>
                {filteredStudents.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Contact</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredStudents.map((student) => (
                                    <TableRow key={student._id}>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        <TableCell>{student.contact}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <div className="text-center mt-8">
                        <Typography variant="body1" color="textSecondary">No students in this classroom.</Typography>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassroomStudents;