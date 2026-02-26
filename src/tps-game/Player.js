import * as THREE from 'three';

export class Player {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.position = new THREE.Vector3(0, 1, 0);
    this.velocity = new THREE.Vector3();
    this.rotation = new THREE.Euler(0, 0, 0, 'YXZ');
    this.keys = {};
    this.isRunning = false;
    this.health = 100;
    
    this.createCharacter();
    this.createGun();
    this.setupControls();
    
    this.cameraOffset = new THREE.Vector3(0, 2, 5);
    this.cameraLookOffset = new THREE.Vector3(0, 1.5, 0);
  }
  
  createCharacter() {
    const geometry = new THREE.CapsuleGeometry(0.5, 1.5, 8, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.position.copy(this.position);
    this.scene.add(this.mesh);
  }
  
  createGun() {
    this.gun = new THREE.Group();
    
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8),
      new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8 })
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.4, 0, -0.4);
    
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.15, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7 })
    );
    body.position.set(0.1, 0, 0);
    
    this.gun.add(barrel, body);
    this.gun.position.set(0.3, -0.2, -0.5);
    this.camera.add(this.gun);
    this.scene.add(this.camera);
  }
  
  setupControls() {
    document.addEventListener('keydown', (e) => this.keys[e.key.toLowerCase()] = true);
    document.addEventListener('keyup', (e) => this.keys[e.key.toLowerCase()] = false);
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
  }
  
  onMouseMove(event) {
    const sensitivity = 0.002;
    this.rotation.y -= event.movementX * sensitivity;
    this.rotation.x -= event.movementY * sensitivity;
    this.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, this.rotation.x));
  }
  
  shoot() {
    this.gun.position.z = -0.4;
    setTimeout(() => this.gun.position.z = -0.5, 100);
    
    const muzzleFlash = new THREE.PointLight(0xffaa00, 3, 5);
    muzzleFlash.position.set(0.5, 0, -0.5);
    this.camera.add(muzzleFlash);
    setTimeout(() => this.camera.remove(muzzleFlash), 50);
    
    const direction = new THREE.Vector3();
    this.camera.getWorldDirection(direction);
    
    return {
      mesh: new THREE.Mesh(
        new THREE.SphereGeometry(0.05),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })
      ),
      position: this.camera.position.clone(),
      direction: direction,
      speed: 50,
      life: 0
    };
  }
  
  update(delta) {
    this.isRunning = this.keys['shift'];
    const speed = this.isRunning ? 8 : 4;
    
    const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, this.rotation.y, 0));
    const right = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, this.rotation.y, 0));
    
    this.velocity.set(0, 0, 0);
    
    if (this.keys['w']) this.velocity.add(forward);
    if (this.keys['s']) this.velocity.sub(forward);
    if (this.keys['d']) this.velocity.add(right);
    if (this.keys['a']) this.velocity.sub(right);
    
    if (this.velocity.length() > 0) {
      this.velocity.normalize().multiplyScalar(speed * delta);
      this.position.add(this.velocity);
    }
    
    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = this.rotation.y;
    
    const offset = this.cameraOffset.clone().applyEuler(new THREE.Euler(0, this.rotation.y, 0));
    this.camera.position.copy(this.position).add(offset);
    
    const lookAt = this.position.clone().add(this.cameraLookOffset);
    this.camera.lookAt(lookAt);
    this.camera.rotation.x += this.rotation.x;
  }
  
  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
    document.getElementById('health-fill').style.width = this.health + '%';
  }
}
