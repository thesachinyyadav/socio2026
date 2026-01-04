# 🏗️ Deployment Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                          PRODUCTION                              │
│                                                                   │
│  ┌───────────────────┐         ┌──────────────────┐             │
│  │                   │         │                  │             │
│  │   Vercel Client   │────────▶│  Vercel Server   │             │
│  │   (Next.js App)   │  API    │  (Express API)   │             │
│  │                   │ Calls   │                  │             │
│  └───────────────────┘         └──────────────────┘             │
│           │                              │                       │
│           │                              │                       │
│           ▼                              ▼                       │
│  ┌──────────────────────────────────────────────┐               │
│  │                                              │               │
│  │            Supabase Cloud                    │               │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │               │
│  │  │          │  │          │  │          │  │               │
│  │  │   Auth   │  │ Database │  │ Storage  │  │               │
│  │  │          │  │   (SQL)  │  │  (Files) │  │               │
│  │  └──────────┘  └──────────┘  └──────────┘  │               │
│  │                                              │               │
│  └──────────────────────────────────────────────┘               │
│                                                                   │
│  ┌─────────────────────────────┐                                │
│  │     Vercel Cron Jobs        │                                │
│  │  (Daily Cleanup @ 12:01 AM) │                                │
│  └─────────────────────────────┘                                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### User Authentication
```
User → Client → Supabase Auth → JWT Token → API Requests
```

### Event Creation
```
User fills form → Client validates → 
Uploads files to Supabase Storage → 
Sends data to Server API → 
Server saves to Supabase Database → 
Response back to Client
```

### Daily Cleanup (Cron)
```
Vercel Cron Trigger (12:01 AM IST) → 
Calls /api/cron/cleanup → 
Server checks expired events/fests → 
Deletes from Database → 
Deletes files from Storage → 
Returns cleanup report
```

---

## Environment Variables Flow

### Development (Local)
```
client/.env.local
├── NEXT_PUBLIC_API_URL=http://localhost:8000
└── NEXT_PUBLIC_APP_URL=http://localhost:3000

server/.env
├── NODE_ENV=development
└── PORT=8000
```

### Production (Vercel)
```
Client Project → Environment Variables
├── NEXT_PUBLIC_API_URL=https://server.vercel.app
└── NEXT_PUBLIC_APP_URL=https://client.vercel.app

Server Project → Environment Variables
├── NODE_ENV=production
└── CRON_SECRET=secret123
```

---

## Deployment Structure

```
Your Git Repository
│
├── client/                    → Vercel Project #1
│   ├── app/
│   ├── context/
│   ├── package.json
│   └── next.config.ts
│
└── server/                    → Vercel Project #2
    ├── routes/
    ├── config/
    ├── utils/
    ├── index.js
    ├── package.json
    └── vercel.json
```

---

## API Endpoints

### Server Routes
```
Base URL: https://your-server.vercel.app

Public Endpoints:
├── GET  /api/events           - List all events
├── GET  /api/events/:id       - Get event details
├── GET  /api/fests            - List all fests
├── GET  /api/fests/:id        - Get fest details
└── POST /api/register         - Register for event

Protected Endpoints (require auth):
├── POST   /api/events         - Create event
├── PUT    /api/events/:id     - Update event
├── DELETE /api/events/:id     - Delete event
├── POST   /api/fests          - Create fest
├── PUT    /api/fests/:id      - Update fest
├── DELETE /api/fests/:id      - Delete fest
└── GET    /api/users/:email   - Get user profile

Cron Endpoint:
└── POST /api/cron/cleanup     - Daily cleanup (Vercel Cron)
```

---

## Security Model

```
┌─────────────────────────────────────────────┐
│              Security Layers                 │
├─────────────────────────────────────────────┤
│ 1. Supabase Row Level Security (RLS)        │
│    - Database access policies                │
│    - Storage bucket policies                 │
├─────────────────────────────────────────────┤
│ 2. JWT Authentication                        │
│    - Supabase Auth tokens                    │
│    - Bearer token in API requests            │
├─────────────────────────────────────────────┤
│ 3. CORS Configuration                        │
│    - Allowed origins only                    │
│    - Credentials support                     │
├─────────────────────────────────────────────┤
│ 4. Environment Variables                     │
│    - No secrets in code                      │
│    - Vercel environment isolation            │
├─────────────────────────────────────────────┤
│ 5. Cron Authentication                       │
│    - CRON_SECRET verification                │
│    - Prevents unauthorized cleanup calls     │
└─────────────────────────────────────────────┘
```

---

## Traffic Flow

### User Visits Website
```
1. User → https://your-client.vercel.app
2. Vercel CDN serves Next.js static pages
3. Client-side JavaScript loads
4. App fetches data from API
5. API calls: https://your-server.vercel.app/api/*
6. Server processes and queries Supabase
7. Response → Client → User
```

### User Uploads File
```
1. User selects file in form
2. Client validates file (type, size)
3. Client uploads directly to Supabase Storage
4. Supabase returns file URL
5. Client sends form data + file URL to Server API
6. Server saves metadata to Database
7. Response → Client → User
```

---

## Scaling Capabilities

### Vercel Features
- ✅ **Auto-scaling**: Handles traffic spikes automatically
- ✅ **Edge Network**: Global CDN for fast delivery
- ✅ **Serverless**: Pay per execution, no idle costs
- ✅ **Preview Deployments**: Every branch gets a URL
- ✅ **Instant Rollbacks**: Easy deployment management

### Supabase Features
- ✅ **Connection Pooling**: Efficient database connections
- ✅ **Automatic Backups**: Daily database snapshots
- ✅ **CDN Storage**: Fast file delivery worldwide
- ✅ **Scalable Database**: Grows with your data
- ✅ **Real-time Subscriptions**: Live data updates

---

## Monitoring Points

```
Client Monitoring:
├── Vercel Analytics (page views, performance)
├── Browser console errors
└── Client-side error boundaries

Server Monitoring:
├── Vercel Function logs
├── API response times
├── Error rates
└── Cron job execution logs

Database Monitoring:
├── Supabase Dashboard (queries, connections)
├── Storage usage
└── Auth activity
```

---

## Cost Estimation

### Free Tier Includes:
- **Vercel**: 100GB bandwidth, unlimited deployments
- **Supabase**: 500MB database, 1GB storage, 50K monthly active users
- **Total Cost**: $0 for small to medium applications

### Paid Tier (if needed):
- **Vercel Pro**: $20/month per user
- **Supabase Pro**: $25/month per project

---

This architecture ensures:
✅ High availability
✅ Auto-scaling
✅ Global distribution
✅ Security
✅ Cost efficiency
✅ Easy maintenance
