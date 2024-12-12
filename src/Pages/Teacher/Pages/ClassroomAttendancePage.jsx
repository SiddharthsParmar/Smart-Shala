import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

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
    await axios.post(url);
    alert(`Student marked ${status}`);
  };

  if (loading) {
    return <div className="text-center mt-8">Loading ...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
        <button onClick={() => navigate(-1)} className="mb-4 p-2 bg-blue-500 text-white rounded">Back to Classrooms</button>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Classroom Attendance</h2>
          <Grid container spacing={3}>
            {students.map((student) => (
              <Grid item xs={12} md={6} key={student._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {student.name}
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => markAttendance(student._id, 'present')}
                    >
                      Mark Present
                    </Button>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => markAttendance(student._id, 'absent')}
                    >
                      Mark Absent
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ClassroomAttendancePage;