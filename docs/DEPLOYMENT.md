# 🚀 Deployment Guide

This document provides instructions for deploying the Prayer Times Lite application to various platforms, with a focus on Vercel as recommended in the original plan.

## 📋 Overview

The Prayer Times Lite application can be deployed to various platforms, including Vercel, Netlify, GitHub Pages, or traditional web servers. This guide focuses on the recommended deployment approach using Vercel.

## 🏗️ Build Process

Before deployment, the application must be built using Vite's production build command:

```bash
npm run build
```

This command creates a `dist/` directory containing all the necessary static files for deployment.

### Build Output

- All assets are optimized and minified
- JavaScript and CSS files are bundled
- Static files are properly referenced
- The build is optimized for production performance

## 🌐 Vercel Deployment (Recommended)

### Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- The Vercel CLI installed globally (optional): `npm install -g vercel`

### Method 1: Git Integration (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Visit [vercel.com](https://vercel.com) and import your project
3. Vercel will automatically detect this is a Vite project
4. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Development Command: `npm run dev`
5. Deploy the project

### Method 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy the project
vercel
```

### Method 3: Git Push Deployment

1. Link your Git repository to Vercel
2. Every push to the main branch will trigger a deployment
3. Vercel automatically builds and deploys the application

### Vercel Configuration File

Create a `vercel.json` file in your project root for advanced configuration:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Environment Variables for Vercel

If you need environment variables, add them in the Vercel dashboard under Settings > Environment Variables:

- `NODE_ENV`: Set to `production`
- Any custom API keys or configuration values

## 🌍 Netlify Deployment

### Method 1: Git Integration

1. Push your code to a Git repository
2. Visit [netlify.com](https://netlify.com) and create an account
3. Select "New site from Git"
4. Connect your repository
5. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
6. Deploy

### Method 2: Drag and Drop

1. Build the project: `npm run build`
2. Drag the contents of the `dist/` folder to the Netlify deploy screen

### Netlify Configuration

Create a `netlify.toml` file for advanced configuration:

```toml
[build]
  command = "npm run build"
  publish = "dist"
  environment = { NODE_VERSION = "18" }

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🏗️ Custom Server Deployment

### Static File Server

The built application consists of static files that can be served by any web server:

#### Apache Server

1. Build the project: `npm run build`
2. Upload the `dist/` folder contents to your server's document root
3. Ensure your `.htaccess` file includes SPA routing:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

#### Nginx Server

1. Build the project: `npm run build`
2. Upload the `dist/` folder contents to your web directory
3. Configure Nginx with SPA routing:

```nginx
server {
  listen 80;
  server_name yourdomain.com;
  root /path/to/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

#### Node.js Server

For a Node.js static server:

```javascript
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 🚢 GitHub Pages Deployment

### Using GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: npm run build
      - uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: dist
```

### Manual Deployment

1. Build the project: `npm run build`
2. Copy the contents of the `dist/` folder
3. Create a `gh-pages` branch in your repository
4. Paste the files in the root of the `gh-pages` branch
5. Enable GitHub Pages in repository settings

## 🧪 Pre-deployment Checklist

Before deploying, ensure the following:

- [ ] Application builds successfully: `npm run build`
- [ ] All tests pass (if implemented)
- [ ] API keys are properly configured for production
- [ ] Privacy policy and terms of service are in place
- [ ] Production environment variables are set
- [ ] Security headers are configured
- [ ] Analytics are properly set up (if applicable)

## 🚨 Common Deployment Issues

### Routing Issues

If you encounter 404 errors when refreshing or navigating directly to URLs:

- Ensure your server configuration handles client-side routing
- The server should serve `index.html` for all routes that don't match static assets

### Asset Loading Issues

If CSS, JS, or image files don't load:

- Verify the `base` configuration in `vite.config.js` matches your deployment path
- Check that all assets are properly referenced in the build

### API Connection Issues

- Ensure your API endpoints are accessible from the deployment environment
- Verify that CORS policies allow requests from your deployed domain

### Performance Optimization

- Verify that assets are properly minified and optimized
- Check that gzip compression is enabled on your server
- Confirm that caching headers are properly configured

## 🔐 Security Considerations

### HTTPS

- Always deploy with HTTPS enabled
- Use valid SSL certificates
- Redirect HTTP traffic to HTTPS

### Content Security

- Implement appropriate Content Security Policy headers
- Set security headers as shown in the Vercel configuration

### API Security

- Don't expose API keys in client-side code if possible
- Implement proper rate limiting on API requests
- Validate and sanitize all inputs

## 📊 Monitoring and Analytics

### Performance Monitoring

- Set up performance monitoring for the deployed application
- Monitor page load times, API response times, and error rates
- Consider using tools like Google Analytics or Vercel Analytics

### Error Tracking

- Implement error tracking in production
- Monitor for any runtime errors in the console
- Set up alerts for critical errors

## 🔄 Continuous Deployment

### Automatic Deployment

- Set up automatic deployment on every push to the main branch
- Use Git integration with your hosting platform for seamless deployment
- Implement proper testing before deployment

### Rollback Strategy

- Maintain the ability to rollback to previous versions
- Use versioned deployments where possible
- Test the rollback process before relying on it

## 📞 Post-Deployment Tasks

After successful deployment:

1. **Verify Functionality**: Test all features on the live site
2. **Check Mobile Responsiveness**: Ensure the application works on all screen sizes
3. **API Integration**: Confirm that prayer time API calls work in production
4. **Performance Testing**: Verify page load times and responsiveness
5. **Security Check**: Scan for security vulnerabilities
6. **Analytics Setup**: Verify analytics are tracking properly
7. **SEO Setup**: Ensure proper meta tags and sitemap (if applicable)

## 🔄 Updating Deployments

### Regular Updates

- Push updates to your Git repository
- The deployment platform will automatically rebuild and redeploy
- Monitor the deployment logs for any issues

### Hot Fixes

- Create a new branch for critical fixes
- Deploy and test the fix
- Merge to main branch after verification
