// file: src/middleware/role.middleware.ts
// This is a function that RETURNS a middleware function.
// This allows us to pass in the roles that are allowed to access the route.
export const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        // 1. Check if the user object and role were attached by the previous middleware
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: 'Forbidden: No role specified' });
        }
        const { role } = req.user;
        // 2. Check if the user's role is in the list of allowed roles
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: 'Forbidden: You do not have the required permissions' });
        }
        // 3. If the user's role is allowed, pass control to the next function
        next();
    };
};
//# sourceMappingURL=role.middleware.js.map