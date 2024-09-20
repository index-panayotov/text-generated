import { PrismaClient } from '@prisma/client';
import { withAuth } from '../../../lib/middleware';

const prisma = new PrismaClient();

const handler = async (req, res) => {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
                select: {
                    id: true,
                    email: true,
                    password: true,
                },
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    } else if (req.method === 'PUT') {
        const { email, password } = req.body;

        try {
            const user = await prisma.user.update({
                where: { id: Number(id) },
                data: {
                    email,
                    password,
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
};

export default withAuth(handler);
