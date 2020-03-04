class UI {
  constructor() {
    this.elements = {
      prompt: this.selectEle('initial-prompt'),
      nameInput: this.selectEle('nameInput'),
      startGameBtn: this.selectEle('startGame'),
      questionCtn: this.selectEle('question-container'),
      score: this.selectEle('score'),
      lives: this.selectEle('lives'),
      category: this.selectEle('category'),
      time: this.selectEle('time'),
      question: this.selectEle('question'),
      answers: this.selectEle('answers'),
      answer: this.selectElements('answer'),
      promptNext: this.selectEle('prompt-next'),
      nextQuestion: this.selectEle('next-question'),
      gameOver: this.selectEle('game-over'),
      answerResult: this.selectEle('answer-result')
    };
  }

  selectEle(id) {
    return document.getElementById(id);
  }

  selectElements(className) {
    return document.getElementsByClassName(className);
  }

  renderHtml(ele, content) {
    ele.innerText = content;
  }

  renderQuestion(questionData) {
    console.log(questionData);
    const { category, question } = this.elements;
    category.innerText = questionData.category;
    question.innerText = questionData.question;
    let answers = shuffle([
      ...questionData.incorrect_answers,
      questionData.correct_answer
    ]);
    this.renderAnswers(answers);
  }

  renderAnswers(answers) {
    let html = '';
    answers.forEach(answer => (html += `<li class="answer">${answer}</li>`));
    this.elements.answers.innerHTML = html;
  }

  renderColors(correctAnswer) {
    console.log('RenderColors has been called dipshit.');
    Array.from(this.elements.answer).forEach(ele => {
      ele.style.background = '#f34040';
      if (ele.innerText === correctAnswer) {
        ele.style.background = '#25d225';
        ele.style.color = '#232323';
      }
    });
  }

  hideHtml(ele) {
    ele.style.display = 'none';
  }

  showHtml(ele) {
    ele.style.display = 'block';
  }
}

export default UI;

function shuffle(array) {
  var copy = [],
    n = array.length,
    i;
  while (n) {
    i = Math.floor(Math.random() * array.length);
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }
  return copy;
}
