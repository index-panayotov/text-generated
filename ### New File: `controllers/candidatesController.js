import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCandidates = async (req, res) => {
    try {
        const candidates = await prisma.candidate.findMany();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch candidates' });
    }
};

export const createCandidate = async (req, res) => {
    const { name, email, jobOfferId } = req.body;
    try {
        const candidate = await prisma.candidate.create({
            data: {
                name,
                email,
                jobOfferId,
            },
        });
        res.status(201).json(candidate);
    } catch (error) {
        res.status(500).json({ error: 'Candidate creation failed' });
    }
};

export const getCandidateById = async (req, res) => {
    const { id } = req.query;
    try {
        const candidate = await prisma.candidate.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch candidate' });
    }
};

export const updateCandidate = async (req, res) => {
    const { id } = req.query;
    const { name, email, jobOfferId } = req.body;
    try {
        const candidate = await prisma.candidate.update({
            where: { id: Number(id) },
            data: {
                name,
                email,
                jobOfferId,
            },
        });
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ error: 'Candidate update failed' });
    }
};

export const deleteCandidate = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.candidate.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Candidate deletion failed' });
    }
};
