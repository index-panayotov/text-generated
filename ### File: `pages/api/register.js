import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    password, // In a real application, make sure to hash the password!
                },
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'User registration failed' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
