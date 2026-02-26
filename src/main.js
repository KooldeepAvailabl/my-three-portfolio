import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

// ==================== SCENE SETUP ====================
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ==================== INTERACTIVE 3D NETWORK ====================
const networkGroup = new THREE.Group();
const nodes = [];
const connections = [];
const nodeCount = 50;

// Create network nodes
for (let i = 0; i < nodeCount; i++) {
  const geometry = new THREE.SphereGeometry(0.05, 16, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.8
  });
  const node = new THREE.Mesh(geometry, material);
  
  node.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 5
  );
  
  node.userData.velocity = new THREE.Vector3(
    (Math.random() - 0.5) * 0.02,
    (Math.random() - 0.5) * 0.02,
    (Math.random() - 0.5) * 0.01
  );
  
  nodes.push(node);
  networkGroup.add(node);
}

// Create connections between nearby nodes
function updateConnections() {
  connections.forEach(line => networkGroup.remove(line));
  connections.length = 0;
  
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const distance = nodes[i].position.distanceTo(nodes[j].position);
      if (distance < 2) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          nodes[i].position,
          nodes[j].position
        ]);
        const material = new THREE.LineBasicMaterial({
          color: 0x00d4ff,
          transparent: true,
          opacity: (2 - distance) / 2 * 0.3
        });
        const line = new THREE.Line(geometry, material);
        connections.push(line);
        networkGroup.add(line);
      }
    }
  }
}

scene.add(networkGroup);

// ==================== ROTATING CODE CUBE ====================
const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x00d4ff,
  wireframe: true,
  emissive: 0x00d4ff,
  emissiveIntensity: 0.5
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(3, 0, 0);
scene.add(cube);

// ==================== LIGHTING ====================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x00d4ff, 2);
pointLight1.position.set(5, 5, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x0099ff, 2);
pointLight2.position.set(-5, -5, 5);
scene.add(pointLight2);

// ==================== PARTICLES ====================
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 15;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  color: 0x00d4ff,
  transparent: true,
  opacity: 0.6,
  blending: THREE.AdditiveBlending
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// ==================== CONTACT SECTION ====================
const contactCanvas = document.querySelector('#contact-canvas');
if (contactCanvas) {
  const contactScene = new THREE.Scene();
  const contactCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  contactCamera.position.z = 5;
  
  const contactRenderer = new THREE.WebGLRenderer({ canvas: contactCanvas, alpha: true, antialias: true });
  contactRenderer.setSize(window.innerWidth, window.innerHeight);
  contactRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Rotating data visualization
  const dataVizGroup = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const ringGeometry = new THREE.TorusGeometry(1 + i * 0.3, 0.05, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      wireframe: true,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.5
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2 + (i * 0.1);
    ring.userData.speed = 0.001 * (i + 1);
    dataVizGroup.add(ring);
  }
  contactScene.add(dataVizGroup);
  
  const contactAmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
  contactScene.add(contactAmbientLight);
  
  const contactPointLight = new THREE.PointLight(0x00d4ff, 1);
  contactPointLight.position.set(0, 0, 5);
  contactScene.add(contactPointLight);
  
  function animateContact() {
    requestAnimationFrame(animateContact);
    dataVizGroup.children.forEach((ring, index) => {
      ring.rotation.z += ring.userData.speed;
      ring.position.y = Math.sin(Date.now() * 0.001 + index) * 0.2;
    });
    contactRenderer.render(contactScene, contactCamera);
  }
  animateContact();
}

// ==================== FOOTER SECTION ====================
const footerCanvas = document.querySelector('#footer-canvas');
if (footerCanvas) {
  const footerScene = new THREE.Scene();
  const footerCamera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
  footerCamera.position.z = 5;
  
  const footerRenderer = new THREE.WebGLRenderer({ canvas: footerCanvas, alpha: true, antialias: true });
  footerRenderer.setSize(window.innerWidth, 400);
  footerRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Binary rain effect
  const binaryParticles = new THREE.BufferGeometry();
  const binaryCount = 500;
  const binaryPos = new Float32Array(binaryCount * 3);
  for (let i = 0; i < binaryCount * 3; i += 3) {
    binaryPos[i] = (Math.random() - 0.5) * 10;
    binaryPos[i + 1] = Math.random() * 10;
    binaryPos[i + 2] = (Math.random() - 0.5) * 5;
  }
  binaryParticles.setAttribute('position', new THREE.BufferAttribute(binaryPos, 3));
  
  const binaryMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.8
  });
  const binaryMesh = new THREE.Points(binaryParticles, binaryMaterial);
  footerScene.add(binaryMesh);
  
  const footerLight = new THREE.AmbientLight(0xffffff, 0.5);
  footerScene.add(footerLight);
  
  function animateFooter() {
    requestAnimationFrame(animateFooter);
    const positions = binaryParticles.attributes.position.array;
    for (let i = 1; i < positions.length; i += 3) {
      positions[i] -= 0.02;
      if (positions[i] < -5) positions[i] = 5;
    }
    binaryParticles.attributes.position.needsUpdate = true;
    binaryMesh.rotation.y += 0.001;
    footerRenderer.render(footerScene, footerCamera);
  }
  animateFooter();
}

