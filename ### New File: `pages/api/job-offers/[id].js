import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const jobOffer = await prisma.jobOffer.findUnique({
                where: { id: Number(id) },
            });
            res.status(200).json(jobOffer);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch job offer' });
        }
    } else if (req.method === 'PUT') {
        const { title, description } = req.body;

        try {
            const jobOffer = await prisma.jobOffer.update({
                where: { id: Number(id) },
                data: {
                    title,
                    description,
                },
            });
            res.status(200).json(jobOffer);
        } catch (error) {
            res.status(500).json({ error: 'Job offer update failed' });
        }
    } else if (req.method === 'DELETE') {
        try {
            await prisma.jobOffer.delete({
                where: { id: Number(id) },
            });
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: 'Job offer deletion failed' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
