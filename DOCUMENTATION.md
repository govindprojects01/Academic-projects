# 📚 Project Area — Complete Technical & Operational Documentation

Welcome to the official documentation for **Project Area** (operating as **Baba Thesis and Printing**), a full-stack Next.js web application built to provide academic project assistance, thesis printing, hard binding, and digital online services to students near BHU Gate, Varanasi, and online across India.

---

## 📑 Table of Contents

1. [Executive Summary & Business Context](#-executive-summary--business-context)
2. [Key Contact & Business Information](#-key-contact--business-information)
3. [Technology Stack](#-technology-stack)
4. [System Architecture & Folder Structure](#-system-architecture--folder-structure)
5. [Database Schema & Data Models](#-database-schema--data-models)
6. [Authentication & Authorization](#-authentication--authorization)
7. [Core Features & Pages](#-core-features--pages)
8. [Backend Server Actions Reference](#-backend-server-actions-reference)
9. [File Upload Pipeline (Cloudinary Integration)](#-file-upload-pipeline-cloudinary-integration)
10. [Environment Variables & Configuration](#-environment-variables--configuration)
11. [Setup, Installation & Commands](#-setup-installation--commands)

---

## 🎯 Executive Summary & Business Context

**Project Area** offers complete, end-to-end academic solutions for students pursuing diploma, undergraduate, and postgraduate degrees (MBA, B.Tech, MCA, M.Sc, M.Tech, etc.). The platform enables students to:
- Browse academic project categories and review live sample project report structures.
- Submit custom project requirements along with attachment files up to **10 MB**.
- Track submitted project progress, status updates, and download final project deliverables via a dedicated Client Dashboard.
- Access online utility portals (Aadhaar UIDAI, Parivahan, ECI Voter ID, EPFO, DigiLocker, A to Z Suvidha).

Additionally, business administrators can access an **Admin Portal** to manage incoming student enquiries, update project statuses, upload final project deliverable files, and communicate directly with students via WhatsApp or Phone.

---

## 📞 Key Contact & Business Information

- **Brand Name**: Project Area / Baba Thesis and Printing
- **Physical Address**: Lanka, Near BHU Gate, Varanasi, Uttar Pradesh, India
- **Primary Phone**: `+91 9559628719`
- **Secondary Phone**: `+91 8881470477`
- **WhatsApp Support**: `+91 9559628719`
- **Email**: `govindsharmabr45@gmail.com`
- **Google Form Integration**: `https://forms.gle/Hfm24hrm4uZ9M64V9`

---

## 🛠 Technology Stack

### Frontend & Framework
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) with React 19.
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with PostCSS & Autoprefixer.
- **UI Components & Icons**: [Lucide React](https://lucide.dev/) icon set.
- **TypeScript**: Full static typing across components, server actions, and models.

### Backend & Infrastructure
- **Server Actions**: Native Next.js 15 Server Actions (`"use server"`).
- **Authentication**: [Clerk Next.js SDK](https://clerk.com/) (`@clerk/nextjs`).
- **Database**: PostgreSQL on [Neon Serverless PostgreSQL](https://neon.tech/) (`@neondatabase/serverless`).
- **Cloud File Storage**: [Cloudinary SDK](https://cloudinary.com/) (`cloudinary`) for streaming uploads up to 50 MB.

---

## 📂 System Architecture & Folder Structure

```
d:/website/Academic-projects/Academic-projects/
├── app/                                    # Next.js App Router root
│   ├── about/
│   │   └── page.tsx                        # About Us Page
│   ├── admin/
│   │   ├── page.tsx                        # Admin Portal (Enquiries & User Projects)
│   │   └── projects/
│   │       └── [id]/
│   │           ├── AdminProjectClient.tsx   # Admin Project Manager Client Component
│   │           └── page.tsx                # Admin Project Manager Server Page
│   ├── contact/
│   │   └── page.tsx                        # Contact Page
│   ├── dashboard/
│   │   ├── page.tsx                        # Client Dashboard Overview
│   │   ├── new/
│   │   │   ├── NewProjectForm.tsx          # New Project Request Client Form
│   │   │   └── page.tsx                    # Submit Request Page
│   │   └── projects/
│   │       └── [id]/
│   │           └── page.tsx                # Client Project Details & File Download View
│   ├── online-form/
│   │   └── page.tsx                        # Online Government & Digital Services Directory
│   ├── services/
│   │   └── page.tsx                        # Services Catalogue & Requirement Workspace Page
│   ├── actions.ts                          # Centralized Next.js Server Actions
│   ├── globals.css                        # Global CSS & Tailwind Setup
│   ├── layout.tsx                         # Root Layout with Clerk Provider
│   ├── page.tsx                            # Main Landing / Home Page
│   └── sitemap.ts                          # Dynamic Sitemap Generator
├── components/                             # React Components
│   ├── AdminEnquiriesTable.tsx            # Interactive Admin Enquiries Table (Search & Filters)
│   ├── AuthButtons.tsx                    # Clerk Sign In / User Button Controls
│   ├── ButtonLink.tsx                     # Reusable Button / Link Wrapper
│   ├── EnquiryForm.tsx                    # Quick Contact & Enquiry Form
│   ├── FloatingActions.tsx                # Sticky Call & WhatsApp Buttons
│   ├── Footer.tsx                         # Page Footer Component
│   ├── Navbar.tsx                         # Responsive Navigation Header
│   ├── PageShell.tsx                      # Layout Shell Wrapper (Navbar + Footer)
│   ├── SectionHeading.tsx                 # Standardized Section Title & Eyebrow Component
│   ├── ServiceGrid.tsx                    # Interactive Grid of 12 Academic Services
│   └── ServiceRequirementWorkspace.tsx    # Split-view Demo Viewer + 50MB Requirement Form
├── lib/                                    # Shared Utilities & Business Data
│   ├── admin.ts                           # Admin Role Verification (Email Check)
│   ├── db.ts                              # Neon Serverless Database Client
│   └── site.ts                            # Site Metadata, Services Catalogue & Contacts
├── public/                                 # Static Asset Files (Images, Verification Meta)
├── scripts/
│   └── init-db.js                         # Database Migration & Schema Creation Script
├── proxy.ts                              # Clerk Auth Route Protection Middleware
├── next.config.ts                         # Next.js Configuration
├── tailwind.config.ts                     # Tailwind Design System Theme Config
├── tsconfig.json                          # TypeScript Compiler Settings
└── package.json                           # Dependencies & NPM Scripts
```

---

## 🗄 Database Schema & Data Models

The PostgreSQL database (hosted on Neon) comprises three primary tables:

### 1. `projects` Table
Stores registered client project requests and requirement specifications.
```sql
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING',
  course VARCHAR(255),
  branch VARCHAR(255),
  university VARCHAR(255),
  project_type VARCHAR(255),
  deadline VARCHAR(100),
  preferred_tech TEXT,
  deliverables TEXT,
  pages VARCHAR(100),
  budget VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2. `project_files` Table
Stores file attachment metadata (requirement files uploaded by clients and deliverable files uploaded by admins).
```sql
CREATE TABLE IF NOT EXISTS project_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(50) NOT NULL, -- 'requirement' | 'delivery'
  uploaded_by VARCHAR(255) NOT NULL, -- User ID or 'ADMIN'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3. `service_enquiries` Table
Stores enquiries submitted through the requirement workspace (from logged-in users or guest visitors).
```sql
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
  status VARCHAR(50) DEFAULT 'PENDING', -- PENDING | CONTACTED | IN_PROGRESS | COMPLETED | CANCELLED
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Authentication & Authorization

- **Client Authentication**: Implemented using Clerk (`@clerk/nextjs`). `ClerkProvider` wraps the application in `app/layout.tsx`.
- **Middleware**: `proxy.ts` runs `clerkMiddleware()` across all non-static routes.
- **Admin Authorization**: Defined in `lib/admin.ts`. Checks the currently authenticated user's primary email against the comma-separated `ADMIN_EMAILS` environment variable.
  ```typescript
  export async function isAdmin(): Promise<boolean>
  ```
- **Access Control**: Non-admin users attempting to access `/admin` or execute admin-only server actions are redirected or blocked with a `Forbidden` error.

---

## 💻 Core Features & Pages

### 1. Home Page (`/`)
- Hero section with background imagery, brand identity (*Baba Thesis and Printing / Project Area*), and quick actions.
- Company statistics (15+ Years Experience, 500+ Online Students, 10,000+ Offline Students).
- Highlighting key service guarantees: *Expert Guidance*, *On-Time Delivery*, and *Trusted Support*.
- Dedicated Printing Services Showcase (Black & White, Color, Hard Binding, Gold Printing, Spiral Binding).
- Interactive Academic Services Grid (12 course options).
- **Service Requirement Workspace**: Interactive split-view container featuring a sample report zoomable preview on the left and a requirement form supporting up to **50 MB file attachments** on the right.

### 2. Services Page (`/services`)
- Full grid display of all academic service categories.
- Direct selection of service types which pre-fills the requirement form.
- Full requirement submission workspace with instant WhatsApp notification redirect.

### 3. Online Form Services (`/online-form`)
- Portal providing quick access to government and utility services:
  - **A to Z Suvidha** (Cyber work partner portal)
  - **UIDAI Aadhaar** (Update & verification)
  - **Parivahan** (Transport services)
  - **Election Commission of India** (Voter ID & election services)
  - **EPFO India** (Provident fund & UAN)
  - **DigiLocker** (Digital marksheets & identity documents)

### 4. Client Dashboard (`/dashboard`)
- Displays all project requests submitted by the logged-in user.
- Status badges: `PENDING`, `IN_PROGRESS`, `COMPLETED`, `DELIVERED`.
- Detailed project request page (`/dashboard/projects/[id]`): Displays submitted specifications, attached requirement files, and final project deliverables uploaded by the admin team.

### 5. Admin Portal (`/admin`)
- Accessible only to authorized administrators (via email whitelist).
- **Tab 1 — Service Enquiries**: Interactive table of incoming requirement form submissions. Features instant keyword search (by name, phone, course, topic, or university), status dropdown filter, inline status update, direct phone call link, direct WhatsApp chat generator, and attached file download links.
- **Tab 2 — User Projects**: Overview of registered client projects.
- **Project Detail Manager (`/admin/projects/[id]`)**: Allows admins to modify project status and stream upload final project delivery files (which auto-completes project status).

---

## ⚡ Backend Server Actions Reference

All server actions are contained in `app/actions.ts`:

| Function Name | Access | Purpose |
| :--- | :--- | :--- |
| `submitServiceEnquiry(formData)` | Public / Auth | Submits requirement form, streams attached file to Cloudinary (up to 50MB), creates `service_enquiries` entry, mirrors into `projects`, and returns a WhatsApp link. |
| `createProject(formData)` | Authenticated | Creates a new user project entry and uploads requirement files. |
| `getProjects()` | Authenticated | Fetches all projects owned by the currently logged-in user. |
| `getProjectDetails(projectId)` | Owner / Admin | Retrieves single project details and associated files with authorization validation. |
| `getAdminProjects(statusFilter?)` | Admin Only | Retrieves all client projects across the platform with optional status filtering. |
| `updateProjectStatus(projectId, status)` | Admin Only | Updates a project's status in the database. |
| `uploadDeliveryFiles(projectId, formData)` | Admin Only | Streams final delivery files to Cloudinary, adds entries to `project_files`, and auto-sets status to `COMPLETED`. |
| `getServiceEnquiries(statusFilter?)` | Admin Only | Retrieves all service requirement enquiries. |
| `updateEnquiryStatus(enquiryId, status)`| Admin Only | Updates status of a service enquiry. |
| `deleteServiceEnquiry(enquiryId)` | Admin Only | Deletes a service enquiry entry from the database. |

---

## ☁️ File Upload Pipeline (Cloudinary Integration)

File uploads are handled seamlessly on the server using Node.js buffers and Cloudinary's `upload_stream`:

1. Client sends binary form data to `submitServiceEnquiry` or `uploadDeliveryFiles`.
2. File size is checked against the 50 MB limit (`50 * 1024 * 1024` bytes).
3. The server converts the file array buffer into a Node Buffer:
   ```typescript
   const bytes = await file.arrayBuffer();
   const buffer = Buffer.from(bytes);
   ```
4. Streams the buffer to Cloudinary under folder `academic_projects/requirements`, `academic_projects/enquiries`, or `academic_projects/deliveries`.
5. Secure URL is returned and recorded in PostgreSQL.

---

## 🔑 Environment Variables & Configuration

Create a `.env.local` file in `d:/website/Academic-projects/Academic-projects/`:

```env
# Database Connection (Neon PostgreSQL)
DATABASE_URL=postgresql://neondb_owner:npg_XXXXX@ep-XXX.us-east-2.aws.neon.tech/neondb?sslmode=require

# Admin Email Whitelist (Comma-separated)
ADMIN_EMAILS=govindsharmabr45@gmail.com,admin@example.com

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXX
CLERK_SECRET_KEY=sk_test_XXXXX

# Cloudinary Storage Configuration
CLOUDINARY_CLOUD_NAME=vam0lpcc
CLOUDINARY_API_KEY=192338126657561
CLOUDINARY_API_SECRET=KQut2Ut2S50PNI8FnlvryHhqa9c
```

---

## 🚀 Setup, Installation & Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database Tables
Run the database setup script to verify and create PostgreSQL tables:
```bash
node scripts/init-db.js
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---
*Documentation maintained for **Project Area / Baba Thesis and Printing** (2026).*
