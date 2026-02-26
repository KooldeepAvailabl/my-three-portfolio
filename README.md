# 🚀 Three.js Portfolio - Kooldeep Rajput

## ✨ NEW: Cinematic Scroll Animations

### Enhanced Features:
- 🎬 **Scroll-Based Camera Animation**: Smooth camera transitions between sections
- 🎨 **3D Model Showcase**: Premium abstract shape with metallic materials
- 💡 **Professional Lighting**: Enhanced lighting setup with tone mapping
- 🖱️ **Mouse Parallax**: Subtle camera movement following mouse
- ⚡ **Performance Optimized**: Smooth 60 FPS animations

### Quick Links:
- 📖 [Cinematic Animation Guide](./CINEMATIC_GUIDE.md)
- 🎨 [Free 3D Models](./FREE_MODELS.md)
- 🎥 [Camera Presets](./CAMERA_PRESETS.md)

---

## Three.js Usage

### Main Scene (Home Section)
- **3D Objects**: Rotating geometric shapes with metallic materials
- **Particles System**: 1000 floating particles for depth
- **Camera Controls**: Mouse parallax effect
- **Lighting**: Point lights with colored glow

### Contact Section
- **Animated Rings**: 3D torus geometry with rotation
- **Dynamic Movement**: Sine wave animation

### Footer Section
- **Particle Background**: 500 particles with wave effects
- **Interactive**: Mouse-following particles

## Run Project

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Netlify

### Method 1: Drag & Drop (Easiest)
1. Build project:
   ```bash
   npm run build
   ```
2. Go to https://app.netlify.com/drop
3. Drag `dist` folder to the page
4. Done! ✅

### Method 2: Netlify CLI
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Login:
   ```bash
   netlify login
   ```
3. Deploy:
   ```bash
   npm run build
   netlify deploy --prod
   ```
4. Select `dist` folder when asked

### Method 3: GitHub (Auto Deploy)
1. Push code to GitHub
2. Go to https://app.netlify.com
3. Click "Add new site" → "Import from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

## Tech Stack
- Three.js - 3D Graphics
- GSAP - Animations
- Vite - Build Tool
