const form = document.getElementById('data-form');
const but = document.getElementById('submitBtn');
const title = document.getElementById('title-box');

title.addEventListener('click', startQuiz)

function startQuiz(){
  currentQuestion = 0;
  title.classList.add('hidden');
  title.classList.remove('flexy');
  showQuestion(currentQuestion);
}

//Keep form from reseting on clicking next button.
form.addEventListener('submit', async (e) => {
  e.preventDefault();
});

//Send form data
but.addEventListener('click', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const screenTime = document.getElementById('screentime').value;

  let formData = {"name":name, "age":age, "screenTime":screenTime}

  try {
    const response = await fetch('http://127.0.0.1:3000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: formData }),
    });

    if (response.ok) {
      const result = await response.text();
      console.log(result);
    } else {
      console.error('Failed to send data.');
    }
  } catch (error) {
    console.error('Error:', error);
  }

  let finalScreen =  document.getElementById('final-screen');
  finalScreen.classList.remove('hidden');
  form.classList.add('hidden');
  setTimeout(() => { location.reload(); }, 10000); //Waits 2 seconds and then refreshes page to start quiz over.
});

//Question slideshow
let currentQuestion = -1;
const questions = document.querySelectorAll('.question');
const submitBtn = document.getElementById('submitBtn');

function showQuestion(questionIndex) {
  questions.forEach((question, index) => {
    if (index === questionIndex) {
      question.classList.add('active');
    } else {
      question.classList.remove('active');
    }
  });
  if (questionIndex === questions.length - 1) {
    submitBtn.textContent = 'SUBMIT';
    submitBtn.classList.remove('hidden');
  } else {
    submitBtn.classList.add('hidden');
  }
  hideAndShowButtons();
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
  }
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
  }
}

const prevbutton = document.getElementById('prevBtn');
const nextbutton = document.getElementById('nextBtn');
function hideAndShowButtons(){
  console.log(currentQuestion);
  if(currentQuestion == questions.length - 1){
    nextbutton.classList.add('hidden');
  } else {
    nextbutton.classList.remove('hidden');
  }
  if(currentQuestion == 0){
    prevbutton.classList.add('hidden');
  } else {
    prevbutton.classList.remove('hidden');
  }
  if(currentQuestion==-1){
    console.log('Weg met de knoppen')
    prevbutton.classList.add('hidden');
    nextbutton.classList.add('hidden');
    nextbutton.textContent = "NEXT";
  }
}


//TODO: Check if we can remove this
function submitForm() {
  const formData = new FormData(questions[currentQuestion].querySelector('form'));
  for (const entry of formData.entries()) {
    console.log(`${entry[0]}: ${entry[1]}`);
  }
}

showQuestion(currentQuestion);