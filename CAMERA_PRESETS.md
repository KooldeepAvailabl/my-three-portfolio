# 🎥 Camera Position Presets

Copy and paste these presets into your `main.js` to change camera behavior.

## 📍 Current Setup (Default)

```javascript
const cameraPositions = [
  { x: 0, y: 0, z: 5, rotationY: 0 },      // Home - Front view
  { x: 3, y: 1, z: 4, rotationY: -0.3 },   // About - Side angle
  { x: -2, y: -1, z: 3, rotationY: 0.4 },  // Projects - Zoom in
  { x: 0, y: 2, z: 6, rotationY: 0 }       // Contact - Zoom out
];
```

---

## 🎬 Preset 1: Dramatic Orbit

**Style**: Camera orbits around scene

```javascript
const cameraPositions = [
  { x: 0, y: 0, z: 5, rotationY: 0 },       // Home - Front
  { x: 5, y: 2, z: 3, rotationY: -0.8 },    // About - Right side
  { x: -5, y: -2, z: 3, rotationY: 0.8 },   // Projects - Left side
  { x: 0, y: 3, z: 7, rotationY: 0 }        // Contact - Top view
];
```

**Best For**: Showcasing 3D model from all angles

---

## 🎬 Preset 2: Smooth Zoom

**Style**: Camera zooms in progressively

```javascript
const cameraPositions = [
  { x: 0, y: 0, z: 8, rotationY: 0 },       // Home - Far
  { x: 0, y: 0, z: 5, rotationY: 0 },       // About - Medium
  { x: 0, y: 0, z: 3, rotationY: 0 },       // Projects - Close
  { x: 0, y: 0, z: 2, rotationY: 0 }        // Contact - Very close
];
```

**Best For**: Product reveal, focus on details

---

## 🎬 Preset 3: Cinematic Pan

**Style**: Camera pans left to right

```javascript
const cameraPositions = [
  { x: -4, y: 0, z: 5, rotationY: 0.5 },    // Home - Left
  { x: -1, y: 0, z: 5, rotationY: 0.2 },    // About - Center-left
  { x: 1, y: 0, z: 5, rotationY: -0.2 },    // Projects - Center-right
  { x: 4, y: 0, z: 5, rotationY: -0.5 }     // Contact - Right
];
```

**Best For**: Wide scene, storytelling

---

## 🎬 Preset 4: Vertical Rise

**Style**: Camera rises from bottom to top

```javascript
const cameraPositions = [
  { x: 0, y: -2, z: 5, rotationY: 0 },      // Home - Low
  { x: 0, y: 0, z: 5, rotationY: 0 },       // About - Eye level
  { x: 0, y: 2, z: 5, rotationY: 0 },       // Projects - High
  { x: 0, y: 4, z: 6, rotationY: 0 }        // Contact - Bird's eye
];
```

**Best For**: Architectural, elevation showcase

---

## 🎬 Preset 5: Spiral Descent

**Style**: Camera spirals down and in

```javascript
const cameraPositions = [
  { x: 0, y: 3, z: 7, rotationY: 0 },       // Home - High & far
  { x: 3, y: 1, z: 5, rotationY: -0.5 },    // About - Right & medium
  { x: -3, y: -1, z: 3, rotationY: 0.5 },   // Projects - Left & close
  { x: 0, y: -2, z: 2, rotationY: 0 }       // Contact - Center & very close
];
```

**Best For**: Dynamic, energetic feel

---

## 🎬 Preset 6: Subtle Shift

**Style**: Minimal movement, professional

```javascript
const cameraPositions = [
  { x: 0, y: 0, z: 5, rotationY: 0 },       // Home - Center
  { x: 0.5, y: 0.2, z: 4.8, rotationY: -0.1 },  // About - Slight right
  { x: -0.5, y: -0.2, z: 4.5, rotationY: 0.1 }, // Projects - Slight left
  { x: 0, y: 0.5, z: 5.2, rotationY: 0 }    // Contact - Slight up
];
```

**Best For**: Corporate, minimal distraction

---

## 🎬 Preset 7: Aggressive Zoom

**Style**: Fast zoom for impact

