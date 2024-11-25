# Vercel Deployment Guide

## Setup

1. **Environment Variables**
   - Add all required environment variables in Vercel dashboard
   - Use Production/Preview/Development environments

2. **Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Domain Configuration**
   - Add custom domain if needed
   - Configure SSL/TLS

4. **Git Integration**
   - Connect to GitHub repository
   - Configure auto-deployment
   - Set up branch deployments

## Deployment Process

1. **Production Deployment**
   ```bash
   git push origin main
   ```

2. **Preview Deployments**
   - Created automatically for pull requests
   - Use unique URLs for testing

3. **Environment Variables**
   - Ensure all required variables are set
   - Use different values per environment

4. **Monitoring**
   - Check build logs
   - Monitor deployment status
   - Review performance metrics 