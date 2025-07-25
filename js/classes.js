// Array objek untuk pertanyaan dan jawaban
const questions = [
    {
        question: "What is the name of the lost dog?",
        choices: ["Rex", "Tyler", "Sherry", "Milo"],
        answer: 2
    },
    {
        question: "Is the dog a female?",
        choices: ["Yes", "No"],
        answer: 1
    },
    {
        question: "When was the dog lost?",
        choices: ["Sunday 9th June", "Monday 10th June", "Thursday 13th June", "Monday 17th June"],
        answer: 1
    },
    {
        question: "Where was the dog lost?",
        choices: ["Blue lake cafe", "Near Capital tower", "Seaside port", "Central Park"],
        answer: 3
    },
    {
        question: "Is there a reward for finding the dog?",
        choices: ["Yes", "No"],
        answer: 0
    },
    {
        question: "How much is the reward?",
        choices: ["€500", "IDR.500.000", "$1000", "€400"],
        answer: 0
    }
]

// Array objek untuk kunci jawaban
const answerKey = [
    {
        number: 1,
        answer: "Sherry"
    },
    {
        number: 2,
        answer: "No"
    }, 
    {
        number: 3,
        answer: "Monday 10th June"
    },
    {
        number: 4,
        answer: "Central Park"
    },
    {
        number: 5,
        answer: "Yes"
    },
    {
        number: 6,
        answer: "€500"
    }
]

// Array objek untuk jawaban listening page
const listeningAnswer = [
        {
            number: 1,
            answer: "welcome"
        },
        {
            number: 2,
            answer: "great to be here"
        },
        {
            number: 3,
            answer: "earlier in the evening"
        },
        {
            number:4,
            answer: "turn off"
        },
        {
            number: 5,
            answer: "down low"
        },
        {
            number: 6,
            answer: "useful advice"
        }
    ]

// Deklarasi array untuk menyimpan jawaban pengguna
let userAnswers = Array(questions.length).fill(null);

// Function untuk membuat kuis
function createQuiz() {
    const container = document.getElementById("quizContainer");
    container.innerHTML = "";

    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.textContent = `${index + 1}. ${q.question}`;
        questionDiv.addEventListener("click", () => toggleQuestion(index));

        const answersDiv = document.createElement("div");
        answersDiv.className = "answers";
        answersDiv.id = `answers-${index}`;

        q.choices.forEach((choice, i) => {
            const label = document.createElement("label");
            label.innerHTML = 
            `<input type="radio" name="question${index}" value="${i}" 
            onchange="saveAnswer(${index}, ${i})"> ${choice}`;
            answersDiv.appendChild(label);
            answersDiv.appendChild(document.createElement("br"));
        });

        container.appendChild(questionDiv);
        container.appendChild(answersDiv);
    });
}

// Function untuk accordion toggle jawaban
function toggleQuestion(index) {
      questions.forEach((_, i) => {
    const answersDiv = document.getElementById(`answers-${i}`);
    if (i === index) {
      answersDiv.classList.toggle("open");
    } else {
      answersDiv.classList.remove("open");
    }
  });
}

// Function untuk menyimpan jawaban pengguna
function saveAnswer(qIndex, aIndex) {
    userAnswers[qIndex] = aIndex;
}

// Function untuk memeriksa jawaban dan menampilkan skor
function checkAnswers() {
  let correct = 0;
  userAnswers.forEach((ans, i) => {
    if (ans === questions[i].answer) {
      correct++;
    }
  });
  const score = document.getElementById("score");
  score.textContent = `You got ${correct} out of ${questions.length} correct.`;
}

// Function untuk mereset ulang kuis
function resetQuiz() {
    userAnswers.fill(null);
  document.getElementById("score").textContent = "";

  const inputs = document.querySelectorAll("input[type=radio]");
  inputs.forEach(input => input.checked = false);

  questions.forEach((_, i) => {
    const answersDiv = document.getElementById(`answers-${i}`);
    answersDiv.classList.remove("open");
  });
}

createQuiz();

// Function untuk membuat kunci jawaban
function createAnswerKey() {
    const answerKeyContainer = document.getElementById("answerKey");

    if (answerKeyContainer.children.length === 0) {
        answerKey.forEach(item => {
            const answerDiv = document.createElement("div");
            answerDiv.className = "right-answer";
            answerDiv.textContent = `Question ${item.number}: ${item.answer}`;
            answerKeyContainer.appendChild(answerDiv);
        });
    }

    answerKeyContainer.classList.add("visible");
}

function hideAnswerKey() {
    const answerKeyContainer = document.getElementById("answerKey");
    answerKeyContainer.classList.remove("visible");

    setTimeout(() => {
        answerKeyContainer.innerHTML = "";
    }, 500);
}

function toggleAnswerKey(button) {
    const answerKeyContainer = document.getElementById("answerKey");

    if (answerKeyContainer.classList.contains("visible")) {
        hideAnswerKey();
        button.textContent = "Check The Correct Answers Here!";
    } else {
        createAnswerKey();
        button.textContent = "Hide Answer Key";
    }
}

// Listening Page
// Deklarasi array objek jawaban untuk listening page

    // Function untuk mengecek jawaban benar di listening page
    function collectAnswers() {
        const inputs = document.querySelectorAll(".exercise-container input[type='text']");
        const userAnswers = [];

        inputs.forEach(input => {
        userAnswers.push(input.value.trim().toLowerCase()); // sanitize user input
        });

        let correctCount = 0;

        listeningAnswer.forEach((item, index) => {
            if (userAnswers[index] === item.answer.toLowerCase()) {
                correctCount++;
            }
        });

        const listeningScore = document.getElementById("listeningScore");
        listeningScore.textContent = `You got ${correctCount} out of ${listeningAnswer  .length} correct!`;
    };

    function resetExercise() {
        const inputs = document.querySelectorAll(".exercise-container input[type='text']");
        inputs.forEach(input => {
            input.value = "";
        });

        const scoreDisplay = document.getElementById("scoreDisplay");
        if (scoreDisplay) {
            scoreDisplay.textContent = "";
        };

        const listeningScore = document.getElementById("listeningScore");
        listeningScore.textContent = ""
    }

    function listeningAnswerKey() {
        const listeningKey = document.getElementById("listeningKey");

        if (listeningKey.children.length === 0) {
            listeningAnswer.forEach(item => {
                const listeningAnswerDiv = document.createElement("div");
                listeningAnswerDiv.className = "listening-answer";
                listeningAnswerDiv.textContent = `Question ${item.number}: ${item.answer}`;
                listeningKey.appendChild(listeningAnswerDiv);
            });
        }   

        listeningKey.classList.add("visible");
    }

    function hideListeningKey() {
        const listeningKey = document.getElementById("listeningKey");
        listeningKey.classList.remove("visible");

        setTimeout(() => {
            listeningKey.innerHTML = "";
        }, 500);
    }

    function toggleListeningKey(button) {
        const listeningKey = document.getElementById("listeningKey");

        if (listeningKey.classList.contains("visible")) {
            hideListeningKey();
            button.textContent = "Check The Correct Answers Here!";
        } else {
            listeningAnswerKey();
            button.textContent = "Hide Answer Key";
        }
    }