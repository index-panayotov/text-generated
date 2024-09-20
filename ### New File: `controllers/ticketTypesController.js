import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTicketTypes = async (req, res) => {
    try {
        const ticketTypes = await prisma.ticketType.findMany();
        res.status(200).json(ticketTypes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ticket types' });
    }
};

export const createTicketType = async (req, res) => {
    const { type_name, description } = req.body;
    try {
        const ticketType = await prisma.ticketType.create({
            data: {
                type_name,
                description,
            },
        });
        res.status(201).json(ticketType);
    } catch (error) {
        res.status(500).json({ error: 'Ticket type creation failed' });
    }
};

export const getTicketTypeById = async (req, res) => {
    const { id } = req.query;
    try {
        const ticketType = await prisma.ticketType.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(ticketType);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ticket type' });
    }
};

export const updateTicketType = async (req, res) => {
    const { id } = req.query;
    const { type_name, description } = req.body;
    try {
        const ticketType = await prisma.ticketType.update({
            where: { id: Number(id) },
            data: {
                type_name,
                description,
            },
        });
        res.status(200).json(ticketType);
    } catch (error) {
        res.status(500).json({ error: 'Ticket type update failed' });
    }
};

export const deleteTicketType = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.ticketType.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Ticket type deletion failed' });
    }
};
