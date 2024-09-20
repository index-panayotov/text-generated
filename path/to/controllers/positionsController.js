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
            data: { position_name, description },
        });
        res.status(201).json(position);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create position' });
    }
};

// Add more functions for update and delete as needed
