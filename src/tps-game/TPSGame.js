import * as THREE from 'three';
import { Player } from './Player.js';
import { Enemy } from './Enemy.js';
import { Environment } from './Environment.js';
import { UI } from './UI.js';

class TPSGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x87ceeb, 10, 100);
    
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    this.clock = new THREE.Clock();
    this.enemies = [];
    this.bullets = [];
    
    this.init();
  }
  
  init() {
    this.environment = new Environment(this.scene);
    this.player = new Player(this.scene, this.camera);
    this.ui = new UI();
    
    this.spawnEnemies();
    setInterval(() => this.spawnEnemies(), 5000);
    
    window.addEventListener('resize', () => this.onResize());
    document.addEventListener('click', () => this.shoot());
    
    this.animate();
  }
  
  spawnEnemies() {
    if (this.enemies.length < 10) {
      const enemy = new Enemy(this.scene, this.player);
      this.enemies.push(enemy);
    }
  }
  
  shoot() {
    const bullet = this.player.shoot();
    if (bullet) {
      this.bullets.push(bullet);
      this.scene.add(bullet.mesh);
    }
  }
  
  update(delta) {
    this.player.update(delta);
    
    this.enemies.forEach((enemy, i) => {
      enemy.update(delta);
      if (enemy.isDead) {
        this.scene.remove(enemy.mesh);
        this.enemies.splice(i, 1);
        this.ui.addScore(10);
      }
    });
    
    this.bullets.forEach((bullet, i) => {
      bullet.position.add(bullet.direction.clone().multiplyScalar(bullet.speed * delta));
      bullet.mesh.position.copy(bullet.position);
      bullet.life += delta;
      
      if (bullet.life > 3) {
        this.scene.remove(bullet.mesh);
        this.bullets.splice(i, 1);
        return;
      }
      
      this.enemies.forEach(enemy => {
        if (bullet.position.distanceTo(enemy.position) < 1) {
          enemy.takeDamage(50);
          this.scene.remove(bullet.mesh);
          this.bullets.splice(i, 1);
          this.createImpact(bullet.position);
        }
      });
    });
  }
  
  createImpact(position) {
    const flash = new THREE.PointLight(0xff4400, 2, 5);
    flash.position.copy(position);
    this.scene.add(flash);
    setTimeout(() => this.scene.remove(flash), 100);
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    const delta = this.clock.getDelta();
    this.update(delta);
    this.renderer.render(this.scene, this.camera);
  }
  
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

new TPSGame();
