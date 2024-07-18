let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 180;
let timerInterval;

const questions = [
    {
        question: "1 . What is the capital of India?",
        options: ["New Delhi", "Kolkata", "Hyderabad", "Mumbai"],
        answer: "New Delhi"
    },
    {
        question: "2 . What is the National sport of India?",
        options: ["Baseball", "Cricket", "Hockey", "Football"],
        answer: "Hockey"
    },
    {
        question: "3 . Which is the longest river of India?",
        options: ["Ganga", "Yamuna", "Godavari", "Krishna"],
        answer: "Ganga"
    },
];

document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    showQuestion();
    document.getElementById('prev-btn').addEventListener('click', prevQuestion);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
});

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');

    questionElement.textContent = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = '';

    questions[currentQuestionIndex].options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => handleOptionClick(optionElement));
        optionsContainer.appendChild(optionElement);
    });

    updateNavigationButtons();
}

function handleOptionClick(optionElement) {
    const selectedOption = optionElement.textContent;
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    optionElement.classList.add('selected');

    setTimeout(() => {
        if (selectedOption === questions[currentQuestionIndex].answer) {
            score++;
        }
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            submitQuiz();
        }
    }, 500); // Add a slight delay for UX
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === questions.length - 1;
}

function submitQuiz() {
    clearInterval(timerInterval);
    document.getElementById('quiz-body').style.display = 'none';
    document.getElementById('score').textContent = `Your score: ${score} out of ${questions.length}`;
    document.getElementById('score-container').style.display = 'block';
}
