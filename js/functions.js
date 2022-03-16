const startBtn = document.getElementById("start-btn")
const nextBtn = document.getElementById("next-btn")
const quizWrapper = document.getElementById("quiz-wrapper")
let shuffleQs, currentIndex
const qElement = document.getElementById('questions')
const choiceElement = document.getElementById('choices')
const shadeImg = document.getElementById('homepageImage')
const showQuiz = document.getElementById('quiz-btn')
const quizContainer = document.getElementById('quiz-container')

showQuiz.addEventListener('click', () => {
    quizContainer.classList.remove('hidden')
    quizContainer.scollIntoView({behavior: "smooth", block: "end"})
})

startBtn.addEventListener('click', startQuiz)
nextBtn.addEventListener('click', () => {
    currentIndex++
    nextQuestion()
})

shadeImg.addEventListener('mouseover', () => {
    shadeImg.childNodes[1].classList.add('img-darken')
    shadeImg.childNodes[3].classList.add('whiten')
})

shadeImg.addEventListener('mouseout', () => {
    shadeImg.childNodes[1].classList.remove('img-darken')
    shadeImg.childNodes[3].classList.remove('whiten')
})

function startQuiz() {
    startBtn.classList.add('hidden')
    shuffleQs = questions.sort(() => Math.random() - .5)
    currentIndex = 0
    quizWrapper.classList.remove('hidden')
    nextQuestion()
}

function nextQuestion() {
    resetState()
    showQ(shuffleQs[currentIndex])
}

function showQ(question) {
    qElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        choiceElement.appendChild(button)
    })
}

function resetState() {
    nextBtn.classList.add('hidden')
    while (choiceElement.firstChild) {
        choiceElement.removeChild(choiceElement.firstChild)
    }
}

function selectAnswer(e) {
    const choice = e.target
    const correct = choice.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(choiceElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQs.length > currentIndex + 1) {
        nextBtn.classList.remove('hidden')
    } else {
        startBtn.innerText = 'Restart'
        startBtn.classList.remove('hidden')
        nextBtn.classList.add('hidden')
    }

}

function setStatusClass(element, correct) {
    removeStatusClass(element)
    if(correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function removeStatusClass (element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Q1',
        answers: [
            {text: 'A', correct: true},
            {text: 'B', correct: false},
        ]
    },
    {
        question: 'Q2',
        answers: [
            {text: 'E', correct: true},
            {text: 'F', correct: false},
        ]
    },
    {
        question: 'Q3',
        answers: [
            {text: 'I', correct: true},
            {text: 'J', correct: false},
        ]
    },
    {
        question:'Q4',
        answers: [
            {text:'N', correct:true},
            {text:'O', correct:false},
        ]
    },
]