const API_URL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
const main = document.querySelector("main");
const ls = localStorage.quizes;
let score = 0;
let round = 0;
//Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAvZs90uH3apGsidTT6YXtSgnY7oZR9Xu4",
    authDomain: "quiz-dca6c.firebaseapp.com",
    projectId: "quiz-dca6c",
    storageBucket: "quiz-dca6c.appspot.com",
    messagingSenderId: "101542039973",
    appId: "1:101542039973:web:add46f1d5e7281fe21584c",
    measurementId: "G-W2X2EHFPM3",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
//Quiz
const questDiv = document.createElement("article");
questDiv.id = "quest";
questDiv.classList = "wrapper";
const questP = document.createElement("h3");
const optDiv = document.createElement("section");
optDiv.id = "opt";
const answer1 = document.createElement("button");
const answer2 = document.createElement("button");
const answer3 = document.createElement("button");
const answer4 = document.createElement("button");
const answers = [answer1, answer2, answer3, answer4];
answers.forEach(answer => optDiv.appendChild(answer));
answers.forEach(answer => answer.classList = "answer");
const nextButton = document.createElement("button");
nextButton.classList = "action";
nextButton.innerText = "Next";
questDiv.appendChild(questP);
questDiv.appendChild(optDiv);
questDiv.appendChild(nextButton);
//ProgressBar
const ProgressBar = document.createElement("article");
ProgressBar.classList = "wrapper";
const progressHeading = document.createElement("h3");
progressHeading.innerText = `Question ${round+1} out of 10`;
const barContainer = document.createElement("div");
barContainer.id = "barContainer";
const bar = document.createElement("div");
barContainer.appendChild(bar);
bar.id = "progress";
ProgressBar.appendChild(progressHeading);
ProgressBar.appendChild(barContainer);
//Results
const articleResults = document.createElement("article");
articleResults.classList = "wrapper";
const resultHeading = document.createElement("h2");
resultHeading.innerText = "Here are your results!";
const scoreSection = document.createElement("section");
scoreSection.id = "results";
const scoreText = document.createElement("h3");
const supScore = document.createElement("sup");
const barNode = document.createTextNode("/");
const subScore = document.createElement("sub");
const repeatButton = document.createElement("button");
repeatButton.classList = "action";
repeatButton.innerText = "Take another!";
subScore.innerText = "10";
scoreText.appendChild(supScore);
scoreText.appendChild(barNode);
scoreText.appendChild(subScore);
scoreSection.appendChild(scoreText);
articleResults.appendChild(resultHeading);
articleResults.appendChild(scoreSection);
articleResults.appendChild(repeatButton);
//Home
const homeArticle = document.getElementById("home");
const statsArticle = document.createElement("article");
statsArticle.classList = "wrapper";
const statsHeading = document.createElement("h2");
statsHeading.innerText = "Your Stats!";
const statsSection = document.createElement("section");
statsSection.id = "stats";
statsSection.classList = "ct-perfect-fifth";
const quizButton = document.getElementById("quizButton");
statsArticle.appendChild(statsHeading);
statsArticle.appendChild(statsSection);
async function getDBData() {
    const snapshot = await db.collection("scores").orderBy("date", "desc").limit(5).get();
    return snapshot.docs.map(doc => doc.data()).reverse();
}
getDBData()
    .then(scores => {
        if (scores.length > 1) {
            main.appendChild(statsArticle);
            new Chartist.Line('#stats', {
                labels: scores.map(element => new Date(element.date).getDay()),
                series: [scores.map(element => element.score)]
            }, {
                fullWidth: true,
                chartPadding: {
                    right: 40
                },
                axisY: {
                    onlyInteger: true,
                    type: Chartist.FixedScaleAxis,
                    ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    low: 0,
                    high: 10,
                }
            });
        }

    })
    .catch(error => console.error(error));

function toBeg() {
    location.reload();
};

function isClicked(value) {
    document.querySelector(`button[value=${value}]`).classList = "answer clicked";
    Array.from(document.querySelectorAll(`section#opt button:not([value=${value}])`))
        .forEach(buttton => buttton.classList = "answer notclicked");
};

function gameFinish() {
    let today = new Date();
    let hh = String(today.getHours()).padStart(2, "0");
    let min = String(today.getMinutes()).padStart(2, "0");
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}-${hh}-${min}`;
    db.collection("scores")
        .add({
            "score": score,
            "date": today,
        })
    while (main.firstChild) {
        main.removeChild(main.lastChild)
    };
    supScore.innerText = String(score).padStart(2, "0");
    if (score < 5) {
        scoreSection.classList = "cls-3";
    } else if (score < 7) {
        scoreSection.classList = "cls-2";
    } else {
        scoreSection.classList = "cls-1";
    }
    main.append(articleResults);
    round = 0;
    answers.map(element => element.classList = "answer");
    repeatButton.addEventListener("click", toBeg);
};

function toNext(question) {
    ++round;
    progressHeading.innerText = `Question ${round+1} out of 10`;
    bar.classList = `p${round+1}`;
    if (round >= 10) {
        gameFinish();
    } else {
        questP.innerText = htmlEntities(question[round].question);
        let options = question[round].incorrect_answers;
        options.push(question[round].correct_answer);
        options.sort(() => Math.random() - 0.5);
        options.map((option, i) => {
            answers[i].innerText = htmlEntities(option);
            answers[i].value = `o-${htmlEntities(option).replace(/[,.:;$#/()!?&'"]/g, '').replace(/\s/g, '-').toLowerCase()}`;
        });
        answers.forEach(button => button.classList = "answer");
    };
};

function checkQuest(questionArray) {
    let userAnswer = document.querySelector("button.clicked");
    if (userAnswer == null) {} else if (questionArray[round].correct_answer === userAnswer.innerHTML) {
        ++score;
        toNext(questionArray);
    } else {
        toNext(questionArray);
    };
};

function htmlEntities(str) {
    let txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
};

function toQuiz() {
    while (main.firstChild) {
        main.removeChild(main.lastChild)
    };
    fetch(API_URL).then(res => res.json())
        .then(questJSON => {
            let questTextNode = document.createTextNode(htmlEntities(questJSON.results[round].question));
            questP.appendChild(questTextNode);
            let options = questJSON.results[round].incorrect_answers;
            options.push(questJSON.results[round].correct_answer);
            options.sort(() => Math.random() - 0.5);
            options.forEach((option, i) => {
                answers[i].innerText = htmlEntities(option)
                answers[i].value = `o-${htmlEntities(option).replace(/[,.:;$#/()!?&'"]/g, '').replace(/\s/g, '-').toLowerCase()}`;
            });
            answers.forEach(answer => answer.addEventListener("click", () => isClicked(answer.value)));
            nextButton.addEventListener("click", () => checkQuest(questJSON.results));
            round = 0;
            score = 0;
            progressHeading.innerText = `Question ${round+1} out of 10`;
            main.appendChild(questDiv);
            main.appendChild(ProgressBar);
        });
};

quizButton.addEventListener("click", toQuiz);
document.querySelector("img").addEventListener("click", ()=> location.reload());