import * as THREE from 'three';

export class Enemy {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.health = 100;
    this.isDead = false;
    this.speed = 2;
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 15 + Math.random() * 10;
    this.position = new THREE.Vector3(
      Math.cos(angle) * distance,
      1,
      Math.sin(angle) * distance
    );
    
    this.createMesh();
  }
  
  createMesh() {
    const geometry = new THREE.CapsuleGeometry(0.5, 1.5, 8, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.position.copy(this.position);
    this.scene.add(this.mesh);
  }
  
  update(delta) {
    if (this.isDead) return;
    
    const direction = new THREE.Vector3()
      .subVectors(this.player.position, this.position)
      .normalize();
    
    const distance = this.position.distanceTo(this.player.position);
    
    if (distance > 3) {
      this.position.add(direction.multiplyScalar(this.speed * delta));
      this.mesh.position.copy(this.position);
    } else if (distance < 2) {
      this.player.takeDamage(10 * delta);
    }
    
    this.mesh.lookAt(this.player.position);
  }
  
  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    }
  }
  
  die() {
    this.isDead = true;
    this.mesh.material.color.setHex(0x444444);
    this.mesh.scale.y = 0.1;
  }
}
