# BIO-14: Vercel to Netlify Migration (Auto-Deploy)

## ✅ Completed Setup
- [x] Connected GitHub repository to Netlify
- [x] Created `netlify.toml` with Astro configuration  
- [x] Removed all Vercel-specific files
- [x] Updated configuration for auto-deploy

## Netlify Configuration ✅
- [x] **Build Command**: `npm run build`
- [x] **Publish Directory**: `dist`  
- [x] **Node Version**: 18
- [x] **Auto-deploy**: Enabled on main branch
- [x] **Deploy Previews**: Enabled for PRs

## Environment Variables Setup
Add in **Netlify Dashboard > Site Settings > Environment Variables**:

```bash
# Required for Supabase integration
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional for password protection  
PUBLIC_STAGING_PASSWORD=your_staging_password
```

## Testing Phase
- [ ] Push to main branch → triggers auto-deploy
- [ ] Test Netlify production URL
- [ ] Create test PR → verify deploy preview works
- [ ] Test password protection on preview URL
- [ ] Verify email collection functionality
- [ ] Check all page routes load correctly

## Domain Migration (When Ready)
- [ ] Add custom domain in Netlify Dashboard
- [ ] Update DNS to point to Netlify
- [ ] Verify SSL certificate activates
- [ ] Test production domain

## Post-Migration Cleanup
- [ ] Delete Vercel project
- [ ] Remove GitHub secrets (Vercel-related):
  - [ ] `VERCEL_TOKEN`
  - [ ] `VERCEL_ORG_ID`
  - [ ] `VERCEL_PROJECT_ID`

## Files Removed ✅
- [x] `vercel.json` 
- [x] `.github/workflows/deploy-staging.yml`
- [x] `.github/workflows/vercel-link.yml`
- [x] `.github/workflows/deploy-netlify.yml` (not needed with auto-deploy)

---
**Branch**: `taryns/bio-14-migrate-from-vercel-to-netlify`  
**Linear Issue**: https://linear.app/biorunway/issue/BIO-14