import * as fs from "fs";
import * as path from "path";
import * as child_process from "child_process";

const MIGRATIONS_FOLDER = "./migrations";
const UP_FILE_NAME = "up.sql";
const PG_PASSWORD = "1121";

function applyMigrations(): void {
  const folders = getMigrationFolders();
  folders.sort((a, b) => parseInt(a) - parseInt(b));

  for (const folder of folders) {
    const upFilePath = path.join(MIGRATIONS_FOLDER, folder, UP_FILE_NAME);

    if (fs.existsSync(upFilePath)) {
      console.log(`Applying migration ${upFilePath}`);
      executeSqlFile(upFilePath);
    }
  }
}

function getMigrationFolders(): string[] {
  const folders = fs
    .readdirSync(MIGRATIONS_FOLDER, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return folders;
}

function executeSqlFile(filePath: string): void {
  const cmd = `psql -h localhost -d postgres -U postgres -p 5432 -a -q -f ${filePath}`;
  console.log(`Executing command: ${cmd}`);

  const env = Object.assign({}, process.env, {
    PGPASSWORD: PG_PASSWORD,
  });

  try {
    child_process.execSync(cmd, { env: env });
  } catch (err) {
    // @ts-ignore
    console.error(`Error executing SQL file ${filePath}: ${err.message}`);
  }
}

applyMigrations()
