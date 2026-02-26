import * as THREE from 'three';

export class Environment {
  constructor(scene) {
    this.scene = scene;
    this.createLighting();
    this.createGround();
    this.createSky();
    this.createBuildings();
  }
  
  createLighting() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambient);
    
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(50, 100, 50);
    sun.castShadow = true;
    sun.shadow.camera.left = -50;
    sun.shadow.camera.right = 50;
    sun.shadow.camera.top = 50;
    sun.shadow.camera.bottom = -50;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    this.scene.add(sun);
    
    const hemi = new THREE.HemisphereLight(0x87ceeb, 0x545454, 0.5);
    this.scene.add(hemi);
  }
  
  createGround() {
    const geometry = new THREE.PlaneGeometry(200, 200);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x3a5f3a,
      roughness: 0.8
    });
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
    
    const gridHelper = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
    gridHelper.material.opacity = 0.1;
    gridHelper.material.transparent = true;
    this.scene.add(gridHelper);
  }
  
  createSky() {
    const skyGeo = new THREE.SphereGeometry(500, 32, 32);
    const skyMat = new THREE.MeshBasicMaterial({ 
      color: 0x87ceeb,
      side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(sky);
  }
  
  createBuildings() {
    const positions = [
      { x: 20, z: 20 }, { x: -20, z: 20 }, { x: 20, z: -20 }, { x: -20, z: -20 },
      { x: 30, z: 0 }, { x: -30, z: 0 }, { x: 0, z: 30 }, { x: 0, z: -30 }
    ];
    
    positions.forEach(pos => {
      const height = 5 + Math.random() * 10;
      const width = 3 + Math.random() * 3;
      
      const geometry = new THREE.BoxGeometry(width, height, width);
      const material = new THREE.MeshStandardMaterial({ 
        color: 0x808080,
        roughness: 0.7
      });
      const building = new THREE.Mesh(geometry, material);
      building.position.set(pos.x, height / 2, pos.z);
      building.castShadow = true;
      building.receiveShadow = true;
      this.scene.add(building);
      
      const roof = new THREE.Mesh(
        new THREE.BoxGeometry(width + 0.5, 0.5, width + 0.5),
        new THREE.MeshStandardMaterial({ color: 0x654321 })
      );
      roof.position.set(pos.x, height + 0.25, pos.z);
      roof.castShadow = true;
      this.scene.add(roof);
    });
    
    for (let i = 0; i < 20; i++) {
      const wall = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 0.3),
        new THREE.MeshStandardMaterial({ color: 0x8b7355 })
      );
      wall.position.set(
        (Math.random() - 0.5) * 80,
        1,
        (Math.random() - 0.5) * 80
      );
      wall.rotation.y = Math.random() * Math.PI;
      wall.castShadow = true;
      wall.receiveShadow = true;
      this.scene.add(wall);
    }
  }
}
