import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export class ShooterGame {
  constructor(container) {
    this.container = container;
    this.score = 0;
    this.enemies = [];
    this.bullets = [];
    this.moveSpeed = 0.1;
    this.keys = {};
    
    this.init();
  }
  
  init() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.Fog(0x87ceeb, 0, 50);
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.y = 1.6;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);
    
    // Controls
    this.controls = new PointerLockControls(this.camera, this.renderer.domElement);
    
    this.container.addEventListener('click', () => {
      this.controls.lock();
      document.getElementById('game-instructions').style.display = 'none';
    });
    
    this.controls.addEventListener('unlock', () => {
      document.getElementById('game-instructions').style.display = 'block';
    });
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    this.scene.add(dirLight);
    
    // Ground
    const groundGeo = new THREE.PlaneGeometry(100, 100);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);
    
    // Gun
    this.createGun();
    
    // Input
    this.setupInput();
    
    // Spawn enemies
    this.spawnEnemies();
    setInterval(() => this.spawnEnemies(), 3000);
    
    // Resize
    window.addEventListener('resize', () => this.onResize());
    
    // Start
    this.animate();
  }
  
  createGun() {
    this.gun = new THREE.Group();
    
    const barrelGeo = new THREE.BoxGeometry(0.05, 0.05, 0.5);
    const gunMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const barrel = new THREE.Mesh(barrelGeo, gunMat);
    barrel.position.z = -0.25;
    
    const handleGeo = new THREE.BoxGeometry(0.08, 0.15, 0.08);
    const handle = new THREE.Mesh(handleGeo, gunMat);
    handle.position.y = -0.1;
    handle.position.z = 0.1;
    
    this.gun.add(barrel, handle);
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
      if (this.controls.isLocked) {
        this.shoot();
      }
    });
  }
  
  shoot() {
    // Gun recoil
    this.gun.position.z = -0.4;
    setTimeout(() => { this.gun.position.z = -0.5; }, 100);
    
    // Create bullet
    const bulletGeo = new THREE.SphereGeometry(0.05);
    const bulletMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const bullet = new THREE.Mesh(bulletGeo, bulletMat);
    
    bullet.position.copy(this.camera.position);
    bullet.userData.direction = new THREE.Vector3();
    this.camera.getWorldDirection(bullet.userData.direction);
    bullet.userData.speed = 0.5;
    
    this.scene.add(bullet);
    this.bullets.push(bullet);
    
    // Remove bullet after 2 seconds
    setTimeout(() => {
      this.scene.remove(bullet);
      this.bullets = this.bullets.filter(b => b !== bullet);
    }, 2000);
  }
  
  spawnEnemies() {
    if (this.enemies.length >= 10) return;
    
    const enemyGeo = new THREE.BoxGeometry(1, 1, 1);
    const enemyMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const enemy = new THREE.Mesh(enemyGeo, enemyMat);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 15 + Math.random() * 10;
    enemy.position.set(
      Math.cos(angle) * distance,
      0.5,
      Math.sin(angle) * distance
    );
    
    enemy.userData.speed = 0.02 + Math.random() * 0.02;
    
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
    this.bullets.forEach(bullet => {
      bullet.position.add(
        bullet.userData.direction.clone().multiplyScalar(bullet.userData.speed)
      );
    });
  }
  
  checkCollisions() {
    this.bullets.forEach(bullet => {
      this.enemies.forEach(enemy => {
        if (bullet.position.distanceTo(enemy.position) < 0.6) {
          this.scene.remove(bullet);
          this.scene.remove(enemy);
          this.bullets = this.bullets.filter(b => b !== bullet);
          this.enemies = this.enemies.filter(e => e !== enemy);
          
          this.score += 10;
          document.getElementById('score').textContent = `Score: ${this.score}`;
        }
      });
    });
  }
  
  updateMovement() {
    if (!this.controls.isLocked) return;
    
    const direction = new THREE.Vector3();
    
    if (this.keys['w']) direction.z -= 1;
    if (this.keys['s']) direction.z += 1;
    if (this.keys['a']) direction.x -= 1;
    if (this.keys['d']) direction.x += 1;
    
    if (direction.length() > 0) {
      direction.normalize();
      
      const forward = new THREE.Vector3();
      this.camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();
      
      const right = new THREE.Vector3();
      right.crossVectors(forward, new THREE.Vector3(0, 1, 0));
      
      const movement = new THREE.Vector3();
      movement.add(forward.multiplyScalar(-direction.z));
      movement.add(right.multiplyScalar(direction.x));
      movement.multiplyScalar(this.moveSpeed);
      
      this.camera.position.add(movement);
    }
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    
    this.updateMovement();
    this.updateEnemies();
    this.updateBullets();
    this.checkCollisions();
    
    this.renderer.render(this.scene, this.camera);
  }
  
  onResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }
  
  destroy() {
    this.renderer.dispose();
    this.container.removeChild(this.renderer.domElement);
  }
}
