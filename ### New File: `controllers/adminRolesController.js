import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAdminRoles = async (req, res) => {
    try {
        const adminRoles = await prisma.adminRole.findMany();
        res.status(200).json(adminRoles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch admin roles' });
    }
};

export const createAdminRole = async (req, res) => {
    const { role_name, description } = req.body;
    try {
        const adminRole = await prisma.adminRole.create({
            data: {
                role_name,
                description,
            },
        });
        res.status(201).json(adminRole);
    } catch (error) {
        res.status(500).json({ error: 'Admin role creation failed' });
    }
};

export const getAdminRoleById = async (req, res) => {
    const { id } = req.query;
    try {
        const adminRole = await prisma.adminRole.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(adminRole);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch admin role' });
    }
};

export const updateAdminRole = async (req, res) => {
    const { id } = req.query;
    const { role_name, description } = req.body;
    try {
        const adminRole = await prisma.adminRole.update({
            where: { id: Number(id) },
            data: {
                role_name,
                description,
            },
        });
        res.status(200).json(adminRole);
    } catch (error) {
        res.status(500).json({ error: 'Admin role update failed' });
    }
};

export const deleteAdminRole = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.adminRole.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Admin role deletion failed' });
    }
};
