import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';

const RequestResource = () => {
    const [resources, setResources] = useState([]);
    const [selectedResource, setSelectedResource] = useState('');
    const [quantity, setQuantity] = useState(1);
    const savedAuth = JSON.parse(localStorage.getItem("auth"));
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleSidebar = () => {
        setIsExpanded((prevState) => !prevState);
    };

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const res = await axios.get('http://localhost:3000/resources');
            setResources(res.data.resources);
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    };

    const handleRequest = async () => {
        // console.log("request-rersource fucntion called");
        try {
            await axios.post('http://localhost:3000/request-resource', {
                teacherId: savedAuth.id,
                resourceId: selectedResource,
                quantity:Number(quantity),
            });
            alert('Resource requested successfully');
        } catch (error) {
            console.error('Error requesting resource:', error);
            alert('Failed to request resource');
        }
    };

    return (
        <div className="flex">
            <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
                <h1 className="text-3xl font-bold mb-6 bg-sky-800 text-white text-center w-full p-6 ">Request Resource</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Select Resource</h2>
                    <select
                        value={selectedResource}
                        onChange={(e) => setSelectedResource(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                    >
                        <option value="" change="ResourceMan">Select Resource</option>
                        {resources.map(resource => (
                            <option key={resource._id} value={resource._id}>{resource.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button
                        onClick={handleRequest}
                        className="w-full bg-sky-800 text-white p-2 rounded hover:bg-sky-600"
                    >
                        Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestResource;