import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjectDocuments = async (req, res) => {
    try {
        const projectDocuments = await prisma.projectDocument.findMany();
        res.status(200).json(projectDocuments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch project documents' });
    }
};

export const createProjectDocument = async (req, res) => {
    const { project_id, document_name, document_url, visibility, version_number } = req.body;
    try {
        const projectDocument = await prisma.projectDocument.create({
            data: {
                project_id,
                document_name,
                document_url,
                visibility,
                version_number,
            },
        });
        res.status(201).json(projectDocument);
    } catch (error) {
        res.status(500).json({ error: 'Project document creation failed' });
    }
};

export const getProjectDocumentById = async (req, res) => {
    const { id } = req.query;
    try {
        const projectDocument = await prisma.projectDocument.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(projectDocument);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch project document' });
    }
};

export const updateProjectDocument = async (req, res) => {
    const { id } = req.query;
    const { project_id, document_name, document_url, visibility, version_number } = req.body;
    try {
        const projectDocument = await prisma.projectDocument.update({
            where: { id: Number(id) },
            data: {
                project_id,
                document_name,
                document_url,
                visibility,
                version_number,
            },
        });
        res.status(200).json(projectDocument);
    } catch (error) {
        res.status(500).json({ error: 'Project document update failed' });
    }
};

export const deleteProjectDocument = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.projectDocument.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Project document deletion failed' });
    }
};
