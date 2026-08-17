let currentQuestion = 0;
let score = 0;
let selectedQuestions = [];
let userAnswers = [];

const audioContext =
new (window.AudioContext ||
window.webkitAudioContext)();

let selectedSubject =
localStorage.getItem("selectedSubject");

document.getElementById("subjectTitle")
.innerText = selectedSubject + " Quiz";

// ======================
// LOAD SUBJECT QUESTIONS
// ======================

if(selectedSubject === "HTML"){
selectedQuestions = [...htmlQuestions];
}
else if(selectedSubject === "CSS"){
selectedQuestions = [...cssQuestions];
}
else if(selectedSubject === "JavaScript"){
selectedQuestions = [...jsQuestions];
}
else{
selectedQuestions = [...webQuestions];
}

// ======================
// SHUFFLE QUESTIONS
// ======================

selectedQuestions.sort(() => Math.random() - 0.5);

// ======================
// SOUND EFFECTS
// ======================

function playSound(type){

let oscillator =
audioContext.createOscillator();

let gainNode =
audioContext.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

if(type === "correct"){
oscillator.frequency.value = 800;
}
else{
oscillator.frequency.value = 250;
}

oscillator.start();

gainNode.gain.exponentialRampToValueAtTime(
0.00001,
audioContext.currentTime + 0.3
);

oscillator.stop(
audioContext.currentTime + 0.3
);

}

// ======================
// LOAD QUESTION
// ======================

function loadQuestion(){

let q =
selectedQuestions[currentQuestion];

document.getElementById("question")
.innerText =
(currentQuestion + 1) +
". " +
q.question;

let optionsDiv =
document.getElementById("options");

optionsDiv.innerHTML = "";

q.options.forEach(option => {

    let div = document.createElement("div");
    div.classList.add("option");

    let input = document.createElement("input");

    input.type = "radio";
    input.name = "answer";
    input.value = option;

    let label = document.createElement("label");

    // IMPORTANT:
    // textContent वापरल्यामुळे <p>, <a>, <img>
    // हे HTML म्हणून न चालता text म्हणून दिसतील.
    label.textContent = option;

    label.style.color = "black";
    label.style.display = "inline-block";
    label.style.marginLeft = "10px";

    div.appendChild(input);
    div.appendChild(label);

    optionsDiv.appendChild(div);

});
// Quiz Progress Bar

let progress =
((currentQuestion + 1) /
selectedQuestions.length) * 100;

let progressBar =
document.getElementById("progressBar");

if(progressBar){
progressBar.style.width =
progress + "%";
}

}

// ======================
// NEXT QUESTION
// ======================

function nextQuestion(){

let selected =
document.querySelector(
'input[name="answer"]:checked'
);

if(selected){

userAnswers.push(
selected.value
);

if(
selected.value ===
selectedQuestions[currentQuestion].answer
){

score++;

playSound("correct");

}
else{

playSound("wrong");

}

}

currentQuestion++;

if(
currentQuestion <
selectedQuestions.length
){

loadQuestion();

}
else{

submitQuiz();

}

}

// ======================
// SUBMIT QUIZ
// ======================

function submitQuiz(){

const currentUser =
JSON.parse(
localStorage.getItem("currentUser")
);

if(!currentUser){

alert("User information not found.");
return;

}

const userName =
currentUser.name;

let percentage =
((score / selectedQuestions.length) * 100)
.toFixed(2);

if(selectedSubject === "HTML"){

localStorage.setItem(
userName + "_HTMLProgress",
percentage
);

}
else if(selectedSubject === "CSS"){

localStorage.setItem(
userName + "_CSSProgress",
percentage
);

}
else if(selectedSubject === "JavaScript"){

localStorage.setItem(
userName + "_JavaScriptProgress",
percentage
);

}
else{

localStorage.setItem(
userName + "_WebDevelopmentProgress",
percentage
);

}

// Save Score

localStorage.setItem(
"score",
score
);

localStorage.setItem(
"totalQuestions",
selectedQuestions.length
);

// Save Progress

localStorage.setItem(
"courseProgress",
percentage
);

// Save Subject

localStorage.setItem(
"selectedSubject",
selectedSubject
);

window.location.href =
"result.html";

}

// ======================
// TIMER
// ======================

function startTimer(){

let timeLeft = 1800;

let timer =
setInterval(function(){

let minutes =
Math.floor(timeLeft / 60);

let seconds =
timeLeft % 60;

let timerElement =
document.getElementById("timer");

if(timerElement){

timerElement.innerText =
"Time Left: "
+
minutes
+
":"
+
(seconds < 10 ? "0" : "")
+
seconds;

}

timeLeft--;

if(timeLeft < 0){

clearInterval(timer);

submitQuiz();

}

},1000);

}

// ======================
// COUNTDOWN
// ======================

let count = 3;

let countdownInterval =
setInterval(() => {

let countdownText =
document.getElementById(
"countdownText"
);

if(countdownText){

countdownText.innerText =
count;

}

count--;

if(count < 0){

if(countdownText){

countdownText.innerText =
"GO!";

}

clearInterval(
countdownInterval
);

setTimeout(() => {

let countdownScreen =
document.getElementById(
"countdownScreen"
);

if(countdownScreen){

countdownScreen.style.display =
"none";

}

loadQuestion();

startTimer();

},1000);

}

},1000);