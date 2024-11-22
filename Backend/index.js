import express from 'express';
const app = express();
const PORT = 3000;
import { addStudent, getStudent, getAllStuents } from './Controller/student.js';
import { addTeacher, getTeacher, getAllTeachers } from './Controller/teacher.js';
import mongoose from 'mongoose';
import cors from "cors";
import { getAllClassrooms, getClassroom } from './Controller/classroom.js';
import { addAdmin, addClassroomToAdmin } from './Controller/admin.js';


app.use(express.json());

app.use(cors());

app.post('/signupstudent', addStudent);
app.post('/signupteacher', addTeacher);
app.post("/getclassroom",getClassroom);
app.post("/getallclassrooms",getAllClassrooms);
app.get("/getstudent/:id", getStudent);
app.get("/getteacher/:id", getTeacher);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    mongoose.connect("mongodb+srv://zobime660:manush2005@cluster0.dxrqqdn.mongodb.net/SmartSha?retryWrites=true&w=majority").then(()=>{
        console.log("Connected to Database");
    });
});

app.get("/getclassrooms", getAllClassrooms);
app.get("/getclassroom/:id", getClassroom);
app.get("/getstudents", getAllStuents);
app.get("/getstudent/:id", getStudent);
app.get("/getallteachers", getAllTeachers);
app.get("/getteacher/:id", getTeacher);
app.post("/assignClassroom/:id", addClassroomToAdmin);
app.post("/addAdmin", addAdmin);