```javascript
const cameraPositions = [
  { x: 0, y: 0, z: 10, rotationY: 0 },      // Home - Very far
  { x: 0, y: 0, z: 6, rotationY: 0 },       // About - Far
  { x: 0, y: 0, z: 2, rotationY: 0 },       // Projects - Close
  { x: 0, y: 0, z: 1, rotationY: 0 }        // Contact - Extreme close
];
```

**Best For**: Bold, attention-grabbing

---

## 🎬 Preset 8: Figure-8 Path

**Style**: Camera follows figure-8 pattern

```javascript
const cameraPositions = [
  { x: 0, y: 0, z: 5, rotationY: 0 },       // Home - Center
  { x: 3, y: 2, z: 4, rotationY: -0.6 },    // About - Top-right
  { x: -3, y: 0, z: 4, rotationY: 0.6 },    // Projects - Left
  { x: 0, y: -2, z: 5, rotationY: 0 }       // Contact - Bottom
];
```

**Best For**: Creative, artistic portfolios

---

## ⚙️ How to Apply Presets

1. Open `src/main.js`
2. Find the `cameraPositions` array (around line 160)
3. Replace with your chosen preset
4. Save and refresh browser
5. Adjust values if needed

---

## 🎛️ Fine-Tuning Guide

### Position (x, y, z)
- **x**: Negative = Left, Positive = Right
- **y**: Negative = Down, Positive = Up
- **z**: Smaller = Closer, Larger = Further

### Rotation (rotationY)
- **Negative**: Camera looks right
- **Positive**: Camera looks left
- **Range**: -1.5 to 1.5 (radians)

### Example Adjustments:
```javascript
// Too far? Decrease z
{ x: 0, y: 0, z: 3 }  // Instead of z: 5

// Want side view? Increase x and rotationY
{ x: 5, y: 0, z: 4, rotationY: -0.8 }

// Want top-down? Increase y
{ x: 0, y: 5, z: 5, rotationY: 0 }
```

---

## 🎯 Scroll Speed Presets

### Fast (Snappy)
```javascript
scrub: 0.5
```

### Medium (Default)
```javascript
scrub: 1.5
```

### Slow (Cinematic)
```javascript
scrub: 3
```

### Very Slow (Dramatic)
```javascript
scrub: 5
```

---

## 🎨 Easing Presets

Replace `ease: 'power2.inOut'` with:

### Smooth & Natural
```javascript
ease: 'power2.inOut'  // Default
```

### Bouncy
```javascript
ease: 'back.inOut'
```

### Elastic
```javascript
ease: 'elastic.inOut'
```

### Linear (No easing)
```javascript
ease: 'none'
```

### Slow Start, Fast End
```javascript
ease: 'power4.in'
```

### Fast Start, Slow End
```javascript
ease: 'power4.out'
```

---

## 💡 Pro Tips

1. **Test on scroll**: Scroll slowly to see full effect
2. **Match content**: Dramatic for creative, subtle for corporate
3. **Mobile first**: Test on mobile devices
4. **Combine presets**: Mix position + speed + easing
5. **Less is more**: Subtle movements often work best

---

## 🐛 Troubleshooting

**Camera moves too fast?**
- Increase `scrub` value (try 3 or 5)

**Camera moves too slow?**
- Decrease `scrub` value (try 0.5 or 1)

**Camera position feels wrong?**
- Adjust z value first (distance)
- Then adjust x/y (position)
- Finally adjust rotationY (angle)

**Scroll feels choppy?**
- Check browser performance
- Reduce particle count
- Try different easing

---

## 🎬 Recommended Combinations

### For Tech Portfolio (Professional)
- Preset: **Subtle Shift**
- Speed: **Medium** (scrub: 1.5)
- Easing: **power2.inOut**

### For Creative Portfolio (Bold)
- Preset: **Spiral Descent**
- Speed: **Fast** (scrub: 0.5)
- Easing: **back.inOut**

### For Product Showcase (Elegant)
- Preset: **Smooth Zoom**
- Speed: **Slow** (scrub: 3)
- Easing: **power4.inOut**

### For Agency Portfolio (Dynamic)
- Preset: **Dramatic Orbit**
- Speed: **Medium** (scrub: 1.5)
- Easing: **elastic.inOut**

---

**Experiment and find your perfect camera movement! 🎥**
