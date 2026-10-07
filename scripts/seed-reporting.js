import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const generationRecords = [];

  for (let i = 0; i < 30; i++) {
    generationRecords.push({
      activityType: "WORDLE",
      success: true,
    });
  }

  for (let i = 0; i < 40; i++) {
    generationRecords.push({
      activityType: "WORD_SEARCH",
      success: true,
    });
  }

  for (let i = 0; i < 4; i++) {
    generationRecords.push({
      activityType: "WORDLE",
      success: false,
      errorMessage: "Simulated Wordle generation failure",
    });
  }

  for (let i = 0; i < 2; i++) {
    generationRecords.push({
      activityType: "WORD_SEARCH",
      success: false,
      errorMessage: "Simulated Word Search generation failure",
    });
  }

  for (const record of generationRecords) {
    await prisma.generationLog.create({
      data: record,
    });
  }

  const pageVisits = [
    { page: "/wordle", durationMs: 42000 },
    { page: "/wordle", durationMs: 51000 },
    { page: "/wordle", durationMs: 37000 },
    { page: "/wordle", durationMs: 61000 },
    { page: "/wordsearch", durationMs: 48000 },
    { page: "/wordsearch", durationMs: 55000 },
    { page: "/wordsearch", durationMs: 69000 },
    { page: "/wordsearch", durationMs: 44000 },
    { page: "/dashboard", durationMs: 30000 },
    { page: "/manage", durationMs: 58000 },
  ];

  for (const visit of pageVisits) {
    await prisma.pageVisit.create({
      data: visit,
    });
  }

  console.log("Reporting data added successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });