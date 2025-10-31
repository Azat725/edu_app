import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.upsert({
    where: { name: "student" },
    update: {},
    create: { name: "student" },
  });

  const teacherRole = await prisma.role.upsert({
    where: { name: "teacher" },
    update: {},
    create: { name: "teacher" },
  });

  const passwordHash = await bcrypt.hash("1234", 10);

  await prisma.user.upsert({
    where: { email: "teacher1@mail.com" },
    update: {},
    create: {
      email: "teacher1@mail.com",
      fullName: "Преподаватель",
      passwordHash,
      roleId: teacherRole.id,
    },
  });
}

main().finally(() => prisma.$disconnect());