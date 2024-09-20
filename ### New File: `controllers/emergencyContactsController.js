import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEmergencyContacts = async (req, res) => {
    try {
        const emergencyContacts = await prisma.emergencyContact.findMany();
        res.status(200).json(emergencyContacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch emergency contacts' });
    }
};

export const createEmergencyContact = async (req, res) => {
    const { employee_id, contact_name, relationship, phone_number, email } = req.body;
    try {
        const emergencyContact = await prisma.emergencyContact.create({
            data: {
                employee_id,
                contact_name,
                relationship,
                phone_number,
                email,
            },
        });
        res.status(201).json(emergencyContact);
    } catch (error) {
        res.status(500).json({ error: 'Emergency contact creation failed' });
    }
};

export const getEmergencyContactById = async (req, res) => {
    const { id } = req.query;
    try {
        const emergencyContact = await prisma.emergencyContact.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(emergencyContact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch emergency contact' });
    }
};

export const updateEmergencyContact = async (req, res) => {
    const { id } = req.query;
    const { employee_id, contact_name, relationship, phone_number, email } = req.body;
    try {
        const emergencyContact = await prisma.emergencyContact.update({
            where: { id: Number(id) },
            data: {
                employee_id,
                contact_name,
                relationship,
                phone_number,
                email,
            },
        });
        res.status(200).json(emergencyContact);
    } catch (error) {
        res.status(500).json({ error: 'Emergency contact update failed' });
    }
};

export const deleteEmergencyContact = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.emergencyContact.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Emergency contact deletion failed' });
    }
};
