const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");

// Basic parser for .env.local to avoid extra dependencies
let dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  try {
    const envPath = path.join(__dirname, "../.env.local");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf8");
      const match = envContent.match(/^DATABASE_URL=(.+)$/m);
      if (match) {
        dbUrl = match[1].trim();
      }
    }
  } catch (e) {
    console.error("Failed to read .env.local", e);
  }
}

if (!dbUrl || dbUrl.includes("xXXXXXXXXXX")) {
  console.error("Please set a valid DATABASE_URL in your .env.local file first!");
  process.exit(1);
}

const sql = neon(dbUrl);

async function init() {
  console.log("Initializing database tables on Neon...");
  try {
    // Create projects table using tagged templates
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        user_name VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'PENDING',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("- 'projects' table verified/created.");

    // Create project_files table using tagged templates
    await sql`
      CREATE TABLE IF NOT EXISTS project_files (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        file_name VARCHAR(255) NOT NULL,
        file_url TEXT NOT NULL,
        file_type VARCHAR(50) NOT NULL,
        uploaded_by VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    // Create service_enquiries table using tagged templates
    await sql`
      CREATE TABLE IF NOT EXISTS service_enquiries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(255),
        user_email VARCHAR(255),
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        course VARCHAR(255) NOT NULL,
        branch VARCHAR(255) NOT NULL,
        university VARCHAR(255),
        project_type VARCHAR(255) NOT NULL,
        deadline VARCHAR(100) NOT NULL,
        topic VARCHAR(255) NOT NULL,
        preferred_tech TEXT,
        deliverables TEXT,
        pages VARCHAR(100),
        budget VARCHAR(100),
        notes TEXT,
        file_url TEXT,
        file_name VARCHAR(255),
        file_size VARCHAR(50),
        status VARCHAR(50) DEFAULT 'PENDING',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("- 'service_enquiries' table verified/created.");

    // Ensure projects table has extra fields
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS course VARCHAR(255);`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS branch VARCHAR(255);`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS university VARCHAR(255);`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_type VARCHAR(255);`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS deadline VARCHAR(100);`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS preferred_tech TEXT;`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS deliverables TEXT;`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS pages VARCHAR(100);`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS budget VARCHAR(100);`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS notes TEXT;`;
    await sql`ALTER TABLE service_enquiries ADD COLUMN IF NOT EXISTS user_id VARCHAR(255);`;
    await sql`ALTER TABLE service_enquiries ADD COLUMN IF NOT EXISTS user_email VARCHAR(255);`;
    console.log("- 'projects' and 'service_enquiries' schemas updated.");

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

init();
