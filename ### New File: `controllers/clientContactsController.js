import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getClientContacts = async (req, res) => {
    try {
        const clientContacts = await prisma.clientContact.findMany();
        res.status(200).json(clientContacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch client contacts' });
    }
};

export const createClientContact = async (req, res) => {
    const { client_id, contact_name, contact_email, contact_phone, contact_address } = req.body;
    try {
        const clientContact = await prisma.clientContact.create({
            data: {
                client_id,
                contact_name,
                contact_email,
                contact_phone,
                contact_address,
            },
        });
        res.status(201).json(clientContact);
    } catch (error) {
        res.status(500).json({ error: 'Client contact creation failed' });
    }
};

export const getClientContactById = async (req, res) => {
    const { id } = req.query;
    try {
        const clientContact = await prisma.clientContact.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(clientContact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch client contact' });
    }
};

export const updateClientContact = async (req, res) => {
    const { id } = req.query;
    const { client_id, contact_name, contact_email, contact_phone, contact_address } = req.body;
    try {
        const clientContact = await prisma.clientContact.update({
            where: { id: Number(id) },
            data: {
                client_id,
                contact_name,
                contact_email,
                contact_phone,
                contact_address,
            },
        });
        res.status(200).json(clientContact);
    } catch (error) {
        res.status(500).json({ error: 'Client contact update failed' });
    }
};

export const deleteClientContact = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.clientContact.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Client contact deletion failed' });
    }
};
