# SOCIO Website 2026

A full-stack event management platform built with Next.js and Express.js, powered by Supabase.

## 🚀 Tech Stack

### Frontend (Client)
- **Framework:** Next.js 15.3.1
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **State Management:** React Context API
- **Forms:** React Hook Form + Zod
- **Authentication:** Supabase Auth

### Backend (Server)
- **Framework:** Express.js
- **Database:** Supabase (PostgreSQL)
- **File Storage:** Supabase Storage
- **Scheduled Tasks:** Node-cron

## 📁 Project Structure

```
├── client/                 # Next.js frontend application
│   ├── app/               # Next.js app directory
│   ├── context/           # React context providers
│   └── middleware.ts      # Next.js middleware
├── server/                # Express.js backend API
│   ├── routes/           # API route handlers
│   ├── config/           # Configuration files
│   └── utils/            # Utility functions
└── VERCEL_DEPLOYMENT_GUIDE.md  # Deployment instructions
```

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project
- Git

### Client Setup

1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.local.example .env.local
   ```

4. Edit `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

Client will run on [http://localhost:3000](http://localhost:3000)

### Server Setup

1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` with your Supabase credentials:
   ```env
   PORT=8000
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

Server will run on [http://localhost:8000](http://localhost:8000)

## 🚢 Deployment to Vercel

Both the client and server are configured to deploy to Vercel. See the comprehensive deployment guide:

📖 **[VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md)**

### Quick Deploy Steps:

1. **Deploy Server First:**
   - Import repository to Vercel
   - Set root directory to `server`
   - Add environment variables
   - Deploy

2. **Deploy Client:**
   - Import same repository to Vercel
   - Set root directory to `client`
   - Add environment variables (including server URL)
   - Deploy

3. **Configure Supabase:**
   - Add redirect URLs in Supabase dashboard
   - Update site URL

## 🔑 Environment Variables

### Client Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbG...` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://your-server.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | Frontend URL | `https://your-app.vercel.app` |

### Server Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `SUPABASE_KEY` | Supabase service key | `eyJhbG...` |
| `PORT` | Server port (optional) | `8000` |

## 📦 Available Scripts

### Client
```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Server
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use Supabase Row Level Security (RLS) policies
- Keep dependencies updated
- Use environment variables for all sensitive data
- Enable CORS only for trusted domains

## 📄 License

[Add your license here]

## 👥 Contributors

[Add contributors here]

## 📞 Support

For deployment issues, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs) 
