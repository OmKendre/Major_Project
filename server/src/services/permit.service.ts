import { PrismaClient, Specialization } from '@prisma/client';

type PermitData = {
  type: 'ELECTRICAL' | 'WORK_AT_HEIGHT';
  title: string;
  description: string;
  location: string;
  details: any;
};

const prisma = new PrismaClient();

export const createPermitService = async (permitData: PermitData, userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  if (permitData.type === 'ELECTRICAL' && user.specialization !== Specialization.SUBSTATION) {
    throw new Error('Forbidden: User specialization does not allow creating Electrical permits.');
  }
  if (permitData.type === 'WORK_AT_HEIGHT' && user.specialization !== Specialization.MW) {
    throw new Error('Forbidden: User specialization does not allow creating Work at Height permits.');
  }

  if (permitData.type === 'ELECTRICAL') {
    return prisma.electricPermit.create({
      data: {
        unit_name: 'Default Unit',
        equipment_tag_no: 'Default Tag',
        operation_in_charge_name: user.name,
        requirement_emergency: false,
        ...permitData.details,
        createdById: userId,
      },
    });
  } else {
    return prisma.heightPermit.create({
      data: {
        date: new Date(),
        person_responsible: user.name,
        work_location: permitData.location,
        work_description: permitData.description,
        schedule_start: new Date(),
        schedule_end: new Date(),
        fall_type: 'Default Fall Type',
        hazard_environment: 'Default Hazard Env',
        hazard_assessed: true,
        work_can_proceed: true,
        electrical_isolation_obtained: false,
        ...permitData.details,
        staff_1_name: user.name,
        staff_1_tno: "TNO-123",
        staff_1_signature: "Signed",
        staff_1_work: "Initial Work",
        responsible_person_name: user.name,
        responsible_signature: "Signed",
        authorizing_name: "Pending",
        authorizing_signature: "Pending",
        safety_officer_name: "Pending",
        safety_signature: "Pending",
        safety_date: new Date(),
        responsible_date: new Date(),
        authorizing_date: new Date(),
        job_completion_date: new Date(),
        job_completion_time: new Date(),
        completion_signature: "Pending",
        completion_signed_by: "Pending",
        completion_signed_date: new Date(),
        createdById: userId,
      },
    });
  }
};

export const getPendingPermitsService = async () => {
  const pendingElectricPermits = await prisma.electricPermit.findMany({
    where: { status: 'PENDING' },
  });

  const pendingHeightPermits = await prisma.heightPermit.findMany({
    where: { status: 'PENDING' },
  });

  return [...pendingElectricPermits, ...pendingHeightPermits];
};

export const approvePermitService = async (permitId: number, permitType: 'ELECTRICAL' | 'WORK_AT_HEIGHT', approverId: string) => {
  let updatedPermit;

  if (permitType === 'ELECTRICAL') {
    const permit = await prisma.electricPermit.findUnique({
      where: { permit_id: permitId },
    });

    if (!permit || permit.status !== 'PENDING') {
      throw new Error('Permit not found or is not in a pending state.');
    }

    updatedPermit = await prisma.electricPermit.update({
      where: { permit_id: permitId },
      data: {
        status: 'APPROVED',
        approverId: approverId,
      },
    });
  } else {
    const permit = await prisma.heightPermit.findUnique({
      where: { permit_id: permitId },
    });

    if (!permit || permit.status !== 'PENDING') {
      throw new Error('Permit not found or is not in a pending state.');
    }

    updatedPermit = await prisma.heightPermit.update({
      where: { permit_id: permitId },
      data: {
        status: 'APPROVED',
        approverId: approverId,
      },
    });
  }

  return updatedPermit;
};