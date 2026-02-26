# 🎬 Cinematic Scroll Animation Guide

## ✅ What Was Enhanced

### 1. **Scroll-Controlled Camera Animation**
- Camera smoothly moves to different positions per section
- Uses GSAP ScrollTrigger with `scrub` for smooth transitions
- Each section has unique camera angle:
  - **Home**: Front view (0, 0, 5)
  - **About**: Side angle (3, 1, 4) with rotation
  - **Projects**: Zoom in (-2, -1, 3)
  - **Contact**: Zoom out (0, 2, 6)

### 2. **Premium 3D Model Showcase**
- Added abstract torus knot with metallic material
- Slow rotation + floating animation
- Wireframe overlay for premium look
- Ready for GLTF model loading (commented code included)

### 3. **Enhanced Professional Lighting**
- Ambient light (base illumination)
- Directional light (main light source)
- 2x Point lights (colored accents)
- Rim light (edge highlighting)
- Tone mapping for cinematic look

### 4. **Mouse Interaction Enhanced**
- Subtle camera position shift (not rotation)
- Parallax effect on camera position
- Smooth interpolation

### 5. **Performance Optimizations**
- Proper pixel ratio capping
- Tone mapping for better rendering
- sRGB encoding for accurate colors

---

## 🎮 How to Test

### Step 1: Run Development Server
```bash
npm install
npm run dev
```

