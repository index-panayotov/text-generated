import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getWorkingLocations = async (req, res) => {
    try {
        const workingLocations = await prisma.workingLocation.findMany();
        res.status(200).json(workingLocations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch working locations' });
    }
};

export const createWorkingLocation = async (req, res) => {
    const { location_name, description } = req.body;
    try {
        const workingLocation = await prisma.workingLocation.create({
            data: {
                location_name,
                description,
            },
        });
        res.status(201).json(workingLocation);
    } catch (error) {
        res.status(500).json({ error: 'Working location creation failed' });
    }
};

export const getWorkingLocationById = async (req, res) => {
    const { id } = req.query;
    try {
        const workingLocation = await prisma.workingLocation.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(workingLocation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch working location' });
    }
};

export const updateWorkingLocation = async (req, res) => {
    const { id } = req.query;
    const { location_name, description } = req.body;
    try {
        const workingLocation = await prisma.workingLocation.update({
            where: { id: Number(id) },
            data: {
                location_name,
                description,
            },
        });
        res.status(200).json(workingLocation);
    } catch (error) {
        res.status(500).json({ error: 'Working location update failed' });
    }
};

export const deleteWorkingLocation = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.workingLocation.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Working location deletion failed' });
    }
};
