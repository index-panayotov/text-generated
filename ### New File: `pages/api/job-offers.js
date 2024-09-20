import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const jobOffers = await prisma.jobOffer.findMany();
            res.status(200).json(jobOffers);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch job offers' });
        }
    } else if (req.method === 'POST') {
        const { title, description } = req.body;

        try {
            const jobOffer = await prisma.jobOffer.create({
                data: {
                    title,
                    description,
                },
            });
            res.status(201).json(jobOffer);
        } catch (error) {
            res.status(500).json({ error: 'Job offer creation failed' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
