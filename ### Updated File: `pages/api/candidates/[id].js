import { PrismaClient } from '@prisma/client';
import { withAuth } from '../../../lib/middleware';

const prisma = new PrismaClient();

const handler = async (req, res) => {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const candidate = await prisma.candidate.findUnique({
                where: { id: Number(id) },
                include: {
                    jobOffer: true,
                },
            });
            res.status(200).json(candidate);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch candidate' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default withAuth(handler);
