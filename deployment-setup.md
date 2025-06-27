# BioRunway Deployment Setup

## Vercel Deployment with Password Protection

### 1. Vercel Setup
1. Install Vercel CLI: `npm i -g vercel`
2. Login to Vercel: `vercel login`
3. Link project: `vercel link` (or create new project)
4. Get project details: `vercel project ls`

### 2. GitHub Secrets Required

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

#### Vercel Integration
- `VERCEL_TOKEN`: Your Vercel token (get from vercel.com/account/tokens)
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

#### Application Secrets  
- `PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `PUBLIC_STAGING_PASSWORD`: Password for staging access (e.g., "biorunway2024")

### 3. Getting Vercel IDs

Run these commands in your project directory:

```bash
# Login to Vercel
vercel login

# Link project (creates .vercel folder)
vercel link

# Get project info
cat .vercel/project.json
```

The `.vercel/project.json` file will contain:
```json
{
  "orgId": "your-org-id-here",
  "projectId": "your-project-id-here"
}
```

### 4. Environment Variables in Vercel

Set these in your Vercel dashboard (Project Settings → Environment Variables):

- `PUBLIC_SUPABASE_URL` → Your Supabase URL
- `PUBLIC_SUPABASE_ANON_KEY` → Your Supabase key  
- `PUBLIC_STAGING_PASSWORD` → Your staging password

### 5. Manual Deployment

1. Go to GitHub Actions tab in your repository
2. Click "Deploy to Vercel Staging" workflow
3. Click "Run workflow"
4. Select "staging" environment
5. Click "Run workflow"

### 6. Password Protection

The staging site will show a password gate that requires the `PUBLIC_STAGING_PASSWORD` to access. The password is stored in session storage after successful authentication.

### 7. Future User Auth Migration

When ready to implement user auth:
1. Replace `PasswordGate.jsx` with proper user authentication
2. Integrate with Supabase Auth
3. Add user roles and permissions
4. Implement paid content gating

### 8. Security Notes

- Staging environment has `noindex, nofollow` meta tags
- Password is required for each browser session
- Vercel deployment includes security headers
- All secrets are encrypted in GitHub Actions

### 9. Troubleshooting

- If deployment fails, check GitHub Actions logs
- Verify all secrets are set correctly in GitHub
- Ensure Vercel project is properly linked
- Check build logs in Vercel dashboard