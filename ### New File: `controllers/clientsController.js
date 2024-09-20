import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getClients = async (req, res) => {
    try {
        const clients = await prisma.client.findMany();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
};

export const createClient = async (req, res) => {
    const { client_name, spending, projects_count, status, progress_status, client_health } = req.body;
    try {
        const client = await prisma.client.create({
            data: {
                client_name,
                spending,
                projects_count,
                status,
                progress_status,
                client_health,
            },
        });
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ error: 'Client creation failed' });
    }
};

export const getClientById = async (req, res) => {
    const { id } = req.query;
    try {
        const client = await prisma.client.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch client' });
    }
};

export const updateClient = async (req, res) => {
    const { id } = req.query;
    const { client_name, spending, projects_count, status, progress_status, client_health } = req.body;
    try {
        const client = await prisma.client.update({
            where: { id: Number(id) },
            data: {
                client_name,
                spending,
                projects_count,
                status,
                progress_status,
                client_health,
            },
        });
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: 'Client update failed' });
    }
};

export const deleteClient = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.client.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Client deletion failed' });
    }
};