### Step 2: Test Scroll Animation
1. Open browser (usually http://localhost:5173)
2. Scroll slowly through sections
3. Watch camera smoothly transition between angles
4. Notice 3D objects parallax at different speeds

### Step 3: Test Mouse Interaction
1. Move mouse around the screen
2. Camera should subtly follow mouse
3. Effect should be smooth, not jarring

### Step 4: Check Performance
1. Open DevTools (F12)
2. Check FPS in Performance tab
3. Should maintain 60 FPS on modern hardware

---

## 🎨 Free GLTF Models (Similar to camera-webgi.vercel.app)

### Recommended Sources:

1. **Sketchfab** (https://sketchfab.com/features/gltf)
   - Search: "laptop", "computer", "desk setup", "workspace"
   - Filter: Downloadable, Free
   - Best for: Product showcases

2. **Poly Pizza** (https://poly.pizza)
   - Low-poly models
   - Free, no attribution required
   - Great for: Abstract objects, tech items

3. **Quaternius** (https://quaternius.com)
   - Ultimate Low Poly collection
   - Free for commercial use
   - Good for: Stylized objects

4. **Kenney Assets** (https://kenney.nl/assets)
   - Free game assets
   - Many 3D models
   - Perfect for: Simple, clean designs

### Specific Model Recommendations:

**For Developer Portfolio:**
- MacBook/Laptop model
- Desk setup with monitor
- Coffee cup + keyboard scene
- Abstract geometric shapes
- Floating code symbols

**Search Terms:**
- "macbook pro low poly"
- "developer desk"
- "workspace setup"
- "abstract tech"
- "geometric shapes"

---

## 📦 How to Add Your Own 3D Model

### Step 1: Download Model
1. Get a `.glb` or `.gltf` file
2. Place in `/public/models/` folder
3. Example: `/public/models/laptop.glb`

### Step 2: Update Code
In `src/main.js`, find this section (around line 140):

```javascript
// Optional: Load external GLTF model (uncomment when you have a model)
// gltfLoader.load(
//   '/models/your-model.glb',
//   (gltf) => {
//     showcaseModel = gltf.scene;
//     showcaseModel.scale.set(2, 2, 2);
//     showcaseModel.position.set(0, 0, 0);
//     scene.add(showcaseModel);
//     showcaseGroup.visible = false; // Hide placeholder
//   },
//   undefined,
//   (error) => console.log('Model loading optional:', error)
// );
```

**Uncomment and update:**
```javascript
gltfLoader.load(
  '/models/laptop.glb', // Your model path
  (gltf) => {
    showcaseModel = gltf.scene;
    showcaseModel.scale.set(2, 2, 2); // Adjust scale
    showcaseModel.position.set(0, 0, 0); // Adjust position
    scene.add(showcaseModel);
    showcaseGroup.visible = false; // Hide placeholder
  }
);
```

### Step 3: Adjust Model
- **Scale**: Change `scale.set(x, y, z)` if too big/small
- **Position**: Change `position.set(x, y, z)` to move
- **Rotation**: Add `showcaseModel.rotation.y = Math.PI` to rotate

---

## 🎛️ Customization Options

### Adjust Camera Positions
In `src/main.js`, find `cameraPositions` array (around line 160):

```javascript
const cameraPositions = [
  { x: 0, y: 0, z: 5, rotationY: 0 },      // Home
  { x: 3, y: 1, z: 4, rotationY: -0.3 },   // About
  { x: -2, y: -1, z: 3, rotationY: 0.4 },  // Projects
  { x: 0, y: 2, z: 6, rotationY: 0 }       // Contact
];
```

**Experiment with values:**
- `x`: Left (-) / Right (+)
- `y`: Down (-) / Up (+)
- `z`: Closer (-) / Further (+)
- `rotationY`: Rotate camera angle

### Adjust Scroll Speed
Find ScrollTrigger config (around line 175):

```javascript
scrollTrigger: {
  trigger: section,
  start: 'top center',
  end: 'bottom center',
  scrub: 1.5, // Change this (0.5 = faster, 3 = slower)
  ease: 'power2.inOut'
}
```

### Change Model Animation Speed
Find showcase animation (around line 310):

```javascript
showcaseGroup.rotation.y += 0.003; // Increase for faster rotation
```

---

## 🚀 Deploy to Netlify

### Build and Deploy:
```bash
npm run build
netlify deploy --prod
```

Or drag `dist` folder to https://app.netlify.com/drop

---

## 🐛 Troubleshooting

### Camera not moving on scroll?
- Check console for errors
- Ensure sections have class `.section`
- Try refreshing page

### Model not loading?
- Check file path is correct
- Ensure model is in `/public/models/`
- Check browser console for errors
- Try different model format (.glb vs .gltf)

### Performance issues?
- Reduce particle count in main.js
- Lower `nodeCount` variable
- Check GPU acceleration is enabled

### Scroll feels choppy?
- Adjust `scrub` value in ScrollTrigger
- Try different easing functions
- Check for other heavy scripts

---

## 📊 Performance Tips

1. **Optimize Models**: Use low-poly models (<50k triangles)
2. **Compress Textures**: Use compressed image formats
3. **Limit Particles**: Keep under 3000 particles
4. **Use LOD**: Load detailed models only when needed
5. **Debounce Events**: Limit scroll/mouse event frequency

---

## 🎯 What Was NOT Changed

✅ Existing network nodes animation
✅ Existing cube rotation
✅ Existing particles system
✅ Contact section canvas
✅ Footer section canvas
✅ All GSAP animations for cards
✅ All CSS styles
✅ All HTML structure

**Everything still works!** Just enhanced with cinematic camera movements.

---

## 📝 Next Steps

1. ✅ Test scroll animation
2. ⬜ Download a 3D model
3. ⬜ Add model to project
4. ⬜ Customize camera positions
5. ⬜ Adjust animation speeds
6. ⬜ Deploy to Netlify

---

## 💡 Pro Tips

- **Subtle is better**: Don't make camera movements too dramatic
- **Test on mobile**: Ensure animations work on touch devices
- **Use easing**: Smooth easing makes animations feel premium
- **Match brand**: Adjust colors to match your brand
- **Optimize first**: Test performance before adding more effects

---

## 🎬 Inspiration Sites

- camera-webgi.vercel.app (your reference)
- https://bruno-simon.com
- https://www.awwwards.com/websites/three-js/

---

**Enjoy your cinematic portfolio! 🚀**
