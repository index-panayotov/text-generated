import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const candidates = await prisma.candidate.findMany({
                include: {
                    jobOffer: true, // Include job offer details
                },
            });
            res.status(200).json(candidates);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch candidates' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
