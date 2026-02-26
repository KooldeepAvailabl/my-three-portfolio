# 🎥 Camera Movement Visual Guide

## 📍 Default Camera Path

```
                    CONTACT (Section 4)
                    Camera: (0, 2, 6)
                    Zoom out + elevated
                         ↑
                         |
                         |
    ABOUT (Section 2)    |    PROJECTS (Section 3)
    Camera: (3, 1, 4)    |    Camera: (-2, -1, 3)
    Side angle right ----+---- Side angle left + zoom
                         |
                         |
                         ↓
                    HOME (Section 1)
                    Camera: (0, 0, 5)
                    Front view center
```

## 🎬 Camera Movement Flow

### Section 1: HOME
```
Position: (0, 0, 5)
Rotation: 0°

     [Camera]
        |
        | 5 units away
        ↓
    [3D Model]
```

### Section 2: ABOUT
```
Position: (3, 1, 4)
Rotation: -0.3 rad (~-17°)

        [3D Model]
       ↙
      /  4 units away
     /   1 unit up
[Camera] 3 units right
```

### Section 3: PROJECTS
```
Position: (-2, -1, 3)
Rotation: 0.4 rad (~23°)

[Camera] 2 units left
     \   1 unit down
      \  3 units away (CLOSER!)
       ↘
        [3D Model]
```

### Section 4: CONTACT
```
Position: (0, 2, 6)
Rotation: 0°

[Camera] 2 units up
    |    6 units away (FAR)
    ↓
[3D Model]
```

## 📊 Distance Comparison

```
Closest:  Projects (z=3)  ████████
Medium:   About (z=4)     ██████████
Default:  Home (z=5)      ████████████
Farthest: Contact (z=6)   ██████████████
```

## 🎯 Coordinate System

```
        +Y (Up)
         |
         |
         |
-X ------+------ +X (Right)
(Left)   |
         |
         |
        -Y (Down)

+Z = Away from screen
-Z = Toward screen
```

## 🔄 Rotation Guide

```
rotationY = 0      (Looking straight)
    ↓
[Camera] → [Model]


rotationY = -0.3   (Looking right)
    ↓
[Camera] ↗ [Model]


rotationY = 0.4    (Looking left)
    ↓
[Camera] ↖ [Model]
```

## 🎬 Animation Timeline

```
Scroll Progress: 0% -------- 25% -------- 50% -------- 75% -------- 100%
                 |           |            |            |            |
Section:        HOME       ABOUT      PROJECTS     CONTACT       END
                 |           |            |            |            |
Camera Z:        5    →      4     →      3     →      6           6
Camera X:        0    →      3     →     -2     →      0           0
Camera Y:        0    →      1     →     -1     →      2           2
```

## 💡 Understanding Scrub Value

```
scrub: 0.5 (Fast)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scroll: ████████████████████████████████████████████
Camera: ████████████████████████████████████████████
(Camera follows scroll immediately)


scrub: 1.5 (Default)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scroll: ████████████████████████████████████████████
Camera:     ████████████████████████████████████████
(Camera smoothly catches up)


scrub: 3.0 (Slow)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scroll: ████████████████████████████████████████████
Camera:         ████████████████████████████████████
(Camera lags behind, very cinematic)
```

## 🎨 Visual Effect Per Section

### HOME
```
┌─────────────────────────┐
│                         │
│         [Model]         │  ← Camera centered
│                         │
│      Front View         │
└─────────────────────────┘
```

### ABOUT
```
┌─────────────────────────┐
│    [Model]              │  ← Camera from right
│       ↙                 │
│  Side Angle             │
│                         │
└─────────────────────────┘
```

### PROJECTS
```
┌─────────────────────────┐
│              [Model]    │  ← Camera from left
│                 ↘       │     + ZOOMED IN
│            Close Up     │
│                         │
└─────────────────────────┘
```

### CONTACT
```
┌─────────────────────────┐
│                         │
│         [Model]         │  ← Camera elevated
│            ↓            │     + FAR AWAY
│       Wide View         │
└─────────────────────────┘
```

## 🎯 Quick Reference

| Section  | X  | Y  | Z | Rotation | Effect        |
|----------|----|----|---|----------|---------------|
| Home     | 0  | 0  | 5 | 0        | Center front  |
| About    | 3  | 1  | 4 | -0.3     | Right side    |
| Projects | -2 | -1 | 3 | 0.4      | Left zoom in  |
| Contact  | 0  | 2  | 6 | 0        | Top zoom out  |

## 🎬 Smooth Transition

```
Section 1 → Section 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Camera smoothly interpolates:
X: 0 → 1 → 2 → 3
Y: 0 → 0.5 → 1
Z: 5 → 4.5 → 4
Rotation: 0 → -0.15 → -0.3

(No sudden jumps, all smooth!)
```

## 💡 Pro Tips

1. **Z value** = Most important (controls zoom)
2. **X/Y values** = Fine-tune angle
3. **Rotation** = Adds cinematic feel
4. **Scrub** = Controls smoothness

## 🎨 Experiment Template

```javascript
// Copy this and experiment:
const cameraPositions = [
  { x: 0, y: 0, z: 5, rotationY: 0 },    // HOME
  { x: ?, y: ?, z: ?, rotationY: ? },    // ABOUT - Try: x=3, y=1, z=4
  { x: ?, y: ?, z: ?, rotationY: ? },    // PROJECTS - Try: x=-2, y=-1, z=3
  { x: ?, y: ?, z: ?, rotationY: ? }     // CONTACT - Try: x=0, y=2, z=6
];
```

**Happy experimenting! 🎥**
