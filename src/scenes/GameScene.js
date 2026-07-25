// GameScene.js — Escena principal del juego

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.background = null;
    this.player = null;
    this.ground = null;
    this.obstacles = null;
    this.spawnEvent = null;
    this.speed = 100;
  }

  create() {
    const { width, height } = this.scale;

   

    // Grupo de obstáculos con física
    this.obstacles = this.physics.add.group();

      

    // Crear suelo invisible con física
    this.ground = this.physics.add.staticGroup();


  const ground = this.add.rectangle(
    width / 2,
    height - 145,
    width,
    40,
    0xffffff
  );

  this.physics.add.existing(ground, true);

  this.ground.add(ground);

   // Fondo con scroll infinito
    this.background = new Background(this);
     
    // Jugador apoyado sobre el suelo
  this.player = new Player(this, 150, height - 165);

  

  // Colisión jugador - suelo
  this.physics.add.collider(this.player, this.ground);

    // Spawner de obstáculos — cada 1.5 segundos
    this.spawnEvent = this.time.addEvent({
      delay: 1500,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    // Escuchar Space para saltar
    this.input.keyboard.on('keydown-SPACE', () => {
      this.player.jump();
    });

    // Texto de prueba para visualización
    this.add
      .text(width / 2, height / 2, 'GameScene - Presiona SPACE para empezar', {
        fontSize: '32px',
        fill: '#ffffff'
      })
      .setOrigin(0.5);
  }

  spawnObstacle() {
    const { width, height } = this.scale;
    const types = ['obstacle_cat', 'obstacle_pot', 'obstacle_trash'];
    const type = Phaser.Math.RND.pick(types);

    const obstacle = new Obstacle(this, width + 50, height - 50, type);
    this.obstacles.add(obstacle);
  }

  update(time, delta) {
    if (this.background) {
      this.background.update(this.speed, delta);
    }
    if (this.player) {
      this.player.update();
    }
    if (this.obstacles) {
      this.obstacles.getChildren().forEach(obstacle => {
        obstacle.update();
      });
    }
  }
}
