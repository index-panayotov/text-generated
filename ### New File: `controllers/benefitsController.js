import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBenefits = async (req, res) => {
    try {
        const benefits = await prisma.benefit.findMany();
        res.status(200).json(benefits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch benefits' });
    }
};

export const createBenefit = async (req, res) => {
    const { benefit_name, benefit_type, description, price } = req.body;
    try {
        const benefit = await prisma.benefit.create({
            data: {
                benefit_name,
                benefit_type,
                description,
                price,
            },
        });
        res.status(201).json(benefit);
    } catch (error) {
        res.status(500).json({ error: 'Benefit creation failed' });
    }
};

export const getBenefitById = async (req, res) => {
    const { id } = req.query;
    try {
        const benefit = await prisma.benefit.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(benefit);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch benefit' });
    }
};

export const updateBenefit = async (req, res) => {
    const { id } = req.query;
    const { benefit_name, benefit_type, description, price } = req.body;
    try {
        const benefit = await prisma.benefit.update({
            where: { id: Number(id) },
            data: {
                benefit_name,
                benefit_type,
                description,
                price,
            },
        });
        res.status(200).json(benefit);
    } catch (error) {
        res.status(500).json({ error: 'Benefit update failed' });
    }
};

export const deleteBenefit = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.benefit.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Benefit deletion failed' });
    }
};
