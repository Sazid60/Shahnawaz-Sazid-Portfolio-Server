# SHAHNAWAZ-SAZID-PORTFOLIO SERVER

### Backend for My Portfolio Website

This is the backend for the Portfolio Project a full-stack personal portfolio application. It powers the dynamic sections of the portfolio website including blogs, projects, academic info, skills, and experience. Built with Typescript, Node.js, Express, Prisma, and PostgreSQL.

The backend handles authentication, file uploads, email notifications, and provides secure RESTful APIs for the frontend built with Next.js.

## Features

#### Authentication

- Secure authentication for the portfolio owner.
- Passwords hashed using bcrypt.
- Includes a seed admin script for creating the initial admin user.

#### Dashboard Management

- Manage blogs, projects, resumes, and skills via protected admin routes.
- CRUD operations for all content modules.

#### Blog System

- Create, Read, Update, Delete (CRUD) operations.
- Public API for reading blogs.
- Supports rich text and cover image upload.

#### Projects Showcase

- Manage project entries including title, description, tech stacks, and links.
- Publicly accessible routes for project listing.

#### Resume

- Upload and update resume.

#### Academics

- CRUD operation for Academics
- Public API for getting all academics info

#### Skills

- CRUD operation for Skills
- Public API for getting all Skills

#### Experiences

- CRUD operation for Experiences
- Public API for getting all experiences

#### Contact Form Integration

- Handles contact form submissions.
- Sends automated confirmation emails to both user and site owner using Nodemailer and EJS templates.

#### Cloud Integration

- Uses Cloudinary for media storage.
- File uploads handled with Multer.

#### Tech Stacks

| Category                   | Technology                 |
| -------------------------- | -------------------------- |
| **Language**               | TypeScript                 |
| **Runtime**                | Node.js                    |
| **Framework**              | Express.js                 |
| **Database ORM**           | Prisma                     |
| **Database**               | PostgreSQL (NeonDB hosted) |
| **Authentication**         | bcryptjs                   |
| **File Storage**           | Cloudinary                 |
| **Templating Engine**      | EJS (for email templates)  |
| **Email Service**          | Nodemailer                 |
| **Environment Management** | dotenv                     |
| **Validation & Utilities** | Multer, Compression, CORS  |

### Project Structure

```
├─ .gitignore
├─ .vscode
│  └─ settings.json
├─ Readme.md
├─ dist
│  ├─ app.js
│  ├─ config
│  │  ├─ cloudinary.config.js
│  │  ├─ db.js
│  │  └─ multer.config.js
│  ├─ modules
│  │  ├─ academics
│  │  │  ├─ academic.controller.js
│  │  │  ├─ academic.service.js
│  │  │  └─ academics.route.js
│  │  ├─ auth
│  │  │  ├─ auth.controller.js
│  │  │  ├─ auth.route.js
│  │  │  └─ auth.service.js
│  │  ├─ blog
│  │  │  ├─ blog.controller.js
│  │  │  ├─ blog.route.js
│  │  │  └─ blog.service.js
│  │  ├─ contact
│  │  │  ├─ contact.controller.js
│  │  │  └─ contact.route.js
│  │  ├─ experience
│  │  │  ├─ experience.controller.js
│  │  │  ├─ experience.route.js
│  │  │  └─ experience.service.js
│  │  ├─ project
│  │  │  ├─ project.controller.js
│  │  │  ├─ project.route.js
│  │  │  └─ project.service.js
│  │  ├─ resume
│  │  │  ├─ resume.controller.js
│  │  │  ├─ resume.route.js
│  │  │  └─ resume.service.js
│  │  ├─ skills
│  │  │  ├─ skill.controller.js
│  │  │  ├─ skill.route.js
│  │  │  └─ skill.service.js
│  │  └─ user
│  │     ├─ user.controller.js
│  │     ├─ user.route.js
│  │     └─ user.service.js
│  ├─ server.js
│  └─ utils
│     ├─ seedAdmin.js
│     ├─ sendEmail.js
│     └─ templates
│        ├─ contact-owner.ejs
│        └─ contact-user.ejs
├─ eslint.config.mjs
├─ package-lock.json
├─ package.json
├─ prisma
│  ├─ migrations
│  │  ├─ 20251005220034_reshap
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ src
│  ├─ app.ts
│  ├─ config
│  │  ├─ cloudinary.config.ts
│  │  ├─ db.ts
│  │  └─ multer.config.ts
│  ├─ modules
│  │  ├─ academics
│  │  │  ├─ academic.controller.ts
│  │  │  ├─ academic.service.ts
│  │  │  └─ academics.route.ts
│  │  ├─ auth
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.route.ts
│  │  │  └─ auth.service.ts
│  │  ├─ blog
│  │  │  ├─ blog.controller.ts
│  │  │  ├─ blog.route.ts
│  │  │  └─ blog.service.ts
│  │  ├─ contact
│  │  │  ├─ contact.controller.ts
│  │  │  └─ contact.route.ts
│  │  ├─ experience
│  │  │  ├─ experience.controller.ts
│  │  │  ├─ experience.route.ts
│  │  │  └─ experience.service.ts
│  │  ├─ project
│  │  │  ├─ project.controller.ts
│  │  │  ├─ project.route.ts
│  │  │  └─ project.service.ts
│  │  ├─ resume
│  │  │  ├─ resume.controller.ts
│  │  │  ├─ resume.route.ts
│  │  │  └─ resume.service.ts
│  │  ├─ skills
│  │  │  ├─ skill.controller.ts
│  │  │  ├─ skill.route.ts
│  │  │  └─ skill.service.ts
│  │  └─ user
│  │     ├─ user.controller.ts
│  │     ├─ user.route.ts
│  │     └─ user.service.ts
│  ├─ server.ts
│  └─ utils
│     ├─ seedAdmin.ts
│     ├─ sendEmail.ts
│     └─ templates
│        ├─ contact-owner.ejs
│        └─ contact-user.ejs
├─ tsconfig.json
└─ vercel.json
```

### Installation Steps

#### Clone the repository

```bash
git clone https://github.com/Sazid60/Shahnawaz-Sazid-Portfolio-Server

#  Move into the directory
cd shahnawaz-sazid-portfolio-server

```

#### Set The .env file

```bash
PORT=
NODE_ENV=
DATABASE_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
ADMIN_PASSWORD=
ADMIN_EMAIL=
```

#### Install dependencies

```bash
npm install
```

#### Setup Prisma

```bash
npx prisma generate
npx prisma migrate deploy

```

#### Start development server

```bash
npm run dev
```
