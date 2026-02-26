export class UI {
  constructor() {
    this.score = 0;
    this.scoreElement = document.getElementById('score');
  }
  
  addScore(points) {
    this.score += points;
    this.scoreElement.textContent = `Score: ${this.score}`;
  }
  
  updateHealth(health) {
    document.getElementById('health-fill').style.width = health + '%';
  }
  
  updateAmmo(current, max) {
    document.getElementById('ammo').textContent = `${current}/${max}`;
  }
}
