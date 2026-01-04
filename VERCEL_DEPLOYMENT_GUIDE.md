# Vercel Deployment Guide for SOCIO Website

## Overview
This guide will help you deploy both the **client** (Next.js) and **server** (Express.js) to Vercel, while using Supabase as your database.

---

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Supabase Project**: Have your Supabase credentials ready
3. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket

---

## Part 1: Deploy the Server (Express API)

### Step 1: Prepare Server for Vercel

The server has been configured with `vercel.json` to run as serverless functions.

### Step 2: Deploy Server to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repository
3. **Configure the project:**
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: Leave empty (or `npm install`)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables** (in Vercel dashboard):
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

5. Click **Deploy**

6. **Copy the deployment URL** (e.g., `https://your-server.vercel.app`)

---

## Part 2: Deploy the Client (Next.js)

### Step 1: Deploy Client to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) again
2. Import the **same repository**
3. **Configure the project:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `client`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables** (in Vercel dashboard):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_API_URL=https://your-server.vercel.app
   NEXT_PUBLIC_APP_URL=https://your-client.vercel.app
   ```
   
   **Important:** 
   - Replace `https://your-server.vercel.app` with the actual server URL from Part 1
   - The `NEXT_PUBLIC_APP_URL` will be your actual client URL (Vercel will show it after deployment)

5. Click **Deploy**

6. After deployment, go to **Project Settings > Environment Variables** and update `NEXT_PUBLIC_APP_URL` with the actual deployed URL

---

## Part 3: Configure Supabase Auth Redirect URLs

### Update Supabase Authentication Settings

1. Go to your **Supabase Dashboard**
2. Navigate to **Authentication > URL Configuration**
3. Add these URLs to **Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   https://your-client.vercel.app/auth/callback
   https://*.vercel.app/auth/callback
   ```
4. Set **Site URL** to: `https://your-client.vercel.app`

---

## Part 4: Update CORS (if needed)

If you encounter CORS issues, update the server's CORS configuration:

**File:** `server/index.js`

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-client.vercel.app',
    /\.vercel\.app$/  // Allow all Vercel preview URLs
  ],
  credentials: true
}));
```

Redeploy the server after this change.

---

## Part 5: Testing

### Test the Deployment

1. **Client:** Visit `https://your-client.vercel.app`
2. **Server API:** Test `https://your-server.vercel.app/api/events`
3. **Authentication:** Try logging in/signing up
4. **Database:** Verify data is being saved to Supabase

---

## Common Issues & Solutions

### Issue 1: Server Routes Not Working
**Solution:** Ensure `vercel.json` is in the `server` directory with correct configuration.

### Issue 2: Environment Variables Not Loading
**Solution:** 
- Redeploy after adding environment variables
- For client variables, they MUST start with `NEXT_PUBLIC_`

### Issue 3: CORS Errors
**Solution:** Update CORS configuration in `server/index.js` to include your client URL

### Issue 4: 404 on API Routes
**Solution:** Verify your `NEXT_PUBLIC_API_URL` doesn't have a trailing slash

### Issue 5: Cron Job Not Running
**Solution:** Vercel serverless functions don't support long-running cron jobs. Consider:
- Using Vercel Cron Jobs (add to `vercel.json`)
- Using Supabase Database Webhooks
- Using an external cron service like cron-job.org

---

## Monitoring & Logs

### View Logs in Vercel
1. Go to your project dashboard
2. Click on **Deployments**
3. Select a deployment
4. View **Functions** tab for server logs
5. View **Build Logs** for build issues

---

## Local Development

### Setting Up Local Environment

1. **Client:**
   ```bash
   cd client
   cp .env.local.example .env.local
   # Edit .env.local with your values
   npm install
   npm run dev
   ```

2. **Server:**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your values
   npm install
   npm run dev
   ```

---

## Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request or push to other branches

---

## Custom Domain (Optional)

1. Go to **Project Settings > Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update environment variables with your custom domain

---

## Security Checklist

- ✅ Never commit `.env` files
- ✅ Use Supabase Row Level Security (RLS)
- ✅ Validate all user inputs on the server
- ✅ Keep dependencies updated
- ✅ Use HTTPS only in production
- ✅ Enable CORS only for trusted domains

---

## Support

For issues:
- **Vercel Documentation:** [vercel.com/docs](https://vercel.com/docs)
- **Supabase Documentation:** [supabase.com/docs](https://supabase.com/docs)
- **Next.js Documentation:** [nextjs.org/docs](https://nextjs.org/docs)

---

## Quick Deploy Commands

```bash
# Install Vercel CLI (optional)
npm install -g vercel

# Deploy from command line
cd client && vercel
cd ../server && vercel
```

---

**That's it! Your application should now be live on Vercel! 🎉**
