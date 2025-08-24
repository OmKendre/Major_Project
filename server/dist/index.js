// file: src/index.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import permitRoutes from './routes/permit.routes.js';
const app = express();
const PORT = process.env.PORT || 3001;
// Configure CORS to read the allowed origin from your .env file
const corsOptions = {
    origin: process.env.FRONTEND_ORIGIN,
};
app.use(cors(corsOptions)); // Use the configured options
app.use(express.json());
// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/permits', permitRoutes);
// A simple status route to check if the API is running
app.get('/api', (req, res) => {
    res.json({ status: 'API is running successfully' });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map