const questions = [
  {
    question: "Which data type is NOT primitive in JavaScript?",
    options: ["String", "Boolean", "Object", "Undefined"],
    correct: 2
  },
  {
    question: "What is the output of values: typeof null?",
    options: ["null", "object", "undefined", "number"],
    correct: 1
  },
  {
    question: "Which keyword declares a block-scoped variable that can be reassigned?",
    options: ["var", "const", "let", "define"],
    correct: 2
  },
  {
    question: "What does array.push() return?",
    options: ["The new length of the array", "The array itself", "The element added", "undefined"],
    correct: 0
  },
  {
    question: "Which operator checks for equality of both value and data type?",
    options: ["=", "==", "===", "!=="],
    correct: 2
  },
  {
    question: "What will Boolean('false') evaluate to?",
    options: ["false", "true", "NaN", "TypeError"],
    correct: 1
  },
  {
    question: "Which method converts a JSON string back into a JavaScript object?",
    options: ["JSON.stringify()", "JSON.objectify()", "JSON.toObject()", "JSON.parse()"],
    correct: 3
  },
  {
    question: "What is the result of '5' + 3 in JavaScript?",
    options: ["8", "53", "NaN", "TypeError"],
    correct: 1
  },
  {
    question: "Which array method creates a new array filtered down to elements that pass a test?",
    options: ["forEach()", "map()", "filter()", "reduce()"],
    correct: 2
  },
  {
    question: "What does DOM stand for in web development?",
    options: ["Document Object Model", "Data Object Management", "Digital Optimal Module", "Document Order Matrix"],
    correct: 0
  }
];

let currentIndex = 0;
let score = 0;
let userAnswers = [];

const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const progressBar = document.getElementById("progress-bar");
const questionCounter = document.getElementById("question-counter");
const currentScoreElement = document.getElementById("current-score");
const finalScoreElement = document.getElementById("final-score");
const bestScoreElement = document.getElementById("best-score");
const reviewContainer = document.getElementById("review-container");
const restartBtn = document.getElementById("restart-btn");

const initQuiz = () => {
  currentIndex = 0;
  score = 0;
  userAnswers = [];
  
  const savedBest = localStorage.getItem("quiz_best_score") || 0;
  bestScoreElement.textContent = savedBest;
  
  resultScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  
  updateStatus();
  loadQuestion();
};

const updateStatus = () => {
  const progressPercent = (currentIndex / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
  questionCounter.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  currentScoreElement.textContent = `Score: ${score}`;
};

const loadQuestion = () => {
  const currentQuestion = questions[currentIndex];
  questionText.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = option;
    button.addEventListener("click", () => handleAnswer(index));
    optionsContainer.appendChild(button);
  });
};

const handleAnswer = (selectedIndex) => {
  const currentQuestion = questions[currentIndex];
  const buttons = optionsContainer.querySelectorAll(".option-btn");
  
  userAnswers.push(selectedIndex);
  
  buttons.forEach((btn) => btn.disabled = true);

  if (selectedIndex === currentQuestion.correct) {
    buttons[selectedIndex].classList.add("correct");
    score++;
  } else {
    buttons[selectedIndex].classList.add("incorrect");
    buttons[currentQuestion.correct].classList.add("correct");
  }

  currentIndex++;

  setTimeout(() => {
    if (currentIndex < questions.length) {
      updateStatus();
      loadQuestion();
    } else {
      showResults();
    }
  }, 1200);
};

const showResults = () => {
  progressBar.style.width = "100%";
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  
  finalScoreElement.textContent = score;

  const savedBest = parseInt(localStorage.getItem("quiz_best_score") || 0, 10);
  if (score > savedBest) {
    localStorage.setItem("quiz_best_score", score);
    bestScoreElement.textContent = score;
  }

  renderReview();
};

const renderReview = () => {
  reviewContainer.innerHTML = "";
  
  questions.forEach((q, index) => {
    const userAnsIndex = userAnswers[index];
    const isCorrect = userAnsIndex === q.correct;
    
    const reviewItem = document.createElement("div");
    reviewItem.className = "review-item";
    
    let reviewHTML = `<div class="review-q">${index + 1}. ${q.question}</div>`;
    
    if (!isCorrect) {
      reviewHTML += `<div class="review-ans user-wrong">Your Answer: ${q.options[userAnsIndex]}</div>`;
    }
    
    reviewHTML += `<div class="review-ans actual-correct">Correct Answer: ${q.options[q.correct]}</div>`;
    
    reviewItem.innerHTML = reviewHTML;
    reviewContainer.appendChild(reviewItem);
  });
};

restartBtn.addEventListener("click", initQuiz);

document.addEventListener("DOMContentLoaded", initQuiz);
