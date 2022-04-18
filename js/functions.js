
const questions = [
    {
        question: 'Where did we first meet?',
        answers: [
            {text: 'Junior College', correct: true},
            {text: 'Party', correct: false},
            {text: 'Play dates', correct: false},
            {text: 'Work', correct: false},
        ]
    },
    {
        question: 'What is our age difference?',
        answers: [
            {text: '2 weeks', correct: true},
            {text: '3 months', correct: false},
            {text: '2 years', correct: false},
            {text: '6 hours', correct: false},
        ]
    },
    {
        question: 'Who is older?',
        answers: [
            {text: 'Richard', correct: true},
            {text: 'Mary', correct: false},
        ]
    },
    {
        question: 'What are our middle names? (Groom, Bride)',
        answers: [
            {text: 'Eric, Modi', correct: true},
            {text: 'Antonio, Anne', correct: false},
            {text: 'Rich, Estelle', correct: false},
            {text: 'Ricardo, Guadalupe', correct: false},
        ]
    },
    {
        question: 'What district were we born in? (Groom, Bride)',
        answers: [
            {text: 'Belize, Belize', correct: true},
            {text: 'Belize, Jacksonville', correct: false},
            {text: 'Jacksonville, Belize', correct: false},
            {text: 'Cayo, Belize', correct: false},
        ]
    },
    {
        question: 'What is our favorite food? (Groom, Bride)',
        answers: [
            {text: 'Spaghetti, Chicken Nuggets', correct: true},
            {text: 'Sandwiches, Egg Breakfast', correct: false},
            {text: 'Tika Masala, Sweet and Sour Chicken', correct: false},
            {text: 'Udon Soup, Pizza', correct: false},
        ]
    },
]

const answerEls = document.querySelectorAll('.option')
const optWrappers = document.querySelectorAll('.option-wrapper')
const questionEl = document.getElementById('question')

const opt1 = document.getElementById('A1-text')
const opt2 = document.getElementById('A2-text')
const opt3 = document.getElementById('A3-text')
const opt4 = document.getElementById('A4-text')

const optEls = [opt1, opt2, opt3, opt4]

const progBar = document.getElementById('progress-bar-full')
const nextQBtn = document.getElementById('btn-next')

let currentQuiz = 0
let score = 0
let num = 0
let rightOpt = ''

loadQuiz()

function loadQuiz() {
    deselectAnswers()

    const currentQuizData = questions[currentQuiz]

    let currentOptions = shuffle(currentQuizData.answers)
    questionEl.innerText = currentQuizData.question + " Score:" + score

    currentOptions.forEach( option => {
        optEls[num].innerText = option.text
        optWrappers[num].classList.remove('hidden')
        answerEls[num].classList.remove('hidden')

        if(option.correct) {
            rightOpt = answerEls[num].id
        }
        num++
    })
}

function shuffle(arr) {
    let i = arr.length, randI
    while (i != 0) {
        randI = Math.floor(Math.random() * i);
        i--;

        [arr[i], arr[randI]] = [arr[randI], arr[i]];
    }
    return arr;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false
        answerEl.classList.add('hidden')
    })
    optWrappers.forEach(opt => {
        opt.classList.add('hidden')
    })
    num = 0
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id //referring to answer(text, correct)
        }
    })
    return answer
}

nextQBtn.addEventListener('click', () => {
    const answer = getSelected(), currentQuizData = questions[currentQuiz].answers

    if (answer === rightOpt) {
        score++
    }
    textBox.innerHTML = `<h2>You chose ${answer} and the correct answer is ${rightOpt} </h2>`

    currentQuiz++
    progBar.style.width=((currentQuiz*16.66)+"%")

    if (currentQuiz < questions.length) {
        loadQuiz()
    } else {
        quiz.innerHTML = `<h2>you answered ${score}/${questions.length} questions correctly</h2>` +
            `<button onclick="location.reload()">Reload</button>`
        score = 0
        num = 0
        currentQuiz = 0
    }
})
