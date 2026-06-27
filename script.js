const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Lisbon",
        correct: "c"
    },
    {
        question: "Who is the President of the United States (2023)?",
        a: "Donald Trump",
        b: "Joe Biden",
        c: "Barack Obama",
        d: "George Bush",
        correct: "b"
    },
    {
        question: "What is the largest planet in our Solar System?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
        correct: "c"
    },
    {
        question: "What is the smallest prime number?",
        a: "1",
        b: "2",
        c: "3",
        d: "5",
        correct: "b"
    }
];

const question = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

const submit = document.getElementById("submit");

const scoreContainer = document.getElementById("score-container");
const score = document.getElementById("score");

const questionNo = document.getElementById("questionNo");
const liveScore = document.getElementById("liveScore");
const progressFill = document.querySelector(".progress-fill");

let currentQuiz = 0;
let totalScore = 0;

loadQuiz();

function loadQuiz() {

    deselectAnswers();

    const current = quizData[currentQuiz];

    question.innerText = current.question;

    a_text.innerHTML = `<span class="option">A</span>${current.a}`;
    b_text.innerHTML = `<span class="option">B</span>${current.b}`;
    c_text.innerHTML = `<span class="option">C</span>${current.c}`;
    d_text.innerHTML = `<span class="option">D</span>${current.d}`;

    questionNo.innerText = `Question ${currentQuiz + 1} of ${quizData.length}`;

    liveScore.innerText = totalScore;

    progressFill.style.width =
        ((currentQuiz + 1) / quizData.length) * 100 + "%";
}

function deselectAnswers() {

    answerEls.forEach(answer => {

        answer.checked = false;

    });

}

function getSelected() {

    let answer = undefined;

    answerEls.forEach(ans => {

        if(ans.checked){

            answer = ans.id;

        }

    });

    return answer;

}

submit.addEventListener("click", () => {

    const answer = getSelected();

    if(answer){

        if(answer === quizData[currentQuiz].correct){

            totalScore++;

            liveScore.innerText = totalScore;

        }

        currentQuiz++;

        if(currentQuiz < quizData.length){

            loadQuiz();

        }

        else{

            document.getElementById("quiz-header").style.display="none";

            submit.style.display="none";

            document.querySelector(".progress-bar").style.display="none";

            scoreContainer.classList.remove("hide");

            score.innerHTML = `${totalScore} / ${quizData.length}`;

            let message="";

            if(totalScore==quizData.length){

                message="🏆 Excellent! Perfect Score";

            }

            else if(totalScore>=3){

                message="🎉 Great Job!";

            }

            else if(totalScore>=2){

                message="😊 Good Work!";

            }

            else{

                message="😄 Keep Practicing!";

            }

            scoreContainer.innerHTML=`

                <h2>${message}</h2>

                <h3>Your Score</h3>

                <h1 id="score">${totalScore} / ${quizData.length}</h1>

                <button onclick="location.reload()">

                    Restart Quiz

                </button>

            `;

        }

    }

    else{

        alert("Please select an answer!");

    }

});