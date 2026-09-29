import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seed...");

  console.log("Cleaning existing data...");
  await prisma.user.deleteMany();
  console.log("Users deleted");
  await prisma.tenant.deleteMany();
  console.log("Tenants deleted");

  const passwordHash = await bcrypt.hash("Password123!", 10);

  console.log("Creating tenants and users...");

  await prisma.tenant.create({
    data: {
      name: "Tech Solutions Inc",
      users: {
        create: [
          {
            email: "admin@techsolutions.com",
            name: "Ana Torres",
            password: passwordHash,
            telephone: "+505 8888 0001",
            role: "ADMIN",
          },
          {
            email: "dev@techsolutions.com",
            name: "Luis Pérez",
            password: passwordHash,
            role: "USER",
          },
        ],
      },
    },
  });

  await prisma.tenant.create({
    data: {
      name: "Marketing Pro Agency",
      users: {
        create: [
          {
            email: "admin@marketingpro.com",
            name: "María López",
            password: passwordHash,
            telephone: "+505 8888 0002",
            role: "ADMIN",
          },
          {
            email: "ventas@marketingpro.com",
            name: "Carlos Ruiz",
            password: passwordHash,
            role: "USER",
          },
        ],
      },
    },
  });

  await prisma.tenant.create({
    data: {
      name: "Consulting Experts",
      users: {
        create: [
          {
            email: "admin@consultingexperts.com",
            name: "Sofía Mendoza",
            password: passwordHash,
            role: "ADMIN",
          },
        ],
      },
    },
  });

  console.log("Seed finished: 3 tenants and 5 users created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });