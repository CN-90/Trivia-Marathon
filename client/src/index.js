import '../styles.css';
import Game from './Game';
import UI from './UI';

class Controller {
  constructor(gameController, UIController) {
    this.Game = gameController;
    this.UI = UIController;
    this.timer = null;
    this.index = 0;
    this.questions = [];
    this.currentQuestion = '';
    this.answer = '';
  }

  addListeners() {
    const {
      prompt,
      startGameBtn,
      nameInput,
      questionCtn,
      answers,
      nextQuestion
    } = this.UI.elements;

    startGameBtn.addEventListener('click', e => {
      e.preventDefault();

      // check if user has provided a valid name.
      if (!this.validateName(nameInput.value)) return;
      this.UI.hideHtml(prompt);
      this.UI.showHtml(questionCtn);
      this.startRound();
    });

    // check if answer is correct once an answer has been clicked.
    answers.addEventListener('click', this.checkAnswer.bind(this));
    nextQuestion.addEventListener('click', this.startRound.bind(this));
  }

  startRound() {
    this.answer = '';
    this.Game.time = 10;
    this.currentQuestion = this.questions[this.index];
    this.UI.renderHtml(this.UI.elements.time, 10);
    this.UI.hideHtml(this.UI.elements.promptNext);
    this.setTimer();
    this.UI.renderQuestion(this.currentQuestion);
    this.index++;
  }

  checkAnswer(e) {
    const { score, answerResult, promptNext } = this.UI.elements;

    if (e.target.id === 'answers') return;
    if (this.Game.time == 0 || this.answer) return;

    this.UI.renderColors(this.currentQuestion.correct_answer);
    this.answer = e.target.innerText;
    if (this.answer === this.currentQuestion.correct_answer) {
      this.Game.score += 100;
      this.UI.showHtml(promptNext);
      this.UI.renderHtml(score, this.Game.score);
      this.UI.renderHtml(answerResult, 'Correct!');
    } else {
      this.Game.lives--;
      // this.UI.renderHtml(lives, this.Game.lives);
      this.checkForGameOver();
    }
    this.clearTimer();
  }

  checkForGameOver() {
    const { promptNext, answerResult, lives, gameOver } = this.UI.elements;
    this.UI.renderHtml(lives, this.Game.lives);

    if (this.Game.lives === 0) {
      this.UI.showHtml(gameOver);
    } else {
      this.UI.showHtml(promptNext);
      this.UI.renderHtml(answerResult, 'Incorrect!');
    }
  }

  validateName(name) {
    if (nameInput.value.trim() === '') {
      alert('You must enter a name.');
      return false;
    }
    this.Game.playerName = name;
    return true;
  }

  setTimer() {
    const { time } = this.UI.elements;
    this.timer = setInterval(() => {
      this.Game.time--;
      this.UI.renderHtml(time, this.Game.time);
      if (this.Game.time === 0) {
        this.clearTimer();
        this.Game.lives--;
        this.checkForGameOver();
      }
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  fetchQuestions() {
    const questions = JSON.parse(localStorage.getItem('questions'));
    if (questions) {
      this.questions = questions;
      this.currentQuestion = this.questions[this.index];
      console.log(this.currentQuestion);
    } else {
      fetch('https://opentdb.com/api.php?amount=10')
        .then(res => res.json())
        .then(questions =>
          localStorage.setItem('questions', JSON.stringify(questions.results))
        );
    }
  }
}

const GameController = new Game();
const UIController = new UI();

const Ctrl = new Controller(GameController, UIController);
Ctrl.addListeners();
Ctrl.fetchQuestions();