// ==================== MOUSE INTERACTION ====================
const mouse = { x: 0, y: 0 };
const targetRotation = { x: 0, y: 0 };

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  targetRotation.y = mouse.x * 0.5;
  targetRotation.x = mouse.y * 0.3;
});

// ==================== RAYCASTER FOR INTERACTION ====================
const raycaster = new THREE.Raycaster();
let hoveredNode = null;

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  raycaster.setFromCamera({ x, y }, camera);
  const intersects = raycaster.intersectObjects(nodes);
  
  if (intersects.length > 0) {
    const node = intersects[0].object;
    gsap.to(node.scale, { x: 2, y: 2, z: 2, duration: 0.3, yoyo: true, repeat: 1 });
    gsap.to(node.material, { opacity: 1, duration: 0.3, yoyo: true, repeat: 1 });
  }
});

// ==================== ANIMATION LOOP ====================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();
  
  // Update network nodes
  nodes.forEach(node => {
    node.position.add(node.userData.velocity);
    
    // Bounce off boundaries
    if (Math.abs(node.position.x) > 5) node.userData.velocity.x *= -1;
    if (Math.abs(node.position.y) > 5) node.userData.velocity.y *= -1;
    if (Math.abs(node.position.z) > 2.5) node.userData.velocity.z *= -1;
  });
  
  if (elapsedTime % 0.5 < 0.016) updateConnections();
  
  // Rotate cube
  cube.rotation.x = elapsedTime * 0.5;
  cube.rotation.y = elapsedTime * 0.3;
  
  // Smooth camera follow mouse
  camera.rotation.y += (targetRotation.y - camera.rotation.y) * 0.05;
  camera.rotation.x += (targetRotation.x - camera.rotation.x) * 0.05;
  
  // Rotate particles
  particlesMesh.rotation.y = elapsedTime * 0.05;
  
  // Network group rotation
  networkGroup.rotation.y += 0.001;
  
  renderer.render(scene, camera);
}

animate();

// ==================== GSAP ANIMATIONS ====================
gsap.to('.hero-content', {
  opacity: 1,
  y: 0,
  duration: 1.5,
  delay: 0.5,
  ease: 'power3.out'
});

gsap.from(camera.position, {
  z: 10,
  duration: 2,
  ease: 'power3.out'
});

// Section animations
gsap.utils.toArray('.section-title').forEach((title) => {
  gsap.to(title, {
    opacity: 1,
    y: 0,
    duration: 1,
    scrollTrigger: {
      trigger: title,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
});

gsap.to('.about-card', {
  opacity: 1,
  y: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.about-card',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

// Interactive skill items
document.querySelectorAll('.skill-item').forEach((skill, index) => {
  gsap.from(skill, {
    opacity: 0,
    scale: 0,
    duration: 0.5,
    delay: index * 0.05,
    scrollTrigger: {
      trigger: skill,
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  });
  
  skill.addEventListener('click', () => {
    gsap.to(skill, {
      rotation: 360,
      scale: 1.2,
      duration: 0.5,
      ease: 'back.out',
      onComplete: () => {
        gsap.to(skill, { rotation: 0, scale: 1, duration: 0.3 });
      }
    });
  });
});

// Project cards with 3D effect
gsap.to('.project-card', {
  opacity: 1,
  y: 0,
  duration: 0.8,
  stagger: 0.2,
  scrollTrigger: {
    trigger: '.projects-grid',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      y: -20,
      rotationY: 5,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

gsap.to('.contact-card', {
  opacity: 1,
  y: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.contact-card',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

// ==================== SCROLL EFFECTS ====================
let scrollY = window.scrollY;

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
  const scrollProgress = scrollY / window.innerHeight;
  
  networkGroup.position.y = -scrollProgress * 3;
  cube.position.y = -scrollProgress * 2;
  particlesMesh.position.y = -scrollProgress * 1.5;
});

// ==================== RESPONSIVE ====================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// CTA Button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
  ctaButton.addEventListener('click', () => {
    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
  });
}

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message!');
    contactForm.reset();
  });
}

console.log('🚀 Portfolio loaded with interactive 3D elements!');
