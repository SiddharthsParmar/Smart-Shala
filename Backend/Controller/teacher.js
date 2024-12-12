import { Teacher } from "../Models/Teacher.js"
import { Classroom } from "../Models/Classroom.js";
import { Homework } from "../Models/Homework.js";
import { Student } from "../Models/Student.js";
import nodemailer from 'nodemailer';

export const addTeacher = async (req, res) => {
    let teacher = await Teacher.find({ email: req.body.email });

    if (teacher.length > 0) {
        res.status(403).json({ "message": "Teacher already exists" });
        return;
    }

    teacher = new Teacher(req.body);

    teacher.save().then(() => {
        console.log("New Teacher Added Successfully");
        res.status(200).json({ message: "New Teacher Added Successfully" });
    }).catch((err) => {
        res.send("Error Occurred !!! , Couldn't Add new Teacher");
    });
}

//get Teacher
export const getTeacher = async (req, res) => {
    const id = req.params.id;
    try {
        const teacher = await Teacher.findById(id);

        if (teacher == null) {
            res.status(403).json({ message: "Teacher does not exist" });
        }
        else {
            //respond with success message
            res.status(201).json({ message: "success", teacher });
        }
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
}

//get all teachers
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        res.status(201).json({ message: "success", teachers });
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
}

// delete teacher
export const deleteTeacher = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteTeacher = await Teacher.findByIdAndDelete(id);
        //respond with success message
        res.status(201).json({ message: "success", deleteTeacher })
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
}

//get classrooms associated with teacher
export const getClassroomsOfTeacher = async (req, res) => {
    let id = req.params.id;
    let teacher = await Teacher.findById(id);

    if (teacher == null) {
        res.status(404).json({ "message": "Teacher does not exist" });
    }
    else {
        let classrooms = [];

        for (let i = 0; i < teacher.classrooms.length; i++) {
            let classroom = await Classroom.findById(teacher.classrooms[i]);
            if (classroom) {
                classrooms.push(classroom);
            }
        }
        res.status(201).json({ message: "success", classrooms });
    }
}

// Fetch all classrooms under the current teacher
export const getClassroomsOfTeacher2 = async (req, res) => {
    let id = req.params.teacherId;
    let teacher = await Teacher.findById(id);

    if (teacher == null) {
        res.status(404).json({ "message": "Teacher does not exist" });
    } else {
        let classrooms = [];

        for (let i = 0; i < teacher.classrooms.length; i++) {
            let classroom = await Classroom.findById(teacher.classrooms[i]);
            if (classroom) {
                classrooms.push(classroom);
            }
        }
        res.status(201).json({ message: "success", classrooms });
    }
}


export const getStudentsOfClassroom2 = async (req, res) => {
    const classroomId = req.params.classroomId;

    try {
        const classroom = await Classroom.findById(classroomId).populate('students');
        if (!classroom) {
            return res.status(404).json({ message: "Classroom does not exist" });
        }
        res.status(200).json({ students: classroom.students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
//get assigned homeworks of teacher
export const getHomeworkAssignedByTeacher = async (req, res) => {
    const id = req.params.id;
    const teacher = await Teacher.findById(id);

    if (!teacher) {
        res.status(404).json({ message: "Teacher does not exist" });
        return;
    }
    let homeworks = [];

    await Promise.all(teacher.homeworks.map(async (homeworkId) => {
        let hw = await Homework.findById(homeworkId);
        if (hw) {
            homeworks.push(hw);
        }
    }))
    res.status(200).json({ homeworks });
}

export const checkAttendanceAndSendEmails = async (req, res) => {
    // console.log("Received request to check attendance");
    const { teacherId } = req.params;
    const teacher = await Teacher.findById(teacherId).populate('classrooms');

    if (!teacher) {
        console.log("Teacher does not exist");
        return res.status(404).json({ message: "Teacher does not exist" });
    }

    const studentsToNotify = [];

    for (const classroom of teacher.classrooms) {
        const classroomData = await Classroom.findById(classroom._id).populate('students');
        for (const student of classroomData.students) {
            const presentDays = student.presentDays.length;
            const totalDays = presentDays + student.absentDays.length;
            const attendancePercentage = (presentDays / totalDays) * 100;

            if (attendancePercentage < 75) {
                studentsToNotify.push(student);
            }
        }
    }

    // console.log("Students fetched successfully", studentsToNotify);
    res.status(200).json({ message: "Students fetched successfully", students: studentsToNotify });
};

import axios from 'axios';
import FormData from 'form-data';

export const sendEmailsToLowAttendanceStudents = async (req, res) => {
    const { students } = req.body;

    const emailPromises = students.map(student => {
        const form = new FormData();
        form.append('from', 'smartshalaisthegoat@aol.com');
        form.append('to', student.email);
        form.append('subject', 'Low Attendance Alert');
        form.append('text', `Dear ${student.name}, your attendance is below 75%. Please ensure to attend more classes.`);

        return axios.post('https://9kz1y4.api.infobip.com/email/1/send', form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `App 054cc80d46307a86aa5b2b7e69b81776-f209c347-73db-4e3e-9b68-66d9e0f7eee4`
            }
        });
    });

    try {
        await Promise.all(emailPromises);
        res.status(200).json({ message: "Emails sent successfully" });
    } catch (error) {
        console.error("Error sending emails:", error.response ? error.response.data : error.message);
        res.status(500).json({ message: "Error sending emails", error: error.response ? error.response.data : error.message });
    }
};

export const getClassroomsAndLowAttendanceStudents = async (req, res) => {
    const { teacherId } = req.params;
    const teacher = await Teacher.findById(teacherId).populate('classrooms');

    if (!teacher) {
        return res.status(404).json({ message: "Teacher does not exist" });
    }

    const classroomsData = [];

    for (const classroom of teacher.classrooms) {
        const classroomData = await Classroom.findById(classroom._id).populate('students');
        const lowAttendanceStudents = classroomData.students.filter(student => {
            const presentDays = student.presentDays.length;
            const totalDays = presentDays + student.absentDays.length;
            const attendancePercentage = (presentDays / totalDays) * 100;
            return attendancePercentage < 75;
        });

        classroomsData.push({
            classroom: classroomData,
            lowAttendanceStudents
        });
    }

    res.status(200).json({ message: "Data fetched successfully", classroomsData });
};


//-----------------------------------------------------------------------------------------
export const sendSMSToLowAttendanceStudents = async (req, res) => {
    const { students } = req.body;
    // console.log(students);
    const smsPromises = students.map(student => {
        return axios.post('http://localhost:3000/send-sms', {
            to: student, // Assuming student object has a phone property
            body: `Dear ${student.name}, your attendance is below 75%. Please ensure to attend more classes.`,
        });
    });

    try {
        await Promise.all(smsPromises);
        res.status(200).json({ message: "SMS sent successfully" });
    } catch (error) {
        console.error("Error sending SMS:", error.response ? error.response.data : error.message);
        res.status(500).json({ message: "Error sending SMS", error: error.response ? error.response.data : error.message });
    }
};