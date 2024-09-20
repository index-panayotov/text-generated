import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTimeOffRequests = async (req, res) => {
    try {
        const timeOffRequests = await prisma.timeOffRequest.findMany();
        res.status(200).json(timeOffRequests);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch time off requests' });
    }
};

export const createTimeOffRequest = async (req, res) => {
    const { employee_id, start_date, end_date, hours_requested, request_type, reason } = req.body;
    try {
        const timeOffRequest = await prisma.timeOffRequest.create({
            data: {
                employee_id,
                start_date,
                end_date,
                hours_requested,
                request_type,
                reason,
            },
        });
        res.status(201).json(timeOffRequest);
    } catch (error) {
        res.status(500).json({ error: 'Time off request creation failed' });
    }
};

export const getTimeOffRequestById = async (req, res) => {
    const { id } = req.query;
    try {
        const timeOffRequest = await prisma.timeOffRequest.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(timeOffRequest);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch time off request' });
    }
};

export const updateTimeOffRequest = async (req, res) => {
    const { id } = req.query;
    const { employee_id, start_date, end_date, hours_requested, request_type, reason } = req.body;
    try {
        const timeOffRequest = await prisma.timeOffRequest.update({
            where: { id: Number(id) },
            data: {
                employee_id,
                start_date,
                end_date,
                hours_requested,
                request_type,
                reason,
            },
        });
        res.status(200).json(timeOffRequest);
    } catch (error) {
        res.status(500).json({ error: 'Time off request update failed' });
    }
};

export const deleteTimeOffRequest = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.timeOffRequest.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Time off request deletion failed' });
    }
};
