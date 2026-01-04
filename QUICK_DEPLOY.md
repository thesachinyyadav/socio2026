# 🚀 Quick Deployment Reference

## Pre-Deployment Checklist ✅

- [ ] Have Supabase project URL and keys ready
- [ ] Have Vercel account set up
- [ ] Code pushed to Git repository (GitHub/GitLab/Bitbucket)

---

## 1️⃣ Deploy Server (5 minutes)

### Vercel Configuration
```
Framework Preset: Other
Root Directory: server
Build Command: (leave empty)
Install Command: npm install
```

### Environment Variables
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGc...
```

### After Deployment
✅ Copy server URL: `https://your-server.vercel.app`

---

## 2️⃣ Deploy Client (5 minutes)

### Vercel Configuration
```
Framework Preset: Next.js
Root Directory: client
Build Command: npm run build
Install Command: npm install
```

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXT_PUBLIC_API_URL=https://your-server.vercel.app
NEXT_PUBLIC_APP_URL=https://your-client.vercel.app
```

### After First Deployment
✅ Update `NEXT_PUBLIC_APP_URL` with actual client URL
✅ Redeploy

---

## 3️⃣ Configure Supabase (2 minutes)

### Go to: Authentication > URL Configuration

#### Add to Redirect URLs:
```
http://localhost:3000/auth/callback
https://your-client.vercel.app/auth/callback
https://*.vercel.app/auth/callback
```

#### Set Site URL:
```
https://your-client.vercel.app
```

---

## 🎉 You're Done!

### Test Your Deployment:
1. Visit client URL
2. Try authentication
3. Test API: `https://your-server.vercel.app/api/events`
4. Create an event
5. Verify in Supabase

---

## ⚡ Quick Fixes

### Issue: CORS Error
**Fix:** Update `server/index.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-client.vercel.app',
    /\.vercel\.app$/
  ]
}));
```

### Issue: 404 on API Routes
**Fix:** Check `NEXT_PUBLIC_API_URL` has no trailing slash

### Issue: Environment Variables Not Working
**Fix:** Redeploy after adding variables

### Issue: Authentication Not Working
**Fix:** Verify Supabase redirect URLs match exactly

---

## 📱 Useful Vercel CLI Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls
```

---

## 🔗 Important URLs

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://app.supabase.com
- **GitHub Repository:** [Your Repo URL]

---

## 📞 Need Help?

See full guide: `VERCEL_DEPLOYMENT_GUIDE.md`

**Documentation:**
- Vercel: https://vercel.com/docs
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
