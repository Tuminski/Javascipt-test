var startButton = document.getElementById('start-btn')
var intro = document.getElementById('controls')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var endGame = document.getElementById('end-game')

var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')

var timer = document.getElementById('timer')
var count = 60;

var shuffleQuestions, currentQuestionIndex 

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
}) 

function startGame() {
    startButton.classList.add('hide')
    intro.classList.add('hide')

    var countdown = setInterval(function() {
        count--;
        timer.innerText = count;
        if (count === 0) {
            stopInterval()
        }
    },1000)

    var stopInterval = function() {
        clearInterval(countdown);
        window.alert("You ran out of time! Try again.")
        gameOver()
    }

    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        } 
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
       gameOver()
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

var gameOver = function() {
    endGame.classList.add('hide')
    window.alert("Congrats your score is " + count + " Please refresh to try again.")
}


var questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers:  [
            { text: '<javascript>', correct: false },
            { text: '<scripting>', correct: false },
            { text: '<script>', correct: true },
            { text: '<js>', correct: false }, 
        ]
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        answers: [
            { text: '<script src="xxx.js">', correct: true },
            { text: '<script href="xxx.js">', correct: false },
            { text: '<script name="xxx.js">', correct: false },
            { text: 'None of the above!', correct: false },
        ]
    },
    {
        question: 'How do you call a function named "myFunction"?',
        answers: [
            { text: 'call myFunction()', correct: false},
            { text: 'myFunction()', correct: true},
            { text: 'call function myFunction()', correct: false},
            { text: 'None of the above!', correct: false},
        ]
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        answers: [
            { text: 'if i = 5 then', correct: false},
            { text: 'if i == 5 then', correct: false},
            { text: 'if i = 5', correct: false},
            { text: 'if (i==5)', correct: true},
        ]
    },
    {
        question: 'How does a FOR loop start?',
        answers: [
            { text: 'for i = 1 to 5', correct: false},
            { text: 'for (i = 0; 1<=5; i++)', correct: true},
            { text: 'for (i = 0; i<=5)', correct: false},
            { text: 'for (i<=5; i++)', correct: false},
        ]
    }
]