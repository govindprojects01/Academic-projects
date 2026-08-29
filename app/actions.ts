"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";
import { sql } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface Project {
  id: string;
  user_id: string;
  user_email: string;
  user_name: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "DELIVERED";
  created_at: string;
  updated_at: string;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  file_name: string;
  file_url: string;
  file_type: "requirement" | "delivery";
  uploaded_by: string;
  created_at: string;
}

// Upload a File directly from Next.js server to Cloudinary using streaming
async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `academic_projects/${folder}`,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url || "");
        }
      }
    );
    uploadStream.end(buffer);
  });
}

// ACTION: Create new project
export async function createProject(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress || "";
  const userName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || userEmail.split("@")[0];

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !description) {
    throw new Error("Title and Description are required");
  }

  // Insert project row using tagged templates
  const projectResult = await sql`
    INSERT INTO projects (user_id, user_email, user_name, title, description) 
    VALUES (${userId}, ${userEmail}, ${userName}, ${title}, ${description}) 
    RETURNING id
  `;
  
  const projectId = projectResult[0].id;

  // Handle uploaded requirement files
  const files = formData.getAll("files") as File[];
  const validFiles = files.filter((file) => file.name && file.size > 0);

  for (const file of validFiles) {
    try {
      const fileUrl = await uploadToCloudinary(file, "requirements");
      await sql`
        INSERT INTO project_files (project_id, file_name, file_url, file_type, uploaded_by) 
        VALUES (${projectId}, ${file.name}, ${fileUrl}, 'requirement', ${userId})
      `;
    } catch (e) {
      console.error(`Failed to upload file ${file.name} to Cloudinary:`, e);
    }
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

// ACTION: Fetch current user's projects
export async function getProjects(): Promise<Project[]> {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }

  const result = await sql`
    SELECT * FROM projects WHERE user_id = ${userId} ORDER BY created_at DESC
  `;

  return result as Project[];
}

// ACTION: Get project details (accessible by owner or admin)
export async function getProjectDetails(projectId: string): Promise<{
  project: Project | null;
  files: ProjectFile[];
}> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const adminUser = await isAdmin();

  // Fetch project using tagged templates
  const projectResult = await sql`
    SELECT * FROM projects WHERE id = ${projectId}
  `;
  if (projectResult.length === 0) {
    return { project: null, files: [] };
  }

  const project = projectResult[0] as Project;

  // Authorization check: Only allow project owner or admin
  if (project.user_id !== userId && !adminUser) {
    throw new Error("Forbidden");
  }

  // Fetch files
  const filesResult = await sql`
    SELECT * FROM project_files WHERE project_id = ${projectId} ORDER BY created_at ASC
  `;

  return {
    project,
    files: filesResult as ProjectFile[],
  };
}

// ACTION: Fetch all projects for Admin
export async function getAdminProjects(statusFilter?: string): Promise<Project[]> {
  const adminUser = await isAdmin();
  if (!adminUser) {
    throw new Error("Forbidden");
  }

  let result;
  if (statusFilter && statusFilter !== "ALL") {
    result = await sql`
      SELECT * FROM projects WHERE status = ${statusFilter} ORDER BY created_at DESC
    `;
  } else {
    result = await sql`
      SELECT * FROM projects ORDER BY created_at DESC
    `;
  }

  return result as Project[];
}

// ACTION: Update project status (Admin only)
export async function updateProjectStatus(projectId: string, status: string) {
  const adminUser = await isAdmin();
  if (!adminUser) {
    throw new Error("Forbidden");
  }

  await sql`
    UPDATE projects SET status = ${status}, updated_at = CURRENT_TIMESTAMP WHERE id = ${projectId}
  `;

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath("/admin");
  revalidatePath("/dashboard");
}

// ACTION: Upload final delivery files (Admin only)
export async function uploadDeliveryFiles(projectId: string, formData: FormData) {
  const adminUser = await isAdmin();
  if (!adminUser) {
    throw new Error("Forbidden");
  }

  const files = formData.getAll("files") as File[];
  const validFiles = files.filter((file) => file.name && file.size > 0);

  for (const file of validFiles) {
    try {
      const fileUrl = await uploadToCloudinary(file, "deliveries");
      await sql`
        INSERT INTO project_files (project_id, file_name, file_url, file_type, uploaded_by) 
        VALUES (${projectId}, ${file.name}, ${fileUrl}, 'delivery', 'ADMIN')
      `;
    } catch (e) {
      console.error(`Failed to upload delivery file ${file.name} to Cloudinary:`, e);
      throw new Error(`Failed to upload ${file.name}`);
    }
  }

  // Automatically mark status as COMPLETED on first delivery upload if it was not already
  const projectResult = await sql`
    SELECT status FROM projects WHERE id = ${projectId}
  `;
  if (
    projectResult.length > 0 && 
    (projectResult[0].status === "PENDING" || projectResult[0].status === "IN_PROGRESS")
  ) {
    await sql`
      UPDATE projects SET status = 'COMPLETED', updated_at = CURRENT_TIMESTAMP WHERE id = ${projectId}
    `;
  }

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath("/admin");
  revalidatePath("/dashboard");
}
