/*
  Warnings:

  - You are about to drop the `Approval` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permit` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "electric_permit";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "height_permit";

-- DropForeignKey
ALTER TABLE "public"."Approval" DROP CONSTRAINT "Approval_approverId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Approval" DROP CONSTRAINT "Approval_permitId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Permit" DROP CONSTRAINT "Permit_createdById_fkey";

-- DropTable
DROP TABLE "public"."Approval";

-- DropTable
DROP TABLE "public"."Permit";

-- CreateTable
CREATE TABLE "electric_permit"."permit" (
    "permit_id" SERIAL NOT NULL,
    "unit_name" TEXT NOT NULL,
    "equipment_tag_no" TEXT NOT NULL,
    "operation_in_charge_name" TEXT NOT NULL,
    "operation_in_charge_date" DATE,
    "requirement_emergency" BOOLEAN NOT NULL,
    "equipment_not_in_operation" BOOLEAN,
    "ordinary_permit" BOOLEAN,
    "locks_tags_removed" BOOLEAN,
    "equipment_earthing_intact" BOOLEAN,
    "loto_operation_local_switch" BOOLEAN,
    "clearance_certificate_returned" BOOLEAN,
    "job_completion_certificate_returned" BOOLEAN,
    "energise_requested_by_name" TEXT,
    "energise_requested_by_date" DATE,
    "de_energized_on" DATE,
    "power_fuse_status" TEXT,
    "breaker_control_plug_status" TEXT,
    "breaker_test_ok" BOOLEAN,
    "trip_circuit_healthy" BOOLEAN,
    "breaker_racked_in_service_position" BOOLEAN,
    "control_supply_switched_on" BOOLEAN,
    "space_heater_switched_on" BOOLEAN,
    "breaker_mcc_front_closed" BOOLEAN,
    "mcc_module_switched_on" BOOLEAN,
    "lid_panel_opened" BOOLEAN,
    "line_discharged_test_done" BOOLEAN,
    "temporary_safety_ground" BOOLEAN,
    "breaker_mcc_checked" BOOLEAN,
    "loto_performed_breaker_mcc" BOOLEAN,
    "final_signed_by" TEXT,
    "final_signed_date" DATE,
    "final_signed_time" TIME,
    "final_signed_designation" TEXT,
    "final_signature_image" BYTEA,
    "status" "public"."PermitStatus" NOT NULL DEFAULT 'PENDING',
    "createdById" TEXT NOT NULL,
    "approverId" TEXT,

    CONSTRAINT "permit_pkey" PRIMARY KEY ("permit_id")
);

-- CreateTable
CREATE TABLE "height_permit"."permit" (
    "permit_id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "person_responsible" TEXT NOT NULL,
    "work_location" TEXT NOT NULL,
    "work_description" TEXT NOT NULL,
    "schedule_start" TIMESTAMP(3) NOT NULL,
    "schedule_end" TIMESTAMP(3) NOT NULL,
    "fall_type" TEXT NOT NULL,
    "fall_description" TEXT,
    "fall_tested" TEXT,
    "hazard_environment" TEXT NOT NULL,
    "hazard_assessed" BOOLEAN NOT NULL,
    "work_can_proceed" BOOLEAN NOT NULL,
    "on_crane" BOOLEAN,
    "crane_description" TEXT,
    "ppe_full_harness_checked" BOOLEAN NOT NULL,
    "ppe_shoes_provided" BOOLEAN NOT NULL,
    "ppe_helmet_provided" BOOLEAN NOT NULL,
    "access_fixed_ladder" BOOLEAN,
    "access_elevated_platform" BOOLEAN,
    "access_scissor_lift" BOOLEAN,
    "access_boom_lift" BOOLEAN,
    "access_catwalk" BOOLEAN,
    "access_key_control" TEXT,
    "electrical_isolation_obtained" BOOLEAN NOT NULL,
    "isolation_time_from" TIME,
    "isolation_time_to" TIME,
    "other_isolation_required" BOOLEAN,
    "other_isolation_description" TEXT,
    "staff_1_name" TEXT NOT NULL,
    "staff_1_tno" TEXT NOT NULL,
    "staff_1_signature" TEXT NOT NULL,
    "staff_1_work" TEXT NOT NULL,
    "responsible_person_name" TEXT NOT NULL,
    "responsible_signature" TEXT NOT NULL,
    "authorizing_name" TEXT NOT NULL,
    "authorizing_signature" TEXT NOT NULL,
    "safety_officer_name" TEXT NOT NULL,
    "safety_signature" TEXT NOT NULL,
    "safety_date" DATE NOT NULL,
    "responsible_date" DATE NOT NULL,
    "authorizing_date" DATE NOT NULL,
    "job_completion_date" DATE NOT NULL,
    "job_completion_time" TIME NOT NULL,
    "completion_signature" TEXT NOT NULL,
    "completion_signed_by" TEXT NOT NULL,
    "completion_signed_date" DATE NOT NULL,
    "status" "public"."PermitStatus" NOT NULL DEFAULT 'PENDING',
    "createdById" TEXT NOT NULL,
    "approverId" TEXT,

    CONSTRAINT "permit_pkey" PRIMARY KEY ("permit_id")
);

-- AddForeignKey
ALTER TABLE "electric_permit"."permit" ADD CONSTRAINT "permit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "electric_permit"."permit" ADD CONSTRAINT "permit_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "height_permit"."permit" ADD CONSTRAINT "permit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "height_permit"."permit" ADD CONSTRAINT "permit_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
