import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjectAssignments = async (req, res) => {
    try {
        const projectAssignments = await prisma.projectAssignment.findMany();
        res.status(200).json(projectAssignments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch project assignments' });
    }
};

export const createProjectAssignment = async (req, res) => {
    const { project_id, employee_id, allocation_percentage } = req.body;
    try {
        const projectAssignment = await prisma.projectAssignment.create({
            data: {
                project_id,
                employee_id,
                allocation_percentage,
            },
        });
        res.status(201).json(projectAssignment);
    } catch (error) {
        res.status(500).json({ error: 'Project assignment creation failed' });
    }
};

export const getProjectAssignmentById = async (req, res) => {
    const { id } = req.query;
    try {
        const projectAssignment = await prisma.projectAssignment.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(projectAssignment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch project assignment' });
    }
};

export const updateProjectAssignment = async (req, res) => {
    const { id } = req.query;
    const { project_id, employee_id, allocation_percentage } = req.body;
    try {
        const projectAssignment = await prisma.projectAssignment.update({
            where: { id: Number(id) },
            data: {
                project_id,
                employee_id,
                allocation_percentage,
            },
        });
        res.status(200).json(projectAssignment);
    } catch (error) {
        res.status(500).json({ error: 'Project assignment update failed' });
    }
};

export const deleteProjectAssignment = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.projectAssignment.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Project assignment deletion failed' });
    }
};
