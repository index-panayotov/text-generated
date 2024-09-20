import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getJobOffers = async (req, res) => {
    try {
        const jobOffers = await prisma.jobOffer.findMany();
        res.status(200).json(jobOffers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch job offers' });
    }
};

export const createJobOffer = async (req, res) => {
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
};

export const getJobOfferById = async (req, res) => {
    const { id } = req.query;
    try {
        const jobOffer = await prisma.jobOffer.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(jobOffer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch job offer' });
    }
};

export const updateJobOffer = async (req, res) => {
    const { id } = req.query;
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
};

export const deleteJobOffer = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.jobOffer.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Job offer deletion failed' });
    }
};
