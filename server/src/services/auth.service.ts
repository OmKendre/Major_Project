// file: src/services/auth.service.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Initialize Prisma Client
const prisma = new PrismaClient();

export const loginUserService = async (email: string, password: string, role: string) => {
  // 1. Find the user by their email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // 2. If no user is found, or their role doesn't match, throw an error
  if (!user || user.role !== role) {
    throw new Error('Invalid credentials or role');
  }

  // 3. Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // 4. If the passwords don't match, throw an error
  if (!isPasswordValid) {
    throw new Error('Invalid credentials or role');
  }

  // 5. If credentials are valid, generate a JWT
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string, // Load the secret from .env
    {
      expiresIn: '8h', // Token will be valid for 8 hours
    }
  );

  // 6. Return the generated token
    return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};