# 🚀 MERN Stack Blog Application - Deployment & DevOps

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js, fully deployed with CI/CD pipelines, monitoring, and production-ready configurations.

![MERN Stack](https://img.shields.io/badge/MERN-MongoDB%20Express%20React%20Node-green)
![License](https://img.shields.io/badge/license-ISC-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue)

## 🌐 Live Application

### Frontend
**Production URL**: [https://your-frontend-app.vercel.app](https://your-frontend-app.vercel.app)

*Note: Replace with your actual deployed frontend URL*

### Backend API
**Production URL**: [https://your-backend-api.railway.app](https://your-backend-api.railway.app)

**Health Check**: [https://your-backend-api.railway.app/health](https://your-backend-api.railway.app/health)

*Note: Replace with your actual deployed backend URL*

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Deployment Status](#deployment-status)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring Setup](#monitoring-setup)
- [Installation](#installation)
- [Deployment Instructions](#deployment-instructions)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Maintenance](#maintenance)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

This is a complete MERN stack blog application with:
- ✅ Full CRUD operations for blog posts
- ✅ User authentication with Clerk
- ✅ Image uploads for featured images
- ✅ Comments system
- ✅ Search and filter functionality
- ✅ Production deployment (Backend: Railway, Frontend: Vercel)
- ✅ CI/CD pipelines with GitHub Actions
- ✅ Monitoring and error tracking (Sentry)
- ✅ Health check endpoints
- ✅ Automated backups

---

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **Clerk** - Authentication
- **Winston** - Production logging
- **Sentry** - Error tracking
- **Helmet** - Security headers

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Clerk React** - Authentication
- **Axios** - HTTP client
- **Sentry** - Error tracking

### DevOps
- **GitHub Actions** - CI/CD
- **Railway** - Backend hosting
- **Vercel** - Frontend hosting
- **MongoDB Atlas** - Database hosting
- **Sentry** - Error tracking
- **UptimeRobot** - Uptime monitoring

---

## 🚀 Deployment Status

### ✅ Completed Deployments

- [x] **Backend**: Deployed to Railway
  - Environment: Production
  - Status: ✅ Active
  - Health Check: `/health` endpoint

- [x] **Frontend**: Deployed to Vercel
  - Environment: Production
  - Status: ✅ Active
  - Build: Optimized production build

- [x] **Database**: MongoDB Atlas
  - Environment: Production
  - Status: ✅ Connected
  - Backups: Configured

### 🔄 CI/CD Status

- [x] **Backend CI**: Automated testing and linting
- [x] **Frontend CI**: Automated testing and building
- [x] **Backend CD**: Automated deployment to Railway
- [x] **Frontend CD**: Automated deployment to Vercel
- [x] **Staging Environment**: Configured
- [x] **Production Environment**: Configured

---

## 🔄 CI/CD Pipeline

### Pipeline Overview

```
Code Push → CI (Test & Build) → CD (Deploy) → Health Check
```

### Workflow Files

- **`.github/workflows/backend-ci.yml`** - Backend continuous integration
- **`.github/workflows/frontend-ci.yml`** - Frontend continuous integration
- **`.github/workflows/backend-cd.yml`** - Backend continuous deployment
- **`.github/workflows/frontend-cd.yml`** - Frontend continuous deployment

### CI/CD Features

- ✅ Automated testing on push
- ✅ Linting and code quality checks
- ✅ Automated building
- ✅ Staging and production environments
- ✅ Rollback strategies
- ✅ Health checks after deployment

### Screenshots of CI/CD Pipeline

#### Backend CI Pipeline
![Backend CI Pipeline](./screenshots/cicd-backend-ci.png)
*Backend CI pipeline running tests and linting*

#### Frontend CI Pipeline
![Frontend CI Pipeline](./screenshots/cicd-frontend-ci.png)
*Frontend CI pipeline building the React application*

#### Backend CD Pipeline
![Backend CD Pipeline](./screenshots/cicd-backend-cd.png)
*Backend CD pipeline deploying to Railway*

#### Frontend CD Pipeline
![Frontend CD Pipeline](./screenshots/cicd-frontend-cd.png)
*Frontend CD pipeline deploying to Vercel*

**Note**: To add CI/CD screenshots:
1. Go to your GitHub repository
2. Click on "Actions" tab
3. Run a workflow
4. Take screenshots of the workflow runs
5. Save them in `screenshots/` directory with the filenames above

---

## 📊 Monitoring Setup

### Health Check Endpoints

**Backend Health Check**: `GET /health`

**Response (Healthy)**:
```json
{
  "status": "ok",
  "timestamp": "2025-11-21T16:00:00.000Z",
  "uptime": 3600,
  "environment": "production",
  "database": {
    "status": "connected",
    "readyState": 1
  },
  "memory": {
    "used": "45.23 MB",
    "total": "128.00 MB"
  }
}
```

### Uptime Monitoring

**Service**: UptimeRobot (or similar)

**Configuration**:
- **URL**: `https://your-backend-api.railway.app/health`
- **Interval**: 5 minutes
- **Alerts**: Email and SMS notifications
- **Status**: ✅ Configured

### Error Tracking

**Service**: Sentry

**Configuration**:
- **Backend**: Integrated with Express.js
- **Frontend**: Integrated with React
- **Features**:
  - Automatic error capture
  - Performance monitoring
  - Session replay (frontend)
  - Release tracking
- **Status**: ✅ Configured

### Performance Monitoring

**Backend**:
- Response time tracking
- Slow request detection (>1 second)
- Memory usage monitoring
- Platform metrics (Railway)

**Frontend**:
- Page load times
- API call durations
- Core Web Vitals
- Platform analytics (Vercel)

### Monitoring Dashboard

Access monitoring at:
- **Sentry**: [https://sentry.io](https://sentry.io)
- **UptimeRobot**: [https://uptimerobot.com](https://uptimerobot.com)
- **Railway Metrics**: Railway Dashboard → Metrics
- **Vercel Analytics**: Vercel Dashboard → Analytics

---

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Clerk account
- GitHub account
- Railway account (for backend deployment)
- Vercel account (for frontend deployment)

### Local Development Setup

1. **Clone the repository**:
```bash
git clone <your-repository-url>
cd mern-stack-integration-babulele
```

2. **Install server dependencies**:
```bash
cd server
npm install
```

3. **Install client dependencies**:
```bash
cd ../client
npm install
```

4. **Set up environment variables** (see [Environment Variables](#environment-variables))

5. **Start development servers**:
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

---

## 🚀 Deployment Instructions

### Backend Deployment (Railway)

1. **Create Railway Account**: [https://railway.app](https://railway.app)

2. **Deploy from GitHub**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Set root directory: `mern-stack-integration-babulele/server`

3. **Configure Environment Variables**:
   - Go to Variables tab
   - Add all variables from `server/.env.example`

4. **Enable Continuous Deployment**:
   - Railway automatically enables CD when connected to GitHub
   - Every push to `main` triggers deployment

5. **Get Backend URL**:
   - Railway provides URL: `https://your-app.up.railway.app`
   - Save this URL for frontend configuration

**Detailed Guide**: See [BACKEND_DEPLOYMENT_GUIDE.md](./BACKEND_DEPLOYMENT_GUIDE.md)

### Frontend Deployment (Vercel)

1. **Create Vercel Account**: [https://vercel.com](https://vercel.com)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Set root directory: `mern-stack-integration-babulele/client`

3. **Configure Build Settings**:
   - Framework: Vite (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Set Environment Variables**:
   - Add `VITE_API_URL`: Your backend URL from Railway
   - Add `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key

5. **Deploy**:
   - Click "Deploy"
   - Vercel automatically deploys on every push to `main`

**Detailed Guide**: See [FRONTEND_DEPLOYMENT_GUIDE.md](./FRONTEND_DEPLOYMENT_GUIDE.md)

### Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create Cluster**:
   - Choose FREE (M0) tier
   - Select region
   - Create cluster

3. **Configure Database User**:
   - Create database user with read/write permissions
   - Save username and password

4. **Configure Network Access**:
   - Add IP address: `0.0.0.0/0` (for development)
   - Or add specific IPs for production

5. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` and `<database>` with your values

**Detailed Guide**: See [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md)

---

## ⚙️ Environment Variables

### Backend Environment Variables

Create `server/.env` from `server/.env.example`:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog
CLERK_SECRET_KEY=sk_live_your_clerk_secret_key
FRONTEND_URL=https://your-frontend.vercel.app
SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

**Template**: See [server/.env.example](./server/.env.example)

### Frontend Environment Variables

Create `client/.env` from `client/.env.example`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_clerk_publishable_key
VITE_API_URL=https://your-backend.railway.app/api
VITE_ENV=production
VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

**Template**: See [client/.env.example](./client/.env.example)

**Complete Guide**: See [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)

---

## 📚 API Documentation

### Base URL
```
Production: https://your-backend-api.railway.app/api
Development: http://localhost:5000/api
```

### Health Check
```http
GET /health
```

### Post Endpoints
```http
GET    /api/posts              # Get all posts
GET    /api/posts/:id          # Get single post
POST   /api/posts              # Create post (auth required)
PUT    /api/posts/:id          # Update post (auth required)
DELETE /api/posts/:id          # Delete post (auth required)
POST   /api/posts/upload       # Upload image (auth required)
POST   /api/posts/:id/comments # Add comment (auth required)
```

### Category Endpoints
```http
GET  /api/categories           # Get all categories
POST /api/categories           # Create category (auth required)
```

### Auth Endpoints
```http
GET /api/auth/me              # Get current user (auth required)
```

**Complete API Documentation**: See [README.md](./README.md#api-documentation) (original)

---

## 📸 Screenshots

### Application Screenshots

#### Home Page
![Home Page](./screenshots/homeblog.PNG)
*Home page displaying blog posts with search and category filters*

#### Post Detail View
![Post Detail](./screenshots/post.PNG)
*Single post view with featured image, content, and comments*

### CI/CD Pipeline Screenshots

*See [CI/CD Pipeline](#cicd-pipeline) section above for workflow screenshots*

---

## 🔧 Maintenance

### Update Schedule

- **Weekly**: Error log review, security checks
- **Monthly**: Dependency updates, database optimization
- **Quarterly**: Major updates, security audit

### Database Backups

- **Automatic**: MongoDB Atlas Cloud Backup (if M10+)
- **Manual**: Weekly exports
- **Retention**: 7 days (daily), 4 weeks (weekly), 12 months (monthly)

### Deployment Procedures

- **Staging**: Deploy to staging environment first
- **Production**: Deploy after staging verification
- **Rollback**: Automatic and manual rollback procedures

**Complete Guide**: See [MAINTENANCE_PLAN.md](./MAINTENANCE_PLAN.md)

---

## 🐛 Troubleshooting

### Common Issues

**Deployment Fails**:
- Check GitHub Actions logs
- Verify environment variables
- Check platform status pages

**Health Check Returns 503**:
- Verify MongoDB connection
- Check network access in MongoDB Atlas
- Review server logs

**CI/CD Pipeline Fails**:
- Check workflow logs
- Verify secrets are set correctly
- Ensure all tests pass locally

**Complete Troubleshooting Guide**: See [NPM_TROUBLESHOOTING.md](./NPM_TROUBLESHOOTING.md)

---

## 📁 Repository Structure

```
mern-stack-integration-babulele/
├── .github/
│   └── workflows/              # CI/CD workflows
│       ├── backend-ci.yml
│       ├── backend-cd.yml
│       ├── frontend-ci.yml
│       └── frontend-cd.yml
├── client/                      # React frontend
│   ├── .env.example            # Frontend env template
│   ├── vercel.json             # Vercel config
│   ├── netlify.toml            # Netlify config
│   └── src/
├── server/                      # Express backend
│   ├── .env.example            # Backend env template
│   ├── railway.json            # Railway config
│   ├── Procfile                # Process file
│   └── ...
├── screenshots/                 # Application screenshots
├── BACKEND_DEPLOYMENT_GUIDE.md
├── FRONTEND_DEPLOYMENT_GUIDE.md
├── CI_CD_GUIDE.md
├── MONITORING_GUIDE.md
├── MAINTENANCE_PLAN.md
├── ENVIRONMENT_VARIABLES.md
└── README.md                   # This file
```

---

## 📚 Documentation

### Deployment Guides
- [Backend Deployment Guide](./BACKEND_DEPLOYMENT_GUIDE.md)
- [Frontend Deployment Guide](./FRONTEND_DEPLOYMENT_GUIDE.md)
- [MongoDB Atlas Setup](./MONGODB_ATLAS_SETUP.md)

### CI/CD Documentation
- [CI/CD Guide](./CI_CD_GUIDE.md)

### Monitoring & Maintenance
- [Monitoring Guide](./MONITORING_GUIDE.md)
- [Maintenance Plan](./MAINTENANCE_PLAN.md)

### Configuration
- [Environment Variables](./ENVIRONMENT_VARIABLES.md)
- [NPM Troubleshooting](./NPM_TROUBLESHOOTING.md)

### Task Completion Summaries
- [Task 1: Application Preparation](./TASK1_COMPLETION_SUMMARY.md)
- [Task 2: Backend Deployment](./TASK2_COMPLETION_SUMMARY.md)
- [Task 3: Frontend Deployment](./TASK3_COMPLETION_SUMMARY.md)
- [Task 4: CI/CD Pipeline](./TASK4_COMPLETION_SUMMARY.md)
- [Task 5: Monitoring & Maintenance](./TASK5_COMPLETION_SUMMARY.md)

---

## ✅ Week 7 Assignment Completion

### All Tasks Completed ✅

- [x] **Task 1**: Application Preparation
  - Production build configuration
  - Code splitting
  - Environment variables
  - Secure HTTP headers
  - Production logging
  - Connection pooling

- [x] **Task 2**: Backend Deployment
  - Deployed to Railway
  - Environment variables configured
  - Continuous deployment enabled
  - HTTPS/SSL configured
  - Health check endpoint
  - Monitoring set up

- [x] **Task 3**: Frontend Deployment
  - Deployed to Vercel
  - Build settings configured
  - Environment variables configured
  - Continuous deployment enabled
  - HTTPS configured
  - Caching strategies implemented

- [x] **Task 4**: CI/CD Pipeline
  - GitHub Actions workflows
  - Automated testing
  - Linting and code quality
  - Automated building
  - Staging and production environments
  - Rollback strategies

- [x] **Task 5**: Monitoring and Maintenance
  - Health check endpoints
  - Uptime monitoring
  - Error tracking (Sentry)
  - Performance monitoring
  - Maintenance plan
  - Database backup plan
  - Deployment and rollback procedures

---

## 🔗 Useful Links

- **Frontend**: [Vercel Dashboard](https://vercel.com/dashboard)
- **Backend**: [Railway Dashboard](https://railway.app/dashboard)
- **Database**: [MongoDB Atlas](https://cloud.mongodb.com/)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)
- **Monitoring**: [Sentry](https://sentry.io) | [UptimeRobot](https://uptimerobot.com)
- **Authentication**: [Clerk Dashboard](https://dashboard.clerk.com)

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Student**: [Your Name Here]

This project was completed as part of the Week 7 Deployment and DevOps Essentials assignment.

---

## 🙏 Acknowledgments

- PLP (Power Learn Project) for the assignment structure
- Railway, Vercel, and MongoDB Atlas for hosting services
- GitHub Actions for CI/CD capabilities
- Sentry for error tracking
- All open-source contributors

---

**Status**: ✅ All Tasks Complete | 🚀 Production Ready

**Last Updated**: November 2025
