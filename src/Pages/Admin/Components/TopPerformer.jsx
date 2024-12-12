import React from 'react';

// Sample student data
const students = [
  { id: 1, name: "James Bond", rollNo: 100, class: "5th", attendance: 95, photo: "https://via.placeholder.com/40" },
  { id: 2, name: "Ethan Hunt", rollNo: 101, class: "5th", attendance: 93, photo: "https://via.placeholder.com/40" },
  { id: 3, name: "John Wick", rollNo: 102, class: "5th", attendance: 91, photo: "https://via.placeholder.com/40" },
  { id: 4, name: "Jason Bourne", rollNo: 103, class: "6th", attendance: 94, photo: "https://via.placeholder.com/40" },
  { id: 5, name: "Lara Croft", rollNo: 104, class: "6th", attendance: 92, photo: "https://via.placeholder.com/40" },
  { id: 6, name: "Indiana Jones", rollNo: 105, class: "6th", attendance: 90, photo: "https://via.placeholder.com/40" },
  { id: 7, name: "Sherlock Holmes", rollNo: 106, class: "7th", attendance: 97, photo: "https://via.placeholder.com/40" },
  { id: 8, name: "Hercule Poirot", rollNo: 107, class: "7th", attendance: 93, photo: "https://via.placeholder.com/40" },
  { id: 9, name: "Miss Marple", rollNo: 108, class: "7th", attendance: 90, photo: "https://via.placeholder.com/40" },
];

// Function to get top 3 students per class based on attendance
const getTopStudentsByClass = (students) => {
  const groupedByClass = students.reduce((acc, student) => {
    if (!acc[student.class]) {
      acc[student.class] = [];
    }
    acc[student.class].push(student);
    return acc;
  }, {});

  const topStudents = Object.entries(groupedByClass).map(([className, students]) => {
    const topThree = students.sort((a, b) => b.attendance - a.attendance).slice(0, 3);
    return { className, topThree };
  });

  return topStudents;
};

const TopPerformersTable = () => {
  const topStudents = getTopStudentsByClass(students);

  return (
    <>
      <div className="container mx-auto p-4 -mt-5 no-scrollbar">
        {topStudents.map(({ className, topThree }) => (
          <div key={className} className="mb-6  ">
            <h2 className="text-lg font-semibold mb-2 ">Class: {className}</h2>
            <table className="w-full shadow-sm rounded-md ">
              <thead>
                <tr className="bg-gray-100">
                  
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Roll No</th>
                  <th className="py-2 px-4 text-left">Std</th>
                  <th className="py-2 px-4 text-left">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {topThree.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-200 transition duration-150"
                  >
                    
                    <td className="py-2 px-4">{student.name}</td>
                    <td className="py-2 px-4">{student.rollNo}</td>
                    <td className="py-2 px-4">{student.class}</td>
                    <td className="py-2 px-4">{student.attendance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopPerformersTable;