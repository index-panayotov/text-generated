import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCandidateTests = async (req, res) => {
    try {
        const candidateTests = await prisma.candidateTest.findMany();
        res.status(200).json(candidateTests);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch candidate tests' });
    }
};

export const createCandidateTest = async (req, res) => {
    const { candidate_id, test_data, completion_date, test_status, reviewed_by, review_comments } = req.body;
    try {
        const candidateTest = await prisma.candidateTest.create({
            data: {
                candidate_id,
                test_data,
                completion_date,
                test_status,
                reviewed_by,
                review_comments,
            },
        });
        res.status(201).json(candidateTest);
    } catch (error) {
        res.status(500).json({ error: 'Candidate test creation failed' });
    }
};

export const getCandidateTestById = async (req, res) => {
    const { id } = req.query;
    try {
        const candidateTest = await prisma.candidateTest.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(candidateTest);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch candidate test' });
    }
};

export const updateCandidateTest = async (req, res) => {
    const { id } = req.query;
    const { candidate_id, test_data, completion_date, test_status, reviewed_by, review_comments } = req.body;
    try {
        const candidateTest = await prisma.candidateTest.update({
            where: { id: Number(id) },
            data: {
                candidate_id,
                test_data,
                completion_date,
                test_status,
                reviewed_by,
                review_comments,
            },
        });
        res.status(200).json(candidateTest);
    } catch (error) {
        res.status(500).json({ error: 'Candidate test update failed' });
    }
};

export const deleteCandidateTest = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.candidateTest.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Candidate test deletion failed' });
    }
};
