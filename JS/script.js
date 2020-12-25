const API_URL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
const main = document.querySelector("main");
let score = 0;
let round = 0;
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

if (localStorage.quizes && (JSON.parse(localStorage.quizes).length > 1)) {
    let dates = JSON.parse(localStorage.quizes);
    while (dates.length > 5) {
        dates.splice(0, 1)
    };
    main.appendChild(statsArticle);
    new Chartist.Line('#stats', {
        labels: dates.map(element => new Date(element.date).getDate()).sort(),
        series: [dates.map(element => element.score)]
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
};

function toBeg() {
    while (main.firstChild) {
        main.removeChild(main.lastChild)
    };
    main.appendChild(homeArticle);
    let dates = JSON.parse(localStorage.quizes);
    if (localStorage.quizes && (JSON.parse(localStorage.quizes).length > 1)) {
        let dates = JSON.parse(localStorage.quizes);
        while (dates.length > 5) {
            dates.splice(0, 1)
        };
        main.appendChild(statsArticle);
        new Chartist.Line('#stats', {
            labels: dates.map(element => new Date(element.date).getDate()).sort(),
            series: [dates.map(element => element.score)]
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
    };
};

function isClicked(value) {
    document.querySelector(`button[value=${value}]`).classList = "answer clicked";
    Array.from(document.querySelectorAll(`section#opt button:not([value=${value}])`))
        .forEach(buttton => buttton.classList = "answer notclicked");
};

function gameFinish() {
    let quizes = [];
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    let newQuiz = {
        "score": score,
        "date": today,
    };
    if (localStorage.quizes) {
        quizes = JSON.parse(localStorage.quizes)
    };
    quizes.push(newQuiz);
    localStorage.quizes = JSON.stringify(quizes);
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
            main.appendChild(questDiv);
        });
};

quizButton.addEventListener("click", toQuiz);