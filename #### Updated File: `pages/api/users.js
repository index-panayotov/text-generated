import { PrismaClient } from '@prisma/client';
import { withAuth } from '../../lib/middleware';

const prisma = new PrismaClient();

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                },
            });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default withAuth(handler);
