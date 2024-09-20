import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password, // In a real application, make sure to hash the password!
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'User creation failed' });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.query;
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.query;
    const { email, password } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: {
                email,
                password, // In a real application, make sure to hash the password!
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'User update failed' });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.user.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'User deletion failed' });
    }
};
