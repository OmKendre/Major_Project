// file: src/middleware/jwt.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// We are extending the default Request type from Express to include our user payload
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // 1. Get the 'Authorization' header from the incoming request
  const authHeader = req.headers['authorization'];
  
  // 2. The header should be in the format "Bearer TOKEN". We extract the token part.
  const token = authHeader && authHeader.split(' ')[1];

  // 3. If no token is provided, send a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  // 4. Verify the token using our JWT_SECRET
  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    // If the token is invalid (e.g., expired or wrong signature), send a 403 Forbidden error
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // 5. If the token is valid, attach the decoded user payload to the request object
    req.user = user as { userId: string; role: string };
    
    // 6. Call next() to pass control to the next middleware or the route handler
    next();
  });
};