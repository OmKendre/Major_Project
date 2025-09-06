import { Router } from 'express';
import { authenticateToken } from '../middleware/jwt.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';
import { 
  createPermitController, 
  getPendingPermitsController,
  approvePermitController
} from '../controllers/permit.controller.js';

const permitRoutes = Router();

// Route for SSE_MAINTENANCE to create a new permit
permitRoutes.post(
  '/',
  authenticateToken,
  checkRole(['SSE_MAINTENANCE']),
  createPermitController
);

// Route for SSE_SHOP to get pending permits
permitRoutes.get(
  '/pending',
  authenticateToken,
  checkRole(['SSE_SHOP']),
  getPendingPermitsController
);

// Route for SSE_SHOP to approve a permit
permitRoutes.post(
  '/:id/approve',
  authenticateToken,
  checkRole(['SSE_SHOP']),
  approvePermitController
);

export default permitRoutes;