import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';

const storage = getStorage();

const ClassroomSubmittedHomeworks = () => {
    const { id } = useParams();
    const [submittedHomeworks, setSubmittedHomeworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const savedAuth = JSON.parse(localStorage.getItem("auth"));

    const toggleSidebar = () => {
        setIsExpanded((prevState) => !prevState);
    };

    useEffect(() => {
        async function fetchSubmittedHomeworks() {
            try {
                // Fetch homeworks assigned by the teacher
                const teacherHomeworksRes = await axios.get(`http://localhost:3000/teacher/${savedAuth.id}/homeworks`);
                const teacherHomeworks = teacherHomeworksRes.data.homeworks.map(hw => hw._id);

                // Fetch submitted homeworks for the classroom
                const res = await axios.get(`http://localhost:3000/classroom/${id}/submitted-homeworks`);
                const homeworks = res.data.submittedHomeworks.filter(hw => teacherHomeworks.includes(hw.homework._id));

                // Fetch file URLs for each submission
                for (const homework of homeworks) {
                    for (const submission of homework.submissions) {
                        const fileRef = ref(storage, `homeworks/${homework.homework._id}/${submission.studentId}`);
                        submission.fileUrl = await getDownloadURL(fileRef);
                    }
                }

                setSubmittedHomeworks(homeworks);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching submitted homeworks:', error);
                setLoading(false);
            }
        }
        fetchSubmittedHomeworks();
    }, [id, savedAuth.id]);

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 transition-width duration-300 ml-${isExpanded ? "64" : "16"} p-8`}>
                <h1 className="text-3xl font-bold text-center mb-8">Submitted Homeworks</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {submittedHomeworks.map(({ homework, submissions }) => (
                        <div key={homework._id} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">{homework.title}</h2>
                            <p className="text-gray-600 mb-4">{homework.description}</p>
                            <p className="text-gray-600 mb-4">Due Date: {new Date(homework.dueDate).toLocaleDateString()}</p>
                            <h3 className="text-lg font-semibold mb-2">Submissions:</h3>
                            <ul className="list-disc list-inside">
                                {submissions.map(submission => (
                                    <li key={submission.studentId} className="text-gray-700">
                                        {submission.studentName}
                                        <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-950 ml-2">View File</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClassroomSubmittedHomeworks;