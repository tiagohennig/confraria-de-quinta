import { Request, Response, NextFunction } from 'express';
import Authenticator from '../services/Authenticator';

declare global {
    namespace Express {
        interface Request {
            userData?: {
                id?: string;
                username: string;
                isAdmin: boolean;
            };
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).send({ success: false, message: 'No token provided' });
            return;
        }

        const token = authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : authHeader;

        const userData = Authenticator.getTokenData(token);

        if (!userData) {
            res.status(401).send({ success: false, message: 'Invalid token' });
            return;
        }

        req.userData = userData;

        next();
    } catch (error: any) {
        res.status(401).send({ success: false, message: error.message || 'Unauthorized' });
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    try {
        if (!req.userData) {
            res.status(401).send({ success: false, message: 'User not authenticated' });
            return;
        }

        if (!req.userData.isAdmin) {
            res.status(403).send({ success: false, message: 'Forbidden: Admin access required' });
            return;
        }

        next();
    } catch (error: any) {
        res.status(403).send({ success: false, message: error.message || 'Forbidden' });
    }
};