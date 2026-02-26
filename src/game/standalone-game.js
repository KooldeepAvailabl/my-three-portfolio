import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

class StandaloneGame {
  constructor() {
    this.score = 0;
    this.enemies = [];
    this.bullets = [];
    this.particles = [];
    this.moveSpeed = 0.15;
    this.keys = {};
    this.velocity = new THREE.Vector3();
    this.isGameStarted = false;
    
    this.showLoadingScreen();
  }
  
  showLoadingScreen() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          document.getElementById('loading-screen').classList.add('hidden');
          document.getElementById('start-screen').classList.remove('hidden');
          this.setupStartButton();
        }, 500);
      }
      document.getElementById('progress-bar').style.width = progress + '%';
      document.getElementById('loading-text').textContent = `Loading... ${Math.floor(progress)}%`;
    }, 100);
  }
  
  setupStartButton() {
    document.getElementById('play-btn').addEventListener('click', () => {
      this.startGame();
    });
    
    document.getElementById('exit-btn').addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
  
  startGame() {
    document.getElementById('start-screen').style.transition = 'opacity 1s';
    document.getElementById('start-screen').classList.add('hidden');
    
    setTimeout(() => {
      this.init();
      this.cinematicEntry();
    }, 500);
  }
  
  cinematicEntry() {
    // Fade in game UI
    setTimeout(() => {
      document.getElementById('game-ui').classList.add('visible');
    }, 1000);
    
    // Camera animation
    this.camera.position.set(0, 5, 10);
    this.camera.lookAt(0, 0, 0);
    
    const targetPos = { x: 0, y: 1.6, z: 0 };
    const duration = 2000;
    const startTime = Date.now();
    
    const animateEntry = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      
      this.camera.position.y = 5 + (targetPos.y - 5) * eased;
      this.camera.position.z = 10 + (targetPos.z - 10) * eased;
      
      if (progress < 1) {
        requestAnimationFrame(animateEntry);
      } else {
        this.isGameStarted = true;
      }
    };
    
    animateEntry();
  }
  
  init() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.Fog(0x87ceeb, 0, 100);
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.y = 1.6;
    
    // Renderer
    this.canvas = document.getElementById('game-canvas');
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    
    // Controls
    this.controls = new PointerLockControls(this.camera, this.canvas);
    
    this.canvas.addEventListener('click', () => {
      if (this.isGameStarted) {
        this.controls.lock();
      }
    });
    
    this.controls.addEventListener('lock', () => {
      document.getElementById('instructions').classList.add('hidden');
    });
    
    this.controls.addEventListener('unlock', () => {
      document.getElementById('instructions').classList.remove('hidden');
    });
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    this.scene.add(dirLight);
    
    // Ground
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x228b22, roughness: 0.8 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
    
    // Skybox
    const skyGeo = new THREE.SphereGeometry(500, 32, 32);
    const skyMat = new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.BackSide });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(sky);
    
    // Gun
    this.createGun();
    
    // Input
    this.setupInput();
    
    // Spawn enemies
    this.spawnEnemies();
    setInterval(() => this.spawnEnemies(), 2000);
    
    // Resize
    window.addEventListener('resize', () => this.onResize());
    
    // Clock
    this.clock = new THREE.Clock();
    
    // Start
    this.animate();
  }
  
  createGun() {
    this.gun = new THREE.Group();
    
    const barrelGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 16);
    const gunMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.2 });
    const barrel = new THREE.Mesh(barrelGeo, gunMat);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.z = -0.3;
    
    const bodyGeo = new THREE.BoxGeometry(0.15, 0.1, 0.3);
    const body = new THREE.Mesh(bodyGeo, gunMat);
    body.position.z = 0.05;
    
    const handleGeo = new THREE.BoxGeometry(0.08, 0.2, 0.08);
    const handle = new THREE.Mesh(handleGeo, gunMat);
    handle.position.y = -0.15;
    handle.position.z = 0.1;
    
    this.gun.add(barrel, body, handle);
    this.gun.position.set(0.3, -0.3, -0.5);
    this.camera.add(this.gun);
    this.scene.add(this.camera);
  }
  
  setupInput() {
    document.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });
    
    document.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
    
    document.addEventListener('click', () => {
      if (this.controls.isLocked && this.isGameStarted) {
        this.shoot();
      }
    });
  }
  
  shoot() {
    // Gun recoil
    this.gun.position.z = -0.4;
    this.gun.rotation.x = 0.1;
    setTimeout(() => {
      this.gun.position.z = -0.5;
      this.gun.rotation.x = 0;
    }, 100);
    
    // Muzzle flash
    this.createMuzzleFlash();
    
    // Bullet
    const bulletGeo = new THREE.SphereGeometry(0.05);
    const bulletMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const bullet = new THREE.Mesh(bulletGeo, bulletMat);
    
    bullet.position.copy(this.camera.position);
    bullet.userData.direction = new THREE.Vector3();
    this.camera.getWorldDirection(bullet.userData.direction);
    bullet.userData.speed = 1;
    bullet.userData.life = 0;
    
    const trailGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
    const trailMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.6 });
    const trail = new THREE.Mesh(trailGeo, trailMat);
    trail.rotation.z = Math.PI / 2;
    bullet.add(trail);
    
    this.scene.add(bullet);
    this.bullets.push(bullet);
  }
  
  createMuzzleFlash() {
    const flashGeo = new THREE.SphereGeometry(0.1);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.8 });
    const flash = new THREE.Mesh(flashGeo, flashMat);
    
    flash.position.copy(this.camera.position);
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    flash.position.add(dir.multiplyScalar(0.5));
    
    this.scene.add(flash);
    setTimeout(() => this.scene.remove(flash), 50);
  }
  
  createImpactEffect(position) {
    for (let i = 0; i < 10; i++) {
      const particleGeo = new THREE.SphereGeometry(0.02);
      const particleMat = new THREE.MeshBasicMaterial({ color: 0xff4400, transparent: true, opacity: 1 });
      const particle = new THREE.Mesh(particleGeo, particleMat);
      
      particle.position.copy(position);
      particle.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.2,
        Math.random() * 0.2,
        (Math.random() - 0.5) * 0.2
      );
      particle.userData.life = 0;
      
      this.scene.add(particle);
      this.particles.push(particle);
    }
  }
  
  createDeathEffect(position) {
    for (let i = 0; i < 20; i++) {
      const smokeGeo = new THREE.SphereGeometry(0.1);
      const smokeMat = new THREE.MeshBasicMaterial({ color: 0x555555, transparent: true, opacity: 0.5 });
      const smoke = new THREE.Mesh(smokeGeo, smokeMat);
      
      smoke.position.copy(position);
      smoke.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        Math.random() * 0.15,
        (Math.random() - 0.5) * 0.1
      );
      smoke.userData.life = 0;
      
      this.scene.add(smoke);
      this.particles.push(smoke);
    }
  }
  
  spawnEnemies() {
    if (!this.isGameStarted || this.enemies.length >= 15) return;
    
    const enemyGeo = new THREE.BoxGeometry(1, 1, 1);
    const enemyMat = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0x440000 });
    const enemy = new THREE.Mesh(enemyGeo, enemyMat);
    enemy.castShadow = true;
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 20;
    enemy.position.set(Math.cos(angle) * distance, 0.5, Math.sin(angle) * distance);
    
    enemy.userData.speed = 0.03 + Math.random() * 0.02;
    enemy.userData.health = 1;
    
    this.scene.add(enemy);
    this.enemies.push(enemy);
  }
  
  updateEnemies() {
    this.enemies.forEach(enemy => {
      const direction = new THREE.Vector3()
        .subVectors(this.camera.position, enemy.position)
        .normalize();
      
      enemy.position.add(direction.multiplyScalar(enemy.userData.speed));
      enemy.rotation.y += 0.05;
    });
  }
  
  updateBullets() {
    this.bullets.forEach((bullet, index) => {
      bullet.position.add(bullet.userData.direction.clone().multiplyScalar(bullet.userData.speed));
      bullet.userData.life += 0.016;
      
      if (bullet.userData.life > 3) {
        this.scene.remove(bullet);
        this.bullets.splice(index, 1);
      }
    });
  }
  
  updateParticles() {
    this.particles.forEach((particle, index) => {
      particle.position.add(particle.userData.velocity);
      particle.userData.velocity.y -= 0.005;
      particle.userData.life += 0.016;
      particle.material.opacity -= 0.02;
      
      if (particle.userData.life > 1 || particle.material.opacity <= 0) {
        this.scene.remove(particle);
        this.particles.splice(index, 1);
      }
    });
  }
  
  checkCollisions() {
    this.bullets.forEach((bullet, bIndex) => {
      this.enemies.forEach((enemy, eIndex) => {
        if (bullet.position.distanceTo(enemy.position) < 0.7) {
          this.createImpactEffect(enemy.position);
          this.scene.remove(bullet);
          this.bullets.splice(bIndex, 1);
          
          enemy.userData.health -= 1;
          
          if (enemy.userData.health <= 0) {
            this.createDeathEffect(enemy.position);
            this.scene.remove(enemy);
            this.enemies.splice(eIndex, 1);
            
            this.score += 10;
            document.getElementById('score').textContent = `Score: ${this.score}`;
          }
        }
      });
    });
  }
  
  updateMovement() {
    if (!this.controls.isLocked || !this.isGameStarted) return;
    
    const delta = this.clock.getDelta();
    
    this.velocity.x -= this.velocity.x * 10 * delta;
    this.velocity.z -= this.velocity.z * 10 * delta;
    
    const direction = new THREE.Vector3();
    
    if (this.keys['w']) direction.z = 1;
    if (this.keys['s']) direction.z = -1;
    if (this.keys['a']) direction.x = 1;
    if (this.keys['d']) direction.x = -1;
    
    if (direction.length() > 0) {
      direction.normalize();
      
      if (this.keys['w'] || this.keys['s']) {
        this.velocity.z -= direction.z * this.moveSpeed * delta * 100;
      }
      if (this.keys['a'] || this.keys['d']) {
        this.velocity.x -= direction.x * this.moveSpeed * delta * 100;
      }
    }
    
    this.controls.moveRight(-this.velocity.x * delta);
    this.controls.moveForward(-this.velocity.z * delta);
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    
    if (this.isGameStarted) {
      this.updateMovement();
      this.updateEnemies();
      this.updateBullets();
      this.updateParticles();
      this.checkCollisions();
    }
    
    this.renderer.render(this.scene, this.camera);
  }
  
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

// Initialize game
new StandaloneGame();
