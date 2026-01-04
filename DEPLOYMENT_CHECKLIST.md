# 📋 Vercel Deployment Checklist

Use this checklist to track your deployment progress.

---

## Pre-Deployment

- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] Supabase project created
- [ ] Have Supabase URL and keys ready
- [ ] Vercel account created

---

## Server Deployment

- [ ] Import repository to Vercel (new project)
- [ ] Set Framework Preset: **Other**
- [ ] Set Root Directory: **server**
- [ ] Add Environment Variables:
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_KEY`
  - [ ] `NODE_ENV=production`
  - [ ] `CRON_SECRET` (generate random string)
- [ ] Click Deploy
- [ ] Wait for deployment to complete
- [ ] Copy server URL: `_______________________`
- [ ] Test API: Visit `https://your-server.vercel.app/api/events`

---

## Client Deployment

- [ ] Import same repository to Vercel (new project)
- [ ] Set Framework Preset: **Next.js**
- [ ] Set Root Directory: **client**
- [ ] Add Environment Variables:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `NEXT_PUBLIC_API_URL` (server URL from above)
  - [ ] `NEXT_PUBLIC_APP_URL` (temporary - will update)
- [ ] Click Deploy
- [ ] Wait for deployment to complete
- [ ] Copy client URL: `_______________________`
- [ ] Update `NEXT_PUBLIC_APP_URL` with actual client URL
- [ ] Redeploy client

---

## Supabase Configuration

- [ ] Open Supabase Dashboard
- [ ] Go to **Authentication** > **URL Configuration**
- [ ] Add to **Redirect URLs**:
  - [ ] `http://localhost:3000/auth/callback`
  - [ ] `https://your-client.vercel.app/auth/callback`
  - [ ] `https://*.vercel.app/auth/callback`
- [ ] Set **Site URL**: `https://your-client.vercel.app`
- [ ] Save changes

---

## Testing

- [ ] Visit client homepage
- [ ] Test user registration
- [ ] Test user login
- [ ] Create a test event
- [ ] Upload images/files
- [ ] Verify data in Supabase
- [ ] Test API endpoints directly
- [ ] Check Vercel function logs
- [ ] Verify cron job configuration in Vercel

---

## Optional Configuration

- [ ] Set up custom domain
- [ ] Enable Vercel Analytics
- [ ] Configure monitoring/alerts
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure Supabase RLS policies
- [ ] Set up database backups
- [ ] Configure rate limiting
- [ ] Enable Vercel Edge Cache

---

## Post-Deployment

- [ ] Update documentation with live URLs
- [ ] Share deployment URLs with team
- [ ] Set up CI/CD if needed
- [ ] Monitor initial traffic
- [ ] Check error logs
- [ ] Test all features thoroughly

---

## URLs to Save

```
Server (API):  _______________________________________
Client (App):  _______________________________________
Supabase:      _______________________________________
GitHub Repo:   _______________________________________
```

---

## Useful Commands

```bash
# View deployment logs
vercel logs <deployment-url>

# List all deployments
vercel ls

# Redeploy to production
vercel --prod

# Pull environment variables locally
vercel env pull
```

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Full Guide**: See `VERCEL_DEPLOYMENT_GUIDE.md`
- **Quick Reference**: See `QUICK_DEPLOY.md`

---

**Status**: 
- [ ] Not Started
- [ ] In Progress
- [ ] Completed
- [ ] Tested & Live! 🎉

**Deployment Date**: _______________

**Deployed By**: _______________

**Notes**:
```
_______________________________________________________
_______________________________________________________
_______________________________________________________
```
