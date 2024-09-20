import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSystemAdministrators = async (req, res) => {
    try {
        const systemAdministrators = await prisma.systemAdministrator.findMany();
        res.status(200).json(systemAdministrators);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch system administrators' });
    }
};

export const createSystemAdministrator = async (req, res) => {
    const { employee_id } = req.body;
    try {
        const systemAdministrator = await prisma.systemAdministrator.create({
            data: {
                employee_id,
            },
        });
        res.status(201).json(systemAdministrator);
    } catch (error) {
        res.status(500).json({ error: 'System administrator creation failed' });
    }
};

export const getSystemAdministratorById = async (req, res) => {
    const { id } = req.query;
    try {
        const systemAdministrator = await prisma.systemAdministrator.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(systemAdministrator);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch system administrator' });
    }
};

export const updateSystemAdministrator = async (req, res) => {
    const { id } = req.query;
    const { employee_id } = req.body;
    try {
        const systemAdministrator = await prisma.systemAdministrator.update({
            where: { id: Number(id) },
            data: {
                employee_id,
            },
        });
        res.status(200).json(systemAdministrator);
    } catch (error) {
        res.status(500).json({ error: 'System administrator update failed' });
    }
};

export const deleteSystemAdministrator = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.systemAdministrator.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'System administrator deletion failed' });
    }
};
