#!/bin/bash

# Remove the files marked for deletion
rm vercel.json
rm .github/workflows/deploy-staging.yml  
rm .github/workflows/vercel-link.yml
rm .github/workflows/deploy-netlify.yml

# Add all changes
git add .

# Commit with Linear reference
git commit -m "[BIO-14]: Complete Vercel to Netlify migration setup

- Remove vercel.json and all Vercel GitHub workflows
- Add netlify.toml for auto-deploy configuration  
- Create NETLIFY-SETUP.md with environment variables checklist
- Update MIGRATION-CHECKLIST.md for auto-deploy approach
- Enable Netlify auto-deploy on connected repository

Ready for environment variables setup in Netlify dashboard.

https://linear.app/biorunway/issue/BIO-14"

echo "Migration files committed successfully!"
echo "Next steps:"
echo "1. Add environment variables in Netlify dashboard"
echo "2. Push to main branch to trigger first auto-deploy"
echo "3. Test the deployment"