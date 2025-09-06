/*
  Warnings:

  - The values [SUPERVISOR,AUTHORIZER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."Specialization" AS ENUM ('MW', 'SUBSTATION');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Role_new" AS ENUM ('SSE_MAINTENANCE', 'SSE_SHOP', 'SAFETY_OFFICER');
ALTER TABLE "public"."User" ALTER COLUMN "role" TYPE "public"."Role_new" USING ("role"::text::"public"."Role_new");
ALTER TYPE "public"."Role" RENAME TO "Role_old";
ALTER TYPE "public"."Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "specialization" "public"."Specialization";
