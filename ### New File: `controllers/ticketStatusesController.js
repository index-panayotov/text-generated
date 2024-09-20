import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTicketStatuses = async (req, res) => {
    try {
        const ticketStatuses = await prisma.ticketStatus.findMany();
        res.status(200).json(ticketStatuses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ticket statuses' });
    }
};

export const createTicketStatus = async (req, res) => {
    const { ticket_id, status, changed_by } = req.body;
    try {
        const ticketStatus = await prisma.ticketStatus.create({
            data: {
                ticket_id,
                status,
                changed_by,
            },
        });
        res.status(201).json(ticketStatus);
    } catch (error) {
        res.status(500).json({ error: 'Ticket status creation failed' });
    }
};

export const getTicketStatusById = async (req, res) => {
    const { id } = req.query;
    try {
        const ticketStatus = await prisma.ticketStatus.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(ticketStatus);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ticket status' });
    }
};

export const updateTicketStatus = async (req, res) => {
    const { id } = req.query;
    const { ticket_id, status, changed_by } = req.body;
    try {
        const ticketStatus = await prisma.ticketStatus.update({
            where: { id: Number(id) },
            data: {
                ticket_id,
                status,
                changed_by,
            },
        });
        res.status(200).json(ticketStatus);
    } catch (error) {
        res.status(500).json({ error: 'Ticket status update failed' });
    }
};

export const deleteTicketStatus = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.ticketStatus.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Ticket status deletion failed' });
    }
};
