import { Response } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest } from '../middleware/jwt.middleware.js';
import { 
  createPermitService, 
  getPendingPermitsService,
  approvePermitService
} from '../services/permit.service.js';

const basePermitSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required'),
});

const electricalPermitSchema = basePermitSchema.extend({
  type: z.literal('ELECTRICAL'),
  details: z.object({
    lockoutTagoutApplied: z.boolean().optional().default(false),
    isPowerOffVerified: z.boolean().optional().default(false),
    elcbUsed: z.boolean().optional().default(false),
  }),
});

const workAtHeightPermitSchema = basePermitSchema.extend({
  type: z.literal('WORK_AT_HEIGHT'),
  details: z.object({
    heightInMeters: z.number().positive(),
    isFallArrestSystemChecked: z.boolean().optional().default(false),
    isScaffoldingInspected: z.boolean().optional().default(false),
    isAreaBarricaded: z.boolean().optional().default(false),
  }),
});

const createPermitSchema = z.discriminatedUnion('type', [
  electricalPermitSchema,
  workAtHeightPermitSchema,
]);

export const createPermitController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const validatedData = createPermitSchema.parse(req.body);
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(403).json({ message: 'Forbidden: User ID not found in token' });
    }
    const newPermit = await createPermitService(validatedData, userId);
    res.status(201).json(newPermit);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input data', errors: error.errors });
    }
    if (error instanceof Error && error.message.startsWith('Forbidden')) {
      return res.status(403).json({ message: error.message });
    }
    console.error('Create Permit Error:', error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const getPendingPermitsController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const pendingPermits = await getPendingPermitsService();
    res.status(200).json(pendingPermits);
  } catch (error) {
    console.error('Get Pending Permits Error:', error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

const approvePermitSchema = z.object({
  permitType: z.enum(['ELECTRICAL', 'WORK_AT_HEIGHT']),
});

export const approvePermitController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const permitId = parseInt(req.params.id, 10);
    if (isNaN(permitId)) {
      return res.status(400).json({ message: 'Invalid permit ID' });
    }

    const { permitType } = approvePermitSchema.parse(req.body);
    const approverId = req.user?.userId;
    if (!approverId) {
      return res.status(403).json({ message: 'Forbidden: User ID not found in token' });
    }

    const updatedPermit = await approvePermitService(permitId, permitType, approverId);
    res.status(200).json(updatedPermit);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input data', errors: error.errors });
    }
    if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};