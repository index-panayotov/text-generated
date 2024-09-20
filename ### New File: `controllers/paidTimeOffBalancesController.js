import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPaidTimeOffBalances = async (req, res) => {
    try {
        const paidTimeOffBalances = await prisma.paidTimeOffBalance.findMany();
        res.status(200).json(paidTimeOffBalances);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch paid time off balances' });
    }
};

export const createPaidTimeOffBalance = async (req, res) => {
    const { employee_id, hours_paid_left } = req.body;
    try {
        const paidTimeOffBalance = await prisma.paidTimeOffBalance.create({
            data: {
                employee_id,
                hours_paid_left,
            },
        });
        res.status(201).json(paidTimeOffBalance);
    } catch (error) {
        res.status(500).json({ error: 'Paid time off balance creation failed' });
    }
};

export const getPaidTimeOffBalanceById = async (req, res) => {
    const { id } = req.query;
    try {
        const paidTimeOffBalance = await prisma.paidTimeOffBalance.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(paidTimeOffBalance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch paid time off balance' });
    }
};

export const updatePaidTimeOffBalance = async (req, res) => {
    const { id } = req.query;
    const { employee_id, hours_paid_left } = req.body;
    try {
        const paidTimeOffBalance = await prisma.paidTimeOffBalance.update({
            where: { id: Number(id) },
            data: {
                employee_id,
                hours_paid_left,
            },
        });
        res.status(200).json(paidTimeOffBalance);
    } catch (error) {
        res.status(500).json({ error: 'Paid time off balance update failed' });
    }
};

export const deletePaidTimeOffBalance = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.paidTimeOffBalance.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Paid time off balance deletion failed' });
    }
};
