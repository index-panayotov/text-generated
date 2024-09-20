import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

export const createProject = async (req, res) => {
    const { client_id, project_name, start_date, end_date, status, description } = req.body;
    try {
        const project = await prisma.project.create({
            data: {
                client_id,
                project_name,
                start_date,
                end_date,
                status,
                description,
            },
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Project creation failed' });
    }
};

export const getProjectById = async (req, res) => {
    const { id } = req.query;
    try {
        const project = await prisma.project.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch project' });
    }
};

export const updateProject = async (req, res) => {
    const { id } = req.query;
    const { client_id, project_name, start_date, end_date, status, description } = req.body;
    try {
        const project = await prisma.project.update({
            where: { id: Number(id) },
            data: {
                client_id,
                project_name,
                start_date,
                end_date,
                status,
                description,
            },
        });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Project update failed' });
    }
};

export const deleteProject = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.project.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Project deletion failed' });
    }
};
