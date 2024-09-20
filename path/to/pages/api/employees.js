import { getEmployees, createEmployee } from '../../../controllers/employeesController';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return getEmployees(req, res);
    } else if (req.method === 'POST') {
        return createEmployee(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
