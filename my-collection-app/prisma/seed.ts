import { newsSeed } from "./newsSeed";
import { suggestionsSeed } from "./suggestionsSeed";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.news.deleteMany();
  for (let news of newsSeed) {
    await prisma.news.create({
      data: news,
    });
  }
  await prisma.suggestions.deleteMany();
  for (let suggestion of suggestionsSeed) {
    await prisma.suggestions.create({
      data: suggestion,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });