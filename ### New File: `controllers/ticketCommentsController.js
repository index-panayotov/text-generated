import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTicketComments = async (req, res) => {
    try {
        const ticketComments = await prisma.ticketComment.findMany();
        res.status(200).json(ticketComments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ticket comments' });
    }
};

export const createTicketComment = async (req, res) => {
    const { ticket_id, comment_by, comment_text } = req.body;
    try {
        const ticketComment = await prisma.ticketComment.create({
            data: {
                ticket_id,
                comment_by,
                comment_text,
            },
        });
        res.status(201).json(ticketComment);
    } catch (error) {
        res.status(500).json({ error: 'Ticket comment creation failed' });
    }
};

export const getTicketCommentById = async (req, res) => {
    const { id } = req.query;
    try {
        const ticketComment = await prisma.ticketComment.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(ticketComment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ticket comment' });
    }
};

export const updateTicketComment = async (req, res) => {
    const { id } = req.query;
    const { ticket_id, comment_by, comment_text } = req.body;
    try {
        const ticketComment = await prisma.ticketComment.update({
            where: { id: Number(id) },
            data: {
                ticket_id,
                comment_by,
                comment_text,
            },
        });
        res.status(200).json(ticketComment);
    } catch (error) {
        res.status(500).json({ error: 'Ticket comment update failed' });
    }
};

export const deleteTicketComment = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.ticketComment.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Ticket comment deletion failed' });
    }
};
