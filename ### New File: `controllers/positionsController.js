import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPositions = async (req, res) => {
    try {
        const positions = await prisma.position.findMany();
        res.status(200).json(positions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch positions' });
    }
};

export const createPosition = async (req, res) => {
    const { position_name, description } = req.body;
    try {
        const position = await prisma.position.create({
            data: {
                position_name,
                description,
            },
        });
        res.status(201).json(position);
    } catch (error) {
        res.status(500).json({ error: 'Position creation failed' });
    }
};

export const getPositionById = async (req, res) => {
    const { id } = req.query;
    try {
        const position = await prisma.position.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(position);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch position' });
    }
};

export const updatePosition = async (req, res) => {
    const { id } = req.query;
    const { position_name, description } = req.body;
    try {
        const position = await prisma.position.update({
            where: { id: Number(id) },
            data: {
                position_name,
                description,
            },
        });
        res.status(200).json(position);
    } catch (error) {
        res.status(500).json({ error: 'Position update failed' });
    }
};

export const deletePosition = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.position.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Position deletion failed' });
    }
};
