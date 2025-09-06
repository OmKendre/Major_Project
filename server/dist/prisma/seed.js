// file: src/prisma/seed.ts
import { PrismaClient, Role, Specialization } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
    console.log('Seeding database with updated roles...');
    const hashedPassword = bcrypt.hashSync('password123', 10);
    // Create SSE - Maintenance (Mechanical Work)
    await prisma.user.upsert({
        where: { email: 'sse-mw@railway.com' },
        update: {},
        create: {
            email: 'sse-mw@railway.com',
            name: 'SSE Maintenance (MW)',
            password: hashedPassword,
            role: Role.SSE_MAINTENANCE,
            specialization: Specialization.MW,
        },
    });
    // Create SSE - Maintenance (Substation)
    await prisma.user.upsert({
        where: { email: 'sse-substation@railway.com' },
        update: {},
        create: {
            email: 'sse-substation@railway.com',
            name: 'SSE Maintenance (Substation)',
            password: hashedPassword,
            role: Role.SSE_MAINTENANCE,
            specialization: Specialization.SUBSTATION,
        },
    });
    // Create SSE - Shop (Authorizer)
    await prisma.user.upsert({
        where: { email: 'sse-shop@railway.com' },
        update: {},
        create: {
            email: 'sse-shop@railway.com',
            name: 'SSE Shop',
            password: hashedPassword,
            role: Role.SSE_SHOP,
            // No specialization needed for this role
        },
    });
    // Create Safety Officer
    await prisma.user.upsert({
        where: { email: 'safetyofficer@railway.com' },
        update: {},
        create: {
            email: 'safetyofficer@railway.com',
            name: 'Safety Officer',
            password: hashedPassword,
            role: Role.SAFETY_OFFICER,
        },
    });
    console.log('Seeding finished.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map