import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../../../context/GlobalProvider.jsx';


function TeacherEmergencyForm() {
    const { triggerEvent } = useGlobalContext();

    const [formData, setFormData] = useState({
        emergencyType: '',
        severity: '',
        location: '',
    });

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded((prevState) => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/teacher/emergency', formData);
            toast.success("Alert sent successfully");

            // Add alert to global context
            const alertData = {
                ...formData,
                createdAt: new Date(),
            };
            addAlert(alertData);

            setFormData({ emergencyType: '', severity: '', location: '' });
        } catch (error) {
            console.error(error);
            toast.error("Failed to send alert.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'} p-8`}>
                <h1 className="text-3xl font-bold text-center mb-8">Send Emergency Alert</h1>
                <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emergencyType">
                                Emergency Type:
                            </label>
                            <input
                                type="text"
                                name="emergencyType"
                                value={formData.emergencyType}
                                onChange={(e) =>
                                    setFormData({ ...formData, emergencyType: e.target.value })
                                }
                                placeholder="e.g., Fire, Electrical Issue"
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="severity">
                                Severity:
                            </label>
                            <select
                                name="severity"
                                value={formData.severity}
                                onChange={(e) =>
                                    setFormData({ ...formData, severity: e.target.value })
                                }
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="" disabled>
                                    Select severity
                                </option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                                Class:
                            </label>
                            <select
                                name="location"
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({ ...formData, location: e.target.value })
                                }
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="" disabled>
                                    Select class
                                </option>
                                <option value="class1">Class1</option>
                                <option value="class2">Class2</option>
                                <option value="class3">Class3</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                            onClick={triggerEvent}
                                type="button"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Send Alert
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TeacherEmergencyForm;