// GameOverScene.js — Pantalla de Game Over

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create(data) {
    const { width, height } = this.scale;
    const score = data.score || 0;
    const highScore = data.highScore || 0;
    
    // Cargar high score desde localStorage si no se proporciona
    let displayHighScore = highScore;
    if (displayHighScore === 0) {
      const stored = localStorage.getItem('caramelito_highscore');
      displayHighScore = stored ? parseInt(stored, 10) : 0;
    }
    
    // Fondo oscuro semi-transparente estilo arcade
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.85);
    
    // Título Game Over - estilo pixel art con efecto
    const gameOverText = this.add.text(width / 2, height / 2 - 80, 'GAME OVER', {
      fontSize: '56px',
      fill: '#ff3333',
      fontFamily: '"Courier New", Courier, monospace',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);
    
    // Efecto de temblor en GAME OVER
    this.tweens.add({
      targets: gameOverText,
      x: '+=3',
      duration: 50,
      yoyo: true,
      repeat: 3,
      onComplete: () => {
        gameOverText.x = width / 2;
      }
    });
    
    // Contenedor de puntuación con borde
    const scoreContainer = this.add.rectangle(
      width / 2, 
      height / 2, 
      300, 
      120, 
      0x222244, 
      0.9
    );
    scoreContainer.setStrokeStyle(4, 0x6666aa);
    
    // Puntuación
    this.add.text(width / 2, height / 2 - 25, `Puntuación: ${score}`, {
      fontSize: '28px',
      fill: '#ffffff',
      fontFamily: '"Courier New", Courier, monospace',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);
    
    // High Score - dorado para destacar
    const highScoreLabel = displayHighScore > 0 
      ? `Mejor puntuación: ${displayHighScore}` 
      : 'Primera partida';
    this.add.text(width / 2, height / 2 + 25, highScoreLabel, {
      fontSize: '20px',
      fill: '#ffcc00',
      fontFamily: '"Courier New", Courier, monospace',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);
    
    // Instrucciones - parpadeante estilo arcade
    const blinkText = this.add.text(width / 2, height / 2 + 100, 'Presiona SPACE para volver a jugar', {
      fontSize: '18px',
      fill: '#aaaaaa',
      fontFamily: '"Courier New", Courier, monospace'
    }).setOrigin(0.5);
    
    // Efecto de parpadeo
    this.tweens.add({
      targets: blinkText,
      alpha: 0,
      duration: 500,
      yoyo: true,
      repeat: -1
    });
    
    // Escuchar Space para reiniciar
    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }

  shutdown() {
    // Limpiar listener de teclado para evitar duplicados
    this.input.keyboard.off('keydown-SPACE');
  }
}


