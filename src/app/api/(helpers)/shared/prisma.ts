import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
    datasources: {
      db: {
        url:
          process.env.NODE_ENV === "development"
            ? process.env.DATABASE_URL
            : process.env.DIRECT_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
