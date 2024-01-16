document.addEventListener("DOMContentLoaded", function () {
  const questionContainer = document.getElementById("questionContainer");
  const generateQuestionButton = document.getElementById("generateQuestion");
  const submitAnswersButton = document.getElementById("submitAnswers");
  const resultContainer = document.getElementById("resultContainer");

  let questions = [];

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateMathQuestions() {
    questions = [];
    resultContainer.innerHTML = "";

    for (let i = 0; i < 10; i++) {
      let num1, num2, num3, num4;
      const operatorOptions = ["+", "-", "*", "/"];
      const operator = operatorOptions[generateRandomNumber(0, 3)];

      // Use num1 and num2 for all cases
      num1 = generateRandomNumber(1, 20);
      num2 = generateRandomNumber(1, 10);
      num3 = generateRandomNumber(1, 5);
      num4 = generateRandomNumber(1, 3);

      let question = "";
      let answer;

      // Build the question based on operator and available numbers
      switch (operator) {
        case "+":
          question = `(${num1} - ${num2}) / ${num3 || 1}`;
          answer = Math.floor((num1 - num2) / (num3 || 1));
          break;
        case "-":
          question = `(${num1} * ${num2}) / ${num3 || 1} + ${num4 || 1}`;
          answer = Math.floor((num1 * num2) / (num3 || 1) + (num4 || 1));
          break;
        case "*":
          question = `(${num1} - ${num2}) / ${num3 || 1}`;
          answer = Math.floor((num1 - num2) / (num3 || 1));
          break;
        case "/":
          if (num3 && num4) {
            question = `(${num1} + ${num2}) * ${num3} / ${num4}`;
            answer = (num1 + num2) * num3 / num4;
          } else { 
            i--;
            continue;
          }
          break;
          
      }

      questions.push({ question, answer });
    }

    displayQuestions();
  }

  function displayQuestions() {
    questionContainer.innerHTML = "";
    questions.forEach((q, index) => {
      const questionBlock = document.createElement("div");
      questionBlock.classList.add("questionBlock");

      const questionText = document.createElement("p");
      questionText.innerHTML = `<strong>Question ${index + 1}:</strong> ${q.question}`;
      questionBlock.appendChild(questionText);

      const answerInput = document.createElement("input");
      answerInput.type = "text";
      answerInput.placeholder = "Your Answer";
      questionBlock.appendChild(answerInput);

      questionContainer.appendChild(questionBlock);
    });
  }

  function submitAnswers() {
    const answerInputs = document.querySelectorAll(".questionBlock input");
    let correctAnswers = 0;

    answerInputs.forEach((input, index) => {
      const userAnswer = parseInt(input.value, 10);
      const correctAnswer = questions[index].answer;

      if (!isNaN(userAnswer) && userAnswer === correctAnswer) {
        correctAnswers++;
      }
    });

    showResults(correctAnswers);
  }

  function showResults(correctAnswers) {
    resultContainer.innerHTML = `<p>You got ${correctAnswers} out of 10 questions correct!</p>`;
    questionContainer.innerHTML = "";
  }

  generateQuestionButton.addEventListener("click", generateMathQuestions);
  submitAnswersButton.addEventListener("click", submitAnswers);
});
