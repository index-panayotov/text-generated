import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEmployeeBenefits = async (req, res) => {
    try {
        const employeeBenefits = await prisma.employeeBenefit.findMany();
        res.status(200).json(employeeBenefits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employee benefits' });
    }
};

export const createEmployeeBenefit = async (req, res) => {
    const { employee_id, benefit_id, is_paid_by_company, start_date, end_date, price } = req.body;
    try {
        const employeeBenefit = await prisma.employeeBenefit.create({
            data: {
                employee_id,
                benefit_id,
                is_paid_by_company,
                start_date,
                end_date,
                price,
            },
        });
        res.status(201).json(employeeBenefit);
    } catch (error) {
        res.status(500).json({ error: 'Employee benefit creation failed' });
    }
};

export const getEmployeeBenefitById = async (req, res) => {
    const { id } = req.query;
    try {
        const employeeBenefit = await prisma.employeeBenefit.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(employeeBenefit);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employee benefit' });
    }
};

export const updateEmployeeBenefit = async (req, res) => {
    const { id } = req.query;
    const { employee_id, benefit_id, is_paid_by_company, start_date, end_date, price } = req.body;
    try {
        const employeeBenefit = await prisma.employeeBenefit.update({
            where: { id: Number(id) },
            data: {
                employee_id,
                benefit_id,
                is_paid_by_company,
                start_date,
                end_date,
                price,
            },
        });
        res.status(200).json(employeeBenefit);
    } catch (error) {
        res.status(500).json({ error: 'Employee benefit update failed' });
    }
};

export const deleteEmployeeBenefit = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.employeeBenefit.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Employee benefit deletion failed' });
    }
};
