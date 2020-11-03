

/* This App is build with JavaScript and Bootstrap 
* This is Fetching Data from a file quiz.json
* you could also replace the file with an External API
* SRIK51977@GMAIL.COM.toLowerCase()
*/



// select DOM
const app = document.querySelectorAll('#answer button');
const questionTextElement = document.querySelector('#question');
const answerTextElement = document.querySelector('#answer');

const start = document.querySelector('#start');
const next = document.querySelector('#next');

const help = document.getElementById('help');

const timerDiv = document.querySelector('.timerDiv');
const scoreDiv = document.querySelector('.scoreDiv');
const timerBtn = document.querySelector('.timer');
const scoreBtn = document.querySelector('.score');

// Vars
let score = 0;
let timer = 5;


// EVENTS 
document.addEventListener('click', generateQuestion);


// FUNCTIONS 
function generateQuestion(e) {

  // Starting the game
  if (e.target.innerHTML === 'START') {

    // prevdnting default behavour
    e.preventDefault();

    // hiding next button
    next.classList.add('hide');

    // decrease time
    setInterval(updateTime, 1000);

    // fetch API
    fetch('quiz.json')
      .then(res => res.json())
      .then(data => {
        fetchQuestions(data);
      })
  }

  if (e.target.classList.contains('hides')) {

    // Increasing Scores
    score++;

    // Checking the answer if correct
    e.target.classList.add('correct');

    // hey you cannot click the answer two times
    answerTextElement.style.pointerEvents = 'none';


    // calling the nextQuestion
    setTimeout(() => {
      nextQuestion();
    }, 1000);

  }

  // if answer not correct
  if (e.target.classList.contains('nos')) {

    // prevdnting default behavour
    e.preventDefault();

    // hey you cannot click the answer two times and the next button too
    answerTextElement.style.pointerEvents = 'none';
    next.classList.remove('hide');

    // if wrong decrement the score -- not end the game
    score--

    // only when answer is wrong
    next.innerHTML = 'Wrong Answer -- Continue';

    // rewriting negative scores
    if (score === -1) {
      score = 0;
      scoreBtn.innerHTML = score;
    }

    // Making it red...
    e.target.classList.add('wrong');
  }

  // timeout or wrong answer
  if (e.target.classList.contains("next")) {

    // if game over
    if (e.target.innerHTML === "Try Again") {
      score = 0;
      scoreBtn.innerHTML = score;
    }
    // next question 
    nextQuestion();
  }
}


function fetchQuestions(data) {

  // setting attr
  main.classList.remove('hide');
  answerTextElement.classList.remove('hide');

  // removing attr
  start.classList.add('hide');
  help.classList.add('hide')

  // appending questions
  appendQuestions(data);

}

// Fetching question from api and displaying it
function appendQuestions(data) {

  // Random Number
  arr = Math.floor(Math.random() * data.length);

  // fetching the answers for that random number
  data[arr].answers.forEach(answer => {

    // adding hides class if answer is true
    if (answer.result === 'true') {
      answerTextElement.innerHTML += `<button class="btn btn-lg mt-3 text-light btn-light btn-block hides">${answer.name}</button>`;
    }
    
    // adding hides class if answer is true
    else {
      answerTextElement.innerHTML += `<button class="btn btn-lg mt-3 text-light btn-light btn-block nos">${answer.name}</button>`;
    }
  });
  
  // updating Display
  questionTextElement.innerHTML = data[arr].question;
}

// Generate a new Question
function nextQuestion() {

  // Hiding the next button
  next.classList.add('hide');
  answerTextElement.style.pointerEvents = 'all';

  // clearing the current answer
  answerTextElement.innerHTML = ``;

  // updating timer  
  timer = 6;
  next.innerHTML = 'Next';
  scoreBtn.innerHTML = parseInt(score);

  // fetch API
  fetch('quiz.json')
    .then(res => res.json())
    .then(data => {
      
      // new random number
      let arr = Math.floor(Math.random() * data.length);
      
      // fetching the data again, normally you wouldnt be doing that on your projects
      data[arr].answers.forEach(answer => {
        
        // checking result
        if (answer.result === 'true') {
          answerTextElement.innerHTML += `<button class="btn btn-lg mt-3 text-light btn-block hides">${answer.name}</button>`;
        } else {
          answerTextElement.innerHTML += `<button class="btn btn-lg mt-3 text-light btn-block nos">${answer.name}</button>`;
        }
      });
      
      // updating Questions
      questionTextElement.innerHTML = data[arr].question;
    })
}

// checking time left
function updateTime() {
  
  // if time is not 0
  if (timer !== 0) {
    
    // decrease time
    timer--
    
  } else {
    
    // changing texts
    answerTextElement.style.pointerEvents = 'none';
    next.classList.remove('hide');

    next.innerHTML = 'Try Again';

  }
  
  // resetting time
  timerBtn.innerHTML = "0" + timer;
}