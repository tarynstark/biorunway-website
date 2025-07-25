# Netlify Environment Variables Setup

## Required Environment Variables

Add these in **Netlify Dashboard > Site Settings > Environment Variables**:

### ✅ Production & Build Variables
```bash
PUBLIC_SUPABASE_URL=your_supabase_url_here
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 🔒 Staging/Preview Password Protection  
```bash
PUBLIC_STAGING_PASSWORD=your_staging_password_here
```
*Note: Leave empty for production, or set to enable password protection*

## Netlify Build Settings

**Build Command**: `npm run build`  
**Publish Directory**: `dist`  
**Node Version**: `18` (set in Environment Variables if needed)

## Auto-Deploy Configuration

- ✅ **Auto-deploy**: Enabled (deploys on push to main)
- ✅ **Deploy previews**: Enabled (for pull requests)  
- ✅ **Branch deploys**: Enabled (for feature branches)

## Password Protection Logic

The existing `PasswordGate.jsx` component will:
- **Production**: No password if `PUBLIC_STAGING_PASSWORD` is empty
- **Staging/Previews**: Require password if `PUBLIC_STAGING_PASSWORD` is set
- **Development**: Always skip password gate

## After Setup

1. Push to main branch → Netlify auto-deploys to production
2. Create PR → Netlify creates deploy preview  
3. Test password protection on preview URL
4. Merge PR → Netlify deploys to production domain

---
**Linear Issue**: https://linear.app/biorunway/issue/BIO-14