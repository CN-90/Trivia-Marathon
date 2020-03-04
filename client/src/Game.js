class Game {
  constructor() {
    this.score = 0;
    this.lives = 3;
    this.playerName = '';
    this.time = 10;
  }

  addToScore(points) {
    this.score += points;
  }

  subtractLife() {
    this.lives--;
  }

  setPlayerName(name) {
    this.playerName = name;
  }

  restartTime() {
    this.time = 10;
  }

  restartGame() {
    this.score = 0;
    this.lives = 3;
  }
}

export default Game;
