const form = document.getElementById('data-form');
const but = document.getElementById('submitBtn');

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

  //TODO: Show reload button
});

//Question slideshow
let currentQuestion = 0;
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
    submitBtn.style.display = 'block';
  } else {
    submitBtn.style.display = 'none';
  }
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
  if(currentQuestion == questions.length - 1){
    nextbutton.style.display='none'
  } else {
    nextbutton.style.display='block'
  }
  if(currentQuestion = 0){
    prevbutton.style.display='none'
  } else {
    prevbutton.style.display='block'
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