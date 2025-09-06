// file: src/routes/auth.routes.ts
import { Router } from 'express';
import { loginController } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/jwt.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';
const authRoutes = Router();
// Public route for logging in
authRoutes.post('/login', loginController);
// Protected route - only for SSE_MAINTENANCE
authRoutes.get('/profile/sse-maintenance', authenticateToken, checkRole(['SSE_MAINTENANCE']), (req, res) => {
    res.json({
        message: 'Welcome SSE (Maintenance)! This is your protected route.',
        user: req.user,
    });
});
// Protected route - only for SSE_SHOP
authRoutes.get('/profile/sse-shop', authenticateToken, checkRole(['SSE_SHOP']), (req, res) => {
    res.json({
        message: 'Welcome SSE (Shop)! This is your protected route.',
        user: req.user,
    });
});
export default authRoutes;
//# sourceMappingURL=auth.routes.js.map