import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSystemAdminRoles = async (req, res) => {
    try {
        const systemAdminRoles = await prisma.systemAdminRole.findMany();
        res.status(200).json(systemAdminRoles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch system admin roles' });
    }
};

export const createSystemAdminRole = async (req, res) => {
    const { system_admin_id, role_id } = req.body;
    try {
        const systemAdminRole = await prisma.systemAdminRole.create({
            data: {
                system_admin_id,
                role_id,
            },
        });
        res.status(201).json(systemAdminRole);
    } catch (error) {
        res.status(500).json({ error: 'System admin role creation failed' });
    }
};

export const getSystemAdminRoleById = async (req, res) => {
    const { id } = req.query;
    try {
        const systemAdminRole = await prisma.systemAdminRole.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(systemAdminRole);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch system admin role' });
    }
};

export const updateSystemAdminRole = async (req, res) => {
    const { id } = req.query;
    const { system_admin_id, role_id } = req.body;
    try {
        const systemAdminRole = await prisma.systemAdminRole.update({
            where: { id: Number(id) },
            data: {
                system_admin_id,
                role_id,
            },
        });
        res.status(200).json(systemAdminRole);
    } catch (error) {
        res.status(500).json({ error: 'System admin role update failed' });
    }
};

export const deleteSystemAdminRole = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.systemAdminRole.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'System admin role deletion failed' });
    }
};
