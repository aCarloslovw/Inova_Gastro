const questions = [
    {
        question: "Qual é a capital da França?",
        answers: ["Roma", "Berlim", "Madri", "Paris"],
        correct: 3
    },
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        answers: ["Terra", "Marte", "Júpiter", "Saturno"],
        correct: 2
    },
    {
        question: "Quem pintou a Mona Lisa?",
        answers: ["Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Monet"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

// Exibir a pergunta atual e opções
function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-text').innerText = question.question;

    const answersList = document.getElementById('answers-list');
    answersList.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <label>
                <input type="radio" name="answer" value="${index}">
                ${answer}
            </label>
        `;
        answersList.appendChild(listItem);
    });
}

// Verificar a resposta e ir para a próxima pergunta
function nextQuestion() {
    const form = document.getElementById('quizForm');
    const selectedAnswer = form.answer.value;

    if (selectedAnswer === "") {
        alert("Selecione uma resposta!");
        return;
    }

    // Verifica se a resposta está correta
    if (parseInt(selectedAnswer) === questions[currentQuestion].correct) {
        score++;
    }

    // Avançar para a próxima pergunta ou finalizar o quiz
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        displayResult();
    }
}

// Mostrar o resultado final
function displayResult() {
    const quizContainer = document.getElementById('quiz');
    const resultMessage = document.getElementById('result');
    const retryBtn = document.getElementById('retryBtn');
    
    quizContainer.style.display = 'none'; // Oculta as perguntas

    if (score === questions.length) {
        resultMessage.innerHTML = `<span class="victory">Parabéns! Você acertou todas as perguntas!</span>`;
        retryBtn.style.display = 'none'; // Esconde o botão de tentar novamente
        
        // Redirecionar para a página de informações sobre Impressão 3D
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000); // Redireciona após 2 segundos
    } else {
        resultMessage.innerHTML = `<span class="failure">Você acertou ${score} de ${questions.length} perguntas. Tente novamente!</span>`;
        retryBtn.style.display = 'block'; // Exibe o botão de tentar novamente
    }
}

// Reiniciar o quiz
function retryQuiz() {
    score = 0;
    currentQuestion = 0;
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').innerHTML = '';
    document.getElementById('retryBtn').style.display = 'none';
    loadQuestion();
}

// Carregar a primeira pergunta ao abrir a página
loadQuestion();
