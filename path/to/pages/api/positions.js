import { getPositions, createPosition } from '../../../controllers/positionsController';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return getPositions(req, res);
    } else if (req.method === 'POST') {
        return createPosition(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
