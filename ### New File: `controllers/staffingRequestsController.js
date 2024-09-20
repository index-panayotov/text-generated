import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getStaffingRequests = async (req, res) => {
    try {
        const staffingRequests = await prisma.staffingRequest.findMany();
        res.status(200).json(staffingRequests);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch staffing requests' });
    }
};

export const createStaffingRequest = async (req, res) => {
    const { project_id, change_type, employee_id, requested_by, status } = req.body;
    try {
        const staffingRequest = await prisma.staffingRequest.create({
            data: {
                project_id,
                change_type,
                employee_id,
                requested_by,
                status,
            },
        });
        res.status(201).json(staffingRequest);
    } catch (error) {
        res.status(500).json({ error: 'Staffing request creation failed' });
    }
};

export const getStaffingRequestById = async (req, res) => {
    const { id } = req.query;
    try {
        const staffingRequest = await prisma.staffingRequest.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(staffingRequest);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch staffing request' });
    }
};

export const updateStaffingRequest = async (req, res) => {
    const { id } = req.query;
    const { project_id, change_type, employee_id, requested_by, status } = req.body;
    try {
        const staffingRequest = await prisma.staffingRequest.update({
            where: { id: Number(id) },
            data: {
                project_id,
                change_type,
                employee_id,
                requested_by,
                status,
            },
        });
        res.status(200).json(staffingRequest);
    } catch (error) {
        res.status(500).json({ error: 'Staffing request update failed' });
    }
};

export const deleteStaffingRequest = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.staffingRequest.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Staffing request deletion failed' });
    }
};
