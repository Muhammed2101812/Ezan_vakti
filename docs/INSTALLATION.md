# 🛠️ Installation Guide

This document provides detailed instructions for setting up the Prayer Times Lite application on your local development environment.

## 📋 Prerequisites

Before installing the application, ensure you have the following prerequisites:

- **Node.js**: Version 16.0 or higher
- **npm**: Version 8.0 or higher (ships with Node.js)
- **Git**: Version control system
- **Text Editor**: VS Code, WebStorm, or your preferred editor
- **Web Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## 🚀 Quick Installation

If you're familiar with Node.js and React development, you can get started quickly:

```bash
# Clone the repository
git clone <repository-url>
cd prayer-times-lite

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📦 Detailed Installation Steps

### 1. Clone the Repository

Open your terminal or command prompt and run:

```bash
git clone <repository-url>
```

If you don't have Git installed, you can download the ZIP file from the repository and extract it to your desired location.

### 2. Navigate to the Project Directory

```bash
cd prayer-times-lite
```

### 3. Verify Node.js and npm Versions

Before installing dependencies, verify you have the required versions:

```bash
node --version
npm --version
```

If you don't have Node.js installed or have an older version, download it from [nodejs.org](https://nodejs.org/).

### 4. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

This will install:

- React and React DOM
- Vite build tool
- TailwindCSS and related dependencies
- day.js for date/time operations
- lucide-react for icons
- Development dependencies for building and testing

### 5. Set Up Environment Variables (Optional)

If your deployment requires environment variables, create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then update the values in `.env` as needed.

### 6. Initialize TailwindCSS (if not already configured)

The project should already have TailwindCSS configured, but if needed:

```bash
npm install -D tailwindcss@latest postcss autoprefixer
npx tailwindcss init -p
```

### 7. Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

The application will start and display a local server address (usually `http://localhost:5173` or `http://127.0.0.1:5173`).

## 🔧 Configuration Files

The installation includes several configuration files:

### package.json

Contains project metadata and dependencies:

```json
{
  "name": "prayer-times-lite",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "dayjs": "^1.11.0",
    "lucide-react": "^0.400.0",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^6.0.0"
  }
}
```

### tailwind.config.js

Configures TailwindCSS for the project:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### vite.config.js

Configures the Vite build tool:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

## 🔍 Verification Steps

After installation, verify that everything is working correctly:

1. **Application Starts**: Open your browser and navigate to the local server address displayed in the terminal
2. **No Errors**: Check the browser console for any JavaScript errors
3. **Hot Reload**: Make a small change to the source code (e.g., modify text in App.jsx) and verify that the page updates automatically
4. **API Connection**: The application should attempt to connect to the prayer times API

## 🐛 Troubleshooting

### Common Installation Issues

#### Node.js Version Issues

If you get errors about Node.js version, check your version with:

```bash
node --version
```

If your version is below 16.0, update Node.js or use a version manager like `nvm`:

```bash
# Using nvm to install and use Node.js 18
nvm install 18
nvm use 18
```

#### npm Permission Errors

On Unix systems, you might encounter permission errors. Fix with:

```bash
sudo chown -R $(whoami) ~/.npm
```

#### Dependency Installation Issues

If you encounter issues during dependency installation:

1. Clear npm cache:

```bash
npm cache clean --force
```

2. Delete node_modules and reinstall:

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

#### Port Already in Use

If you get an error about the port being in use:

1. Kill the process using the port:

```bash
# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :5173
kill -9 <PID>
```

2. Or start the server on a different port:

```bash
npm run dev -- --port 3000
```

## 🧪 Testing the Installation

Verify the installation is complete by running:

```bash
# Check if the build works
npm run build

# Preview the production build locally
npm run preview
```

## 🔄 Updating Dependencies

To update dependencies after installation:

```bash
# Update all dependencies to their latest compatible versions
npm update

# Update to the latest versions (may include breaking changes)
npm install [package-name]@latest
```

## 🚀 Next Steps

After successful installation, you can:

1. [Explore the Usage Guide](USAGE.md) to understand how to use the application
2. [Review the Component Documentation](COMPONENTS.md) to understand the structure
3. [Check the API Integration Guide](API.md) to understand how prayer times are fetched
4. [Learn about Deployment Options](DEPLOYMENT.md) to deploy your application
