import express from "express";

const app = express();
const PORT = 3000;
import twilio from 'twilio';
import nodemailer from 'nodemailer';

// Twilio credentials
const accountSid = 'AC251fd490ae65ab13ffc34b4e68a82dfe'; // Replace with your Twilio SID
const authToken = '3285c20633da693813a73bc6872d2abe';     // Replace with your Twilio Auth Token
const messagingServiceSid = 'MG54ac2806b8f292653839aee69c108a21'; // Replace with your Twilio Messaging Service SID
const client = twilio(accountSid, authToken);


import {
  addStudent,
  getStudent,
  getAllStuents,
  deleteStudent,
  markPresent,
  markAbsent,
  getPendingHomeworkOfStudent,
  getSubmmitedHomeworkOfStudent,
  submitHomeWorkOfStudent,
  getPresentDaysAttendance,
} from "./Controller/student.js";
import {
  addTeacher,
  getTeacher,
  getAllTeachers,
  deleteTeacher,
  getClassroomsOfTeacher,
  getClassroomsOfTeacher2,
  getStudentsOfClassroom2,
  getHomeworkAssignedByTeacher,
  checkAttendanceAndSendEmails,
  // sendEmailsToStudents,
  getClassroomsAndLowAttendanceStudents,
  sendEmailsToLowAttendanceStudents,
  sendSMSToLowAttendanceStudents,
} from "./Controller/teacher.js";
import mongoose from "mongoose";
import cors from "cors";
import {
  getAllClassrooms,
  getClassroom,
  deleteClassroom,
  editClassroom,
  assignHomeworkToClassroom,
  initiateAttendance,
  assignStudentToClassroom,
  assignTeacherToClassroom,
  removeStudentFromClassroom,
  getHomeworkOfClass,
  getStudentsOfClassroom,
  getAverageStudentAttendanceOfClassroom,
  getTopPerformersOfClassroom,
  getSubmittedHomeworksOfClassroom
} from "./Controller/classroom.js";
import {
  addAdmin,
  addClassroomToAdmin,
  getClassroomsOfAdmin,
  getTeachersOfAdmin,
  getStudentsOfAdmin,
  addTeacherToAdmin,
  addStudentToAdmin,
  deleteStudentOfAdmin,
  deleteTeacherOfAdmin,
  deleteClassroomOfAdmin,
  getAdmin,
  getAttendanceOfClassroomsOfAdmin,
} from "./Controller/admin.js";
import {
  generateIssue,
  deleteIssue,
  markIssueAsResolved,
  getIssue,
  markIssueAsNotResolved,
} from "./Controller/issue.js";
import { getAnswer } from "./Controller/Chatbot.js";
import { addResource, getResources, requestResource, approveResourceRequest, getResourceRequests } from "./Controller/resource.js";

// import  {requireSignIn}  from './middleware/requireSignIn.js';
import { adminLogin } from "./Controller/admin.js";
import LoginTeacher from "./Controller/loginTeacher.js";
import loginStudent from "./Controller/loginStudent.js";
import analyzeImageFromFile from "./Controller/homeworkAnalysis.js";
import { getHomework } from "./Controller/homework.js";
import { createAlert } from './Controller/alertController.js'
import { deleteAlert } from "./Controller/alertController.js";
import { getAlerts } from "./Controller/alertController.js";
import {
  addFaceOfStudent,
  recognizeFaceAndMarkPresent
} from "./Controller/face.js";

app.use(express.json());

app.use(cors());


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  mongoose
    .connect(
      "mongodb+srv://zobime660:manush2005@cluster0.dxrqqdn.mongodb.net/SmartSha?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to Database");
    });
});

// classroom routes 
app.get("/classroom/:id/delete", deleteClassroom);
app.post("/classroom/:id/edit", editClassroom);
app.post("/classroom/:id/initiate-attendance", initiateAttendance);
app.get("/classroom/:id", getClassroom);
app.post("/classroom/:id/assign-student", assignStudentToClassroom);
app.post("/classroom/:id/assign-teacher", assignTeacherToClassroom);
app.get("/classroom/:cId/student/:sId/remove", removeStudentFromClassroom);
app.get("/classroom/:id/homeworks", getHomeworkOfClass);
app.get("/classroom/:id/students", getStudentsOfClassroom);
app.get("/classroom/:id/attendance", getAverageStudentAttendanceOfClassroom);
app.get("/classroom/:id/top-performers", getTopPerformersOfClassroom);
app.get("/classroom/:id/submitted-homeworks", getSubmittedHomeworksOfClassroom);
app.post("/classroom/:id/mark-attendance", recognizeFaceAndMarkPresent);

