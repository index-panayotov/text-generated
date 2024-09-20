import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
                select: {
                    id: true,
                    email: true,
                    password: true,
                    role: true, // Include role in the response
                },
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    } else if (req.method === 'PUT') {
        const { email, password, role } = req.body;

        try {
            const user = await prisma.user.update({
                where: { id: Number(id) },
                data: {
                    email,
                    password, // In a real application, make sure to hash the password!
                    role, // Update the role
                },
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'User update failed' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
