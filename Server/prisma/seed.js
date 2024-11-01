import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync("../utils/database/userData.json", "utf-8"));

  for (const user of data) {
    await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        phone: user.phone,
        name: user.email,
      },
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
