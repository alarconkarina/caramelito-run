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
    
    // Fondo oscuro
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);
    
    // Título Game Over
    this.add.text(width / 2, height / 2 - 80, 'GAME OVER', {
      fontSize: '64px',
      fill: '#ff0000',
      fontFamily: 'Courier',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Puntuación
    this.add.text(width / 2, height / 2, `Puntuación: ${score}`, {
      fontSize: '32px',
      fill: '#ffffff',
      fontFamily: 'Courier'
    }).setOrigin(0.5);
    
    // High Score
    const highScoreText = displayHighScore > 0 
      ? `Mejor puntuación: ${displayHighScore}` 
      : 'Primera partida';
    this.add.text(width / 2, height / 2 + 50, highScoreText, {
      fontSize: '20px',
      fill: '#ffff00',
      fontFamily: 'Courier'
    }).setOrigin(0.5);
    
    // Instrucciones
    this.add.text(width / 2, height / 2 + 80, 'Presiona SPACE para volver a jugar', {
      fontSize: '24px',
      fill: '#aaaaaa',
      fontFamily: 'Courier'
    }).setOrigin(0.5);
    
    // Escuchar Space para reiniciar
    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }
}
