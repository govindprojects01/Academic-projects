"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";
import { sql } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "vam0lpcc",
  api_key: process.env.CLOUDINARY_API_KEY || "192338126657561",
  api_secret: process.env.CLOUDINARY_API_SECRET || "KQut2Ut2S50PNI8FnlvryHhqa9c",
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
  course?: string;
  branch?: string;
  university?: string;
  project_type?: string;
  deadline?: string;
  preferred_tech?: string;
  deliverables?: string;
  pages?: string;
  budget?: string;
  notes?: string;
  phone?: string;
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

export interface ServiceEnquiry {
  id: string;
  user_id?: string;
  user_email?: string;
  full_name: string;
  phone: string;
  course: string;
  branch: string;
  university?: string;
  project_type: string;
  deadline: string;
  topic: string;
  preferred_tech?: string;
  deliverables?: string;
  pages?: string;
  budget?: string;
  notes?: string;
  file_url?: string;
  file_name?: string;
  file_size?: string;
  status: "PENDING" | "CONTACTED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
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
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress || "";

  if (!userId && !userEmail) {
    return [];
  }

  let result;
  if (userId && userEmail) {
    result = await sql`
      SELECT * FROM projects WHERE user_id = ${userId} OR (user_email IS NOT NULL AND user_email != '' AND LOWER(user_email) = ${userEmail.toLowerCase()}) ORDER BY created_at DESC
    `;
  } else if (userId) {
    result = await sql`
      SELECT * FROM projects WHERE user_id = ${userId} ORDER BY created_at DESC
    `;
  } else {
    result = await sql`
      SELECT * FROM projects WHERE user_email IS NOT NULL AND user_email != '' AND LOWER(user_email) = ${userEmail.toLowerCase()} ORDER BY created_at DESC
    `;
  }

  return result as Project[];
}

