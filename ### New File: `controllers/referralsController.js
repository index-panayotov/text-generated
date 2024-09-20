import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getReferrals = async (req, res) => {
    try {
        const referrals = await prisma.referral.findMany();
        res.status(200).json(referrals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch referrals' });
    }
};

export const createReferral = async (req, res) => {
    const { referred_by, candidate_id, job_offer_id, status, referral_date, referral_reward_status } = req.body;
    try {
        const referral = await prisma.referral.create({
            data: {
                referred_by,
                candidate_id,
                job_offer_id,
                status,
                referral_date,
                referral_reward_status,
            },
        });
        res.status(201).json(referral);
    } catch (error) {
        res.status(500).json({ error: 'Referral creation failed' });
    }
};

export const getReferralById = async (req, res) => {
    const { id } = req.query;
    try {
        const referral = await prisma.referral.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(referral);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch referral' });
    }
};

export const updateReferral = async (req, res) => {
    const { id } = req.query;
    const { referred_by, candidate_id, job_offer_id, status, referral_date, referral_reward_status } = req.body;
    try {
        const referral = await prisma.referral.update({
            where: { id: Number(id) },
            data: {
                referred_by,
                candidate_id,
                job_offer_id,
                status,
                referral_date,
                referral_reward_status,
            },
        });
        res.status(200).json(referral);
    } catch (error) {
        res.status(500).json({ error: 'Referral update failed' });
    }
};

export const deleteReferral = async (req, res) => {
    const { id } = req.query;
    try {
        await prisma.referral.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Referral deletion failed' });
    }
};