// teacher routes
app.post("/teacher/classrooms/:id/generate-issue", generateIssue);
app.get("/teacher/:id/classrooms", getClassroomsOfTeacher);
app.get("/teacher/:id", getTeacher);
app.post("/teacher/:id/assign-homework", assignHomeworkToClassroom);
app.get("/teacher/:id/delete", deleteTeacher);
app.get("/teacher/:id/homeworks", getHomeworkAssignedByTeacher);
app.post("/teacher/:teacherId/check-attendance", checkAttendanceAndSendEmails);
// app.post("/teacher/:teacherId/send-emails", sendEmailsToStudents);
app.get("/teacher/:teacherId/classrooms-low-attendance", getClassroomsAndLowAttendanceStudents);
app.post("/teacher/send-low-attendance-emails", sendEmailsToLowAttendanceStudents);
app.get("/teacher/:teacherId/manual-attendance", getClassroomsOfTeacher2);
app.get("/teacher/:teacherId/classrooms/:classroomId/manual-attendance", getStudentsOfClassroom2);
app.post("/teacher/send-low-attendance-sms", sendSMSToLowAttendanceStudents);

// student routes
app.get("/student/:id", getStudent);
app.get("/student/:id/attendance", getPresentDaysAttendance);
app.get("/student/:id/attendance/present", markPresent);
app.get("/student/:id/attendance/absent", markAbsent);
app.get("/student/:id/pending-homeworks", getPendingHomeworkOfStudent);
app.get("/student/:id/submitted-homeworks", getSubmmitedHomeworkOfStudent);
app.get("/student/:sId/homework/:hId/submit", submitHomeWorkOfStudent);
app.get("/student/:id/add-face", addFaceOfStudent);

// issue generation routes
app.get("/issue/:id/delete", deleteIssue);
app.get("/issue/:id", getIssue);
app.get("/issue/:id/resolve", markIssueAsResolved);
app.get("/issue/:id/refuse", markIssueAsNotResolved);

// admin routes
app.get("/admin/:id", getAdmin);
app.get("/admin/:id/classrooms", getClassroomsOfAdmin);
app.get("/admin/:id/students", getStudentsOfAdmin);
app.get("/admin/:id/teachers", getTeachersOfAdmin);
app.get("/admin/:aId/student/remove/:sId", deleteStudentOfAdmin);
app.get("/admin/:aId/teacher/remove/:tId", deleteTeacherOfAdmin);
app.get("/admin/:aId/classroom/remove/:cId", deleteClassroomOfAdmin);
app.post("/admin/:id/assign-classroom", addClassroomToAdmin);
app.post("/admin/:id/assign-teacher", addTeacherToAdmin);
app.post("/admin/:id/assign-student", addStudentToAdmin);
app.get("/admin/:id/classrooms/attendance", getAttendanceOfClassroomsOfAdmin);
app.post("/addAdmin", addAdmin);

//homework routes
app.post("/homework/analysis", analyzeImageFromFile);
app.get("/homework/:id", getHomework);

// chat bot routes
app.post("/getAnswer", getAnswer);

//login routes
app.post("/login/teacher", LoginTeacher);
app.post("/login/student", loginStudent);
app.post("/login/admin", adminLogin);

//signup routes
app.post("/signup/student", addStudent);
app.post("/signup/teacher", addTeacher);
app.post("/signup/admin", addAdmin);

//emergency routes
app.post("/teacher/emergency", createAlert)
app.get("/emergency/admin", getAlerts)
app.delete('/emergency/admin/:id', deleteAlert);


// Resource routes
app.post("/resource", addResource);
app.get("/resources", getResources);
app.post("/request-resource", requestResource);
app.get("/resource-requests", getResourceRequests);
app.post("/resource-request/:id/approve", approveResourceRequest);

//---------------------------------------------------------------------------------
// Route to send SMS
app.post('/send-sms', async (req, res) => {
  const { to, body } = req.body;

  if (!to || !body) {
    return res.status(400).send({ success: false, error: 'Missing "to" or "body" in request.' });
  }

  try {
    const message = await client.messages.create({
      to,                      // Recipient phone number
      body,                    // Message content
      messagingServiceSid,     // Messaging Service SID
    });

    res.status(200).send({ success: true, message });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});
//--------------------------------------------------------------------------------------
//route to send email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: 'siddharthakk3704@gmail.com',
    pass: 'faoposrnmavclrjc'
  },
});

app.post("/send-emails", async (req, res) => {
  const { students } = req.body;

  if (!students || students.length === 0) {
    return res.status(400).send({ success: false, error: 'No students provided.' });
  }

  const emailPromises = students.map(student => {
    const mailInfo = {
      from: 'siddharthakk3704@gmail.com', // sender address
      to: student,
      subject: "Low Attendance Alert",
      text: "Your attendance is below 75%. Please ensure to attend more classes.",
      html: "<b>Your attendance is below 75%. Please ensure to attend more classes.</b>",
    };

    return transporter.sendMail(mailInfo);
  });

  try {
    await Promise.all(emailPromises);
    res.status(200).send({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});

app.get("/mail", async (req, res) => {
  var mailInfo = {
    from: 'siddharthakk3704@gmail.com', // sender address
    to,
    subject: "Hello ✔",
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }
  // const info = await transporter.sendMail({
  //   from: 'siddharthakk3704@gmail.com', // sender address
  //   to: "abhaysc7778@gmail.com", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // });
  transporter.sendMail(mailInfo, (error, info) => {
    if (error) {
      console.log(error);

    }
    else {
      console.log("email sent ", info.response);

    }
  })
  res.send("im ready")
})


