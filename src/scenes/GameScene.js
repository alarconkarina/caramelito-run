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
    // Progressive difficulty
    this.spawnDelay = 2000;      // Initial delay in ms
    this.minSpawnDelay = 700;    // Minimum delay to keep game playable
    this.delayReduction = 100;   // How much to reduce per spawn
    // Start screen state
    this.gameStarted = false;
    this.startText = null;
    // Game state
    this.score = 0;
    this.scoreText = null;
    this.gameOver = false;
    this.startTime = 0;
    this.gameDuration = 0;
  }

  create() {
    const { width, height } = this.scale;

    // Suelo (visible para depuración)
this.ground = this.add.rectangle(
  width / 2,
  height - 145,
  width,
  40,
  0xffffff
);

// Agregar física estática
this.physics.add.existing(this.ground, true);


   // Fondo con scroll infinito
    this.background = new Background(this);
     
    // Jugador apoyado sobre el suelo
  this.player = new Player(this, 150, height - 165);

   // Grupo de obstáculos con física
    this.obstacles = this.physics.add.group();

      

  // Colisión jugador/obstaculos - suelo
  this.physics.add.collider(this.player, this.ground);
  this.physics.add.collider(this.obstacles, this.ground);

    // Texto de inicio - mostrar antes de que arranque el juego
    this.startText = this.add
      .text(width / 2, height / 2, 'Presiona SPACE para empezar', {
        fontSize: '32px',
        fill: '#ffffff'
      })
      .setOrigin(0.5);

    // Escuchar Space para iniciar el juego
    this.input.keyboard.on('keydown-SPACE', () => {
      if (!this.gameStarted) {
        this.gameStarted = true;
        this.startText.setVisible(false);
        // Iniciar spawner de obstáculos
        this.startSpawner(this.spawnDelay);
        // Registrar tiempo de inicio para score
        this.startTime = this.time.now;
        // Mostrar texto de score
        this.createScoreText();
      } else if (!this.gameOver) {
        // Si el juego ya empezó y no está game over, el jugador salta
        this.player.jump();
      }
    });

    // Registrar colisión entre jugador y obstáculos
    this.physics.add.overlap(this.player, this.obstacles, this.onHit, null, this);
  }

  createScoreText() {
    const { width } = this.scale;
    this.scoreText = this.add.text(width - 20, 20, `Score: ${this.score}`, {
      fontSize: '24px',
      fill: '#ffffff',
      fontFamily: 'Courier'
    })
    .setOrigin(1, 0)
    .setDepth(100);
  }

  onHit(player, obstacle) {
    if (this.gameOver) return; // Evitar múltiples game overs
    
    this.gameOver = true;
    
    // Reproducir sonido de game over
    if (this.sound.get('gameover')) {
      this.sound.play('gameover');
    }
    
    // Calcular score final (segundos de supervivencia × 10)
    this.gameDuration = (this.time.now - this.startTime) / 1000;
    this.score = Math.floor(this.gameDuration * 10);
    
    // Detener spawn de obstáculos
    if (this.spawnEvent) {
      this.spawnEvent.remove();
    }
    
    // Detener movimiento de obstáculos
    this.obstacles.getChildren().forEach(obstacle => {
      if (obstacle.active) {
        obstacle.setVelocityX(0);
      }
    });
    
    // Detener fondo
    if (this.background) {
      this.speed = 0; // Esto hará que el fondo deje de moverse en el update
    }
    
    // Mostrar mensaje de game over
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2, 'GAME OVER', {
      fontSize: '48px',
      fill: '#ff0000',
      fontFamily: 'Courier'
    })
    .setOrigin(0.5)
    .setDepth(100);
    
    // Guardar high score en localStorage
    const storedHighScore = localStorage.getItem('caramelito_highscore');
    const currentHighScore = storedHighScore ? parseInt(storedHighScore, 10) : 0;
    const newHighScore = Math.max(this.score, currentHighScore);
    localStorage.setItem('caramelito_highscore', newHighScore.toString());
    
    // Esperar 2 segundos antes de cambiar escena
    this.time.delayedCall(2000, () => {
      this.scene.start('GameOverScene', { score: this.score, highScore: newHighScore });
    });
  }

  spawnObstacle() {
    const { width, height } = this.scale;
    const types = ['obstacle_cat', 'obstacle_pot', 'obstacle_trash'];
    const type = Phaser.Math.RND.pick(types);

    console.log("Spawn obstáculo:", type);

    const obstacle = new Obstacle (this, width - 150, height -190, type);
    console.log("Después del constructor:", obstacle.body.velocity.x);

    this.obstacles.add(obstacle);

// El grupo resetea el body, así que restauramos la configuración
obstacle.body.setAllowGravity(false);
obstacle.setVelocityX(-300);

console.log("Después de agregar al grupo:", obstacle.body.velocity.x);


    console.log(this.obstacles);

    // Reducir delay para el próximo spawn (dificultad progresiva)
    this.spawnDelay = Math.max(
      this.minSpawnDelay,
      this.spawnDelay - this.delayReduction
    );
  }

  startSpawner(delay) {
    // Crear un timer que se ejecuta una vez y se recrea con nuevo delay
    this.spawnEvent = this.time.addEvent({
      delay: delay,
      callback: this.onSpawnComplete,
      callbackScope: this,
      loop: false
    });
  }

  onSpawnComplete() {
    // Ejecutar spawn
    this.spawnObstacle();
    // Programar siguiente spawn con delay reducido
    this.startSpawner(this.spawnDelay);
  }

  update(time, delta) {
    // Actualizar background
    if (this.background) {
      this.background.update(this.speed, delta);
    }
    
    // Actualizar jugador
    if (this.player) {
      this.player.update();
    }
    
    // Actualizar obstáculos
    if (this.obstacles) {
      this.obstacles.getChildren().forEach(obstacle => {
        obstacle.update();
      });
    }
    
    // Actualizar score en tiempo real
    if (this.gameStarted && !this.gameOver && this.startTime > 0 && this.scoreText) {
      const currentDuration = (this.time.now - this.startTime) / 1000;
      const newScore = Math.floor(currentDuration * 10);
      if (newScore !== this.score) {
        this.score = newScore;
        this.scoreText.setText(`Score: ${this.score}`);
      }
    }
  }
}
