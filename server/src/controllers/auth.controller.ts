// file: src/controllers/auth.controller.ts

import { Request, Response } from 'express';
import { z } from 'zod';
import { loginUserService } from '../services/auth.service.js';

// Define the shape of the incoming request body using Zod
const LoginSchema = z.object({
  email: z.string().email('A valid email is required'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['SSE_MAINTENANCE', 'SSE_SHOP', 'SAFETY_OFFICER']),
});

export const loginController = async (req: Request, res: Response) => {
  try {
    // 1. Validate the request body against our schema
    const { email, password, role } = LoginSchema.parse(req.body);

    // 2. If validation is successful, call the service with the data
    const loginData = await loginUserService(email, password, role);
    res.status(200).json(loginData);

  } catch (error) {
    // 4. If any error occurs (validation or login logic), send a 401 Unauthorized status
    // We send a generic message to avoid telling attackers whether an email exists or not.
    res.status(401).json({ message: 'Invalid credentials or role' });
  }
};