// ACTION: Get project details (accessible by owner or admin)
export async function getProjectDetails(projectId: string): Promise<{
  project: Project | null;
  files: ProjectFile[];
}> {
  const { userId } = await auth();
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress || "";

  if (!userId && !userEmail) {
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
  const isOwner =
    (userId && project.user_id === userId) ||
    (userEmail && project.user_email && project.user_email.toLowerCase() === userEmail.toLowerCase());

  if (!isOwner && !adminUser) {
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

// ACTION: Submit Service Enquiry (Customer Requirement Form)
export async function submitServiceEnquiry(formData: FormData) {
  const { userId } = await auth();
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress || "";
  
  const fullName = (formData.get("name") || formData.get("fullName") || "").toString().trim();
  const phone = (formData.get("phone") || "").toString().trim();
  const course = (formData.get("course") || "").toString().trim();
  const branch = (formData.get("branch") || "").toString().trim();
  const university = (formData.get("university") || "").toString().trim();
  const projectType = (formData.get("projectType") || "").toString().trim();
  const deadline = (formData.get("deadline") || "").toString().trim();
  const topic = (formData.get("topic") || "").toString().trim();
  const pages = (formData.get("pages") || "").toString().trim();
  const budget = (formData.get("budget") || "").toString().trim();
  const notes = (formData.get("notes") || "").toString().trim();

  const userName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || fullName || userEmail.split("@")[0];
  const effectiveUserId = userId || `guest_${phone.replace(/\D/g, "")}`;

  const preferredTechArray = formData.getAll("preferredTech").map((t) => t.toString());
  const preferredTech = preferredTechArray.join(", ");

  const deliverablesArray = formData.getAll("deliverables").map((d) => d.toString());
  const deliverables = deliverablesArray.join(", ");

  if (!fullName || !phone || !course || !branch || !projectType || !topic || !deadline) {
    throw new Error("Please fill in all required fields.");
  }

  // File upload handling (max 50 MB)
  const file = formData.get("file") as File | null;
  let fileUrl = "";
  let fileName = "";
  let fileSizeStr = "";

  if (file && file.name && file.size > 0) {
    const maxBytes = 50 * 1024 * 1024; // 50 MB
    if (file.size > maxBytes) {
      throw new Error("Uploaded file exceeds maximum limit of 50 MB.");
    }
    fileName = file.name;
    fileSizeStr = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

    try {
      fileUrl = await uploadToCloudinary(file, "enquiries");
    } catch (err: any) {
      console.error("Cloudinary upload failed for enquiry attachment:", err);
    }
  }

  // 1. Insert into service_enquiries table
  const result = await sql`
    INSERT INTO service_enquiries (
      user_id, user_email, full_name, phone, course, branch, university, project_type, deadline, topic,
      preferred_tech, deliverables, pages, budget, notes, file_url, file_name, file_size
    ) VALUES (
      ${effectiveUserId}, ${userEmail}, ${fullName}, ${phone}, ${course}, ${branch}, ${university}, ${projectType}, ${deadline}, ${topic},
      ${preferredTech}, ${deliverables}, ${pages}, ${budget}, ${notes}, ${fileUrl}, ${fileName}, ${fileSizeStr}
    )
    RETURNING id
  `;

  const enquiryId = result[0]?.id;

  // 2. Insert matching Project in projects table for Client Dashboard & Admin Projects
  const descriptionText = notes
    ? `${notes}\n\n[Details: ${course} | ${branch} | Tech: ${preferredTech || "Standard"} | Deliverables: ${deliverables || "Standard"}]`
    : `Requirements: ${course} (${branch}) - ${projectType}. Tech: ${preferredTech || "Standard"}. Deliverables: ${deliverables || "Standard"}`;

  const projectResult = await sql`
    INSERT INTO projects (
      user_id, user_email, user_name, title, description,
      course, branch, university, project_type, deadline, preferred_tech, deliverables, pages, budget, notes
    ) VALUES (
      ${effectiveUserId}, ${userEmail}, ${userName}, ${topic}, ${descriptionText},
      ${course}, ${branch}, ${university}, ${projectType}, ${deadline}, ${preferredTech}, ${deliverables}, ${pages}, ${budget}, ${notes}
    )
    RETURNING id
  `;

  const projectId = projectResult[0]?.id;

  if (projectId && fileUrl && fileName) {
    await sql`
      INSERT INTO project_files (project_id, file_name, file_url, file_type, uploaded_by)
      VALUES (${projectId}, ${fileName}, ${fileUrl}, 'requirement', ${effectiveUserId})
    `;
  }

  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/admin");

  // Format WhatsApp message
  const whatsappMsg = `Hello Project Area,

I want to enquire about a ${course} project.

Enquiry ID: ${enquiryId}
Name: ${fullName}
WhatsApp/Mobile: ${phone}
Course: ${course}
Branch: ${branch}
University/College: ${university || "Not specified"}
Project Type: ${projectType}
Project Topic: ${topic}
Required By: ${deadline}
Preferred Tech: ${preferredTech || "Not specified"}
Deliverables: ${deliverables || "Not specified"}
Report Pages: ${pages || "Not specified"}
Budget: ${budget || "Not specified"}
Notes: ${notes || "None"}${fileUrl ? `\nAttachment URL: ${fileUrl}` : ""}`;

  return {
    success: true,
    enquiryId,
    projectId,
    whatsappUrl: `https://wa.me/919559628719?text=${encodeURIComponent(whatsappMsg)}`,
  };
}

// ACTION: Fetch Service Enquiries for Admin
export async function getServiceEnquiries(statusFilter?: string): Promise<ServiceEnquiry[]> {
  const adminUser = await isAdmin();
  if (!adminUser) {
    throw new Error("Forbidden");
  }

  let result;
  if (statusFilter && statusFilter !== "ALL") {
    result = await sql`
      SELECT * FROM service_enquiries WHERE status = ${statusFilter} ORDER BY created_at DESC
    `;
  } else {
    result = await sql`
      SELECT * FROM service_enquiries ORDER BY created_at DESC
    `;
  }

  return result as ServiceEnquiry[];
}

// ACTION: Update Enquiry Status (Admin only)
export async function updateEnquiryStatus(enquiryId: string, status: string) {
  const adminUser = await isAdmin();
  if (!adminUser) {
    throw new Error("Forbidden");
  }

  await sql`
    UPDATE service_enquiries SET status = ${status} WHERE id = ${enquiryId}
  `;

  revalidatePath("/admin");
}

// ACTION: Delete Service Enquiry (Admin only)
export async function deleteServiceEnquiry(enquiryId: string) {
  const adminUser = await isAdmin();
  if (!adminUser) {
    throw new Error("Forbidden");
  }

  await sql`
    DELETE FROM service_enquiries WHERE id = ${enquiryId}
  `;

  revalidatePath("/admin");
}

