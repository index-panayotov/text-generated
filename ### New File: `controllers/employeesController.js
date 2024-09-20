import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEmployees = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
};

export const createEmployee = async (req, res) => {
    const { first_name, last_name, email, position_id } = req.body;
    try {
        const employee = await prisma.employee.create({
            data: {
                first_name,
                last_name,
                email,
                position_id,
            },
        });
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Employee creation failed' });
    }
};

export const getEmployeeById = async (req, res) => {
    const { id } = req.query;
    try {
        const employee = await prisma.employee.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
};

export const updateEmployee = async (req, res) => {
    const { id } = req.query;
    const { first_name, last_name, email, position_id } = req.body;
    try {
        const employee = await prisma.employee.update({
            where: { id: Number(id) },
            data: {
                first_name,
                last_name,
                email,
                position_id,
            },
        });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Employee update failed' });
    }
};

export const deleteEmployee = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.employee.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Employee deletion failed' });
    }
};
