  const questions =[
    {
      question:"which is largest animal in the world?",
      answers:[
        {text:"Shark",correct:false},
        {text:"Blue Whale",correct:true},
        {text:"Elephant",correct:false},
        {text:"Giraffe",correct:false}
      ]
    },
    {
      question:"which is the smallest country in the world?",
      answers:[
        {text:"Vatician City",correct:true},
        {text:"Bhutan",correct:false},
        {text:"Nepal",correct:false},
        {text:"Shri Lanka",correct:false}
      ]
    },
    {
      question:"which is largest desert in the world?",
      answers:[
        {text:"Kalahari",correct:false},
        {text:"Gobi",correct:false},
        {text:"Sahara",correct:false},
        {text:"Antartica",correct:true}
      ]
    },
    {
      question:"which is largest continent in the world?",
      answers:[
        {text:"Asia",correct:false},
        {text:"Astralia",correct:true},
        {text:"Arctic",correct:false},
        {text:"Africa",correct:false}
      ]
    }
  ];

  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }

  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let qustionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = qustionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }

  function resetState (){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }

  function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
    }
    else{
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
      if(button.dataset.correct === "true"){
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  function showScore(){
    resetState();
    questionElement.innerHTML = `your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }


  function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
      showQuestion();
    }else{
      showScore();
    }
  }

  nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
      handleNextButton();
    }else{
      startQuiz();
    }
  });

  startQuiz();