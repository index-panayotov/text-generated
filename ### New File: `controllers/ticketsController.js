import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTickets = async (req, res) => {
    try {
        const tickets = await prisma.ticket.findMany();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
};

export const createTicket = async (req, res) => {
    const { submitted_by, ticket_type_id, description, priority_level_id, status } = req.body;
    try {
        const ticket = await prisma.ticket.create({
            data: {
                submitted_by,
                ticket_type_id,
                description,
                priority_level_id,
                status,
            },
        });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Ticket creation failed' });
    }
};

export const getTicketById = async (req, res) => {
    const { id } = req.query;
    try {
        const ticket = await prisma.ticket.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ticket' });
    }
};

export const updateTicket = async (req, res) => {
    const { id } = req.query;
    const { submitted_by, ticket_type_id, description, priority_level_id, status } = req.body;
    try {
        const ticket = await prisma.ticket.update({
            where: { id: Number(id) },
            data: {
                submitted_by,
                ticket_type_id,
                description,
                priority_level_id,
                status,
            },
        });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Ticket update failed' });
    }
};

export const deleteTicket = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.ticket.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Ticket deletion failed' });
    }
};
