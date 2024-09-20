import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPriorityLevels = async (req, res) => {
    try {
        const priorityLevels = await prisma.priorityLevel.findMany();
        res.status(200).json(priorityLevels);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch priority levels' });
    }
};

export const createPriorityLevel = async (req, res) => {
    const { priority_name, resolution_time } = req.body;
    try {
        const priorityLevel = await prisma.priorityLevel.create({
            data: {
                priority_name,
                resolution_time,
            },
        });
        res.status(201).json(priorityLevel);
    } catch (error) {
        res.status(500).json({ error: 'Priority level creation failed' });
    }
};

export const getPriorityLevelById = async (req, res) => {
    const { id } = req.query;
    try {
        const priorityLevel = await prisma.priorityLevel.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(priorityLevel);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch priority level' });
    }
};

export const updatePriorityLevel = async (req, res) => {
    const { id } = req.query;
    const { priority_name, resolution_time } = req.body;
    try {
        const priorityLevel = await prisma.priorityLevel.update({
            where: { id: Number(id) },
            data: {
                priority_name,
                resolution_time,
            },
        });
        res.status(200).json(priorityLevel);
    } catch (error) {
        res.status(500).json({ error: 'Priority level update failed' });
    }
};

export const deletePriorityLevel = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.priorityLevel.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Priority level deletion failed' });
    }
};
