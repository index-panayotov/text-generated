const allowedOrigin = process.env.FRONTEND_URL; // Set this in your environment variables

export const withAuth = (handler) => async (req, res) => {
    const origin = req.headers.origin;

    if (origin !== allowedOrigin) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    return handler(req, res);
};
