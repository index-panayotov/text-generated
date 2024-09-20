import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEmployees = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany({
            include: {
                position: true,
                working_location: true,
            },
        });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
};

export const createEmployee = async (req, res) => {
    const { first_name, last_name, email, position_id, start_date, profile_image, manager_id, department_id, living_address, working_location_id } = req.body;
    try {
        const employee = await prisma.employee.create({
            data: {
                first_name,
                last_name,
                email,
                position_id,
                start_date,
                profile_image,
                manager_id,
                department_id,
                living_address,
                working_location_id,
            },
        });
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create employee' });
    }
};

// Add more functions for update and delete as needed
