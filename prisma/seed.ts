import { defaultSite, saveSite } from "../lib/cms";
import { prisma } from "../lib/prisma";

async function main() {
  await saveSite(defaultSite());
  console.log("Seeded Sheger Business Group into PostgreSQL.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
