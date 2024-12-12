import React, { useState } from 'react';
import axios from 'axios';

function AlerEmergency() {
    const [formData, setFormData] = useState({
        emergencyType: '',
        severity: '',
        location: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/alerts', formData);
            alert('Alert sent successfully!');
            setFormData({ emergencyType: '', severity: '', location: '' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-5 shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Send Emergency Alert</h2>
            <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Emergency Type</label>
                <input
                    type="text"
                    value={formData.emergencyType}
                    onChange={(e) => setFormData({ ...formData, emergencyType: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Severity</label>
                <input
                    type="text"
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <button type="submit" className="bg-sky-800 text-white py-2 px-4 rounded">
                Send Alert
            </button>
        </form>
    );
}

export default AlerEmergency;
