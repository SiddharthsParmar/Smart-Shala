import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminEmergencyAlert() {
    const [alerts, setAlerts] = useState([]);

    // Fetch alerts from the backend
    const fetchAlerts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/emergency/admin');
            setAlerts(response.data);
        } catch (error) {
            console.error('Error fetching alerts:', error);
        }
    };

    useEffect(() => {
        // Initial fetch of alerts
        fetchAlerts();

        // Auto refresh every 10 seconds
        const intervalId = setInterval(fetchAlerts, 10000);

        // Cleanup interval when component unmounts
        return () => clearInterval(intervalId);
    }, []);

    // Delete alert by ID
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/emergency/admin/${id}`);
         toast.success("Deleted succesfully")
            // Remove the deleted alert from state
            setAlerts(alerts.filter((alert) => alert._id !== id));
        } catch (error) {
            console.error('Error deleting alert:', error);
            alert('Failed to delete alert');
        }
    };

    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-5">Emergency Notifications</h2>
            <div className="grid grid-cols-1 gap-4">
                {alerts.map((alert) => (
                    <div key={alert._id} className="p-4 bg-white shadow-md rounded flex justify-between items-center">
                        <div>
                            <p>
                                <strong>Type:</strong> {alert.emergencyType}
                            </p>
                            <p>
                                <strong>Severity:</strong> {alert.severity}
                            </p>
                            <p>
                                <strong>Location:</strong> {alert.location}
                            </p>
                            <p>
                                <strong>Created At:</strong>{' '}
                                {new Date(alert.createdAt).toLocaleString()}
                            </p>
                        </div>
                        <button
                            onClick={() => handleDelete(alert._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminEmergencyAlert;
