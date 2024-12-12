import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNavbar from '../../../components/SideNavbar'; // Adjust the import path as needed

const ResourceManagement = () => {
    const [resources, setResources] = useState([]);
    const [requests, setRequests] = useState([]);
    const [newResource, setNewResource] = useState({ name: '', quantity: 0, description: '' });

    useEffect(() => {
        fetchResources();
        fetchRequests();
    }, []);

    const fetchResources = async () => {
        try {
            const res = await axios.get('http://localhost:3000/resources');
            console.log('Resources:', res.data.resources); // Debug log
            setResources(res.data.resources);
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get('http://localhost:3000/resource-requests');
            console.log('Requests:', res.data.requests); // Debug log
            setRequests(res.data.requests);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleAddResource = async () => {
        try {
            await axios.post('http://localhost:3000/resource', newResource);
            fetchResources();
            setNewResource({ name: '', quantity: 0, description: '' });
        } catch (error) {
            console.error('Error adding resource:', error);
        }
    };

    const approveRequest = async (id) => {
        try {
            await axios.post(`http://localhost:3000/resource-request/${id}/approve`);
            fetchRequests();
            fetchResources();
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };

    return (
        <div className="flex">
            <SideNavbar />
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Resource Management</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Add New Resource</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newResource.name}
                            onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={newResource.quantity}
                            onChange={(e) => setNewResource({ ...newResource, quantity: Number(e.target.value) })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={newResource.description}
                            onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                        <button onClick={handleAddResource} className="w-full bg-blue-500 text-white p-2 rounded">Add Resource</button>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Resources</h2>
                        <ul>
                            {resources.map(resource => (
                                <li key={resource._id} className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold">{resource.name}</span>
                                        <span>{resource.quantity - resource.usedQuantity} remaining</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold">Used:</span>
                                        <span>{resource.usedQuantity}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            className="bg-blue-500 h-4 rounded-full"
                                            style={{ width: `${(resource.usedQuantity / resource.quantity) * 100}%` }}
                                        ></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Requests</h2>
                        <ul>
                            {requests.filter(request => request.status !== "Approved").map(request => (
                                <li key={request._id} className="mb-2">
                                    {request.teacher?.name || 'Unknown Teacher'} requested {request.quantity} of {request.resource?.name || 'Unknown Resource'}
                                    <button onClick={() => approveRequest(request._id)} className="ml-2 bg-green-500 text-white p-1 rounded">Approve</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceManagement;