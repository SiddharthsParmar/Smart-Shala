import { Resource } from "../Models/Resource.js";
import { Teacher } from "../Models/Teacher.js";
import { ResourceRequest } from "../Models/ResourceRequest.js";
import mongoose from 'mongoose';

// Add a new resource
export const addResource = async (req, res) => {
    const { name, quantity, description } = req.body;
    const resource = new Resource({ name, quantity, description });

    try {
        await resource.save();
        res.status(201).json({ message: "Resource added successfully", resource });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err });
    }
};

// Get all resources
export const getResources = async (req, res) => {
    try {
        const resources = await Resource.find({});
        res.status(200).json({ message: "Success", resources });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err });
    }
};

// Request a resource
export const requestResource = async (req, res) => {
    const { teacherId, resourceId, quantity } = req.body;

    try {
        const resource = await Resource.findById(resourceId);
        if (!resource || resource.quantity < Number(quantity)) {
            return res.status(400).json({ message: "Resource not available or insufficient quantity" });
        }
        
        const request = new ResourceRequest({
            teacher: teacherId,
            resource: resourceId,
            quantity: Number(quantity),
        });

        await request.save();

        res.status(201).json({ message: "Resource requested successfully", request });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err });
    }
};

// Get all resource requests
export const getResourceRequests = async (req, res) => {
    try {
        const requests = await ResourceRequest.find({}).populate(['teacher','resource']);
        res.status(200).json({ message: "Success", requests });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err });
    }
};

// Approve a resource request
export const approveResourceRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const request = await ResourceRequest.findById(id).populate('resource');
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        const resource = request.resource;
        if (resource.quantity < request.quantity) {
            return res.status(400).json({ message: "Insufficient resource quantity" });
        }

        resource.usedQuantity += request.quantity;
        request.status = "Approved";

        await resource.save();
        await request.save();

        res.status(200).json({ message: "Resource request approved", request });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err });
    }
};