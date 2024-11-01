// Array de perguntas e respostas
const quizData = [
    {
        question: "Qual é a capital do Brasil?",
        answers: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
        correct: "Brasília" // Alteramos para armazenar o texto correto em vez do índice
    },
    {
        question: "Qual é a maior floresta tropical do mundo?",
        answers: ["Floresta Amazônica", "Floresta do Congo", "Floresta Boreal", "Floresta Negra"],
        correct: "Floresta Amazônica"
    },
    {
        question: "Qual é o planeta mais próximo do Sol?",
        answers: ["Mercúrio", "Vênus", "Terra", "Marte"],
        correct: "Mercúrio"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuizData = [];

// Função para embaralhar um array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para inicializar o quiz com perguntas e respostas embaralhadas
function initializeQuiz() {
    shuffledQuizData = shuffleArray([...quizData]); // Embaralha as perguntas
    shuffledQuizData.forEach(question => {
        question.answers = shuffleArray([...question.answers]); // Embaralha as alternativas de cada pergunta
    });
    loadQuestion();
}

// Função para carregar a questão atual e suas alternativas
function loadQuestion() {
    const questionData = shuffledQuizData[currentQuestionIndex];
    const questionText = document.getElementById("question-text");
    const answersList = document.getElementById("answers-list");

    questionText.innerText = questionData.question;
    answersList.innerHTML = "";

    questionData.answers.forEach(answer => {
        const li = document.createElement("li");
        const input = document.createElement("input");
        const label = document.createElement("label");

        input.type = "radio";
        input.name = "answer";
        input.value = answer;
        label.innerText = answer;

        li.appendChild(input);
        li.appendChild(label);
        answersList.appendChild(li);
    });
}

// Função para verificar a resposta e passar para a próxima pergunta
function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) return;

    const questionData = shuffledQuizData[currentQuestionIndex];
    const selectedText = selectedAnswer.value; // Obtém o texto da resposta selecionada

    // Verifica se o texto da resposta selecionada é igual ao texto da resposta correta
    if (selectedText === questionData.correct) score++;

    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuizData.length) {
        loadQuestion();
    } else {
        displayResult();
    }
}

// Função para exibir o resultado
function displayResult() {
    const resultMessage = document.getElementById("result");
    const retryBtn = document.getElementById("retryBtn");

    resultMessage.innerText = `Você acertou ${score} de ${shuffledQuizData.length} perguntas!`;
    resultMessage.style.display = "block";
    retryBtn.style.display = "block";
    document.getElementById("quiz").style.display = "none";
}

// Função para reiniciar o quiz
function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result").style.display = "none";
    document.getElementById("retryBtn").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    initializeQuiz();
}

// Inicia o quiz ao carregar a página
initializeQuiz();
