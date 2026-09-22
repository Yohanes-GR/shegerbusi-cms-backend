import EmbeddedPostgres from "embedded-postgres";
import path from "path";

async function main() {
  const pg = new EmbeddedPostgres({
    databaseDir: path.join(process.cwd(), ".data", "postgres"),
    user: "postgres",
    password: "sheger",
    port: 5432,
    persistent: true,
  });

  try {
    await pg.initialise();
  } catch {
    // cluster already exists
  }

  await pg.start();

  try {
    await pg.createDatabase("sheger_business");
    console.log("Created database sheger_business");
  } catch {
    console.log("Database sheger_business already exists");
  }

  console.log("PostgreSQL is running at postgresql://postgres:sheger@localhost:5432/sheger_business");
  console.log("Keep this terminal open while you use the site.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
