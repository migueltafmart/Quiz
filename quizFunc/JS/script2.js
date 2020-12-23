const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";
const main = document.querySelector("main");
const questDiv = document.createElement("article");
questDiv.id = "quest";
const questP = document.createElement("h3");
const optDiv = document.createElement("section");
optDiv.id = "opt";
const answer1 = document.createElement("button");
const answer2 = document.createElement("button");
const answer3 = document.createElement("button");
const answer4 = document.createElement("button");
const answers = [answer1, answer2, answer3, answer4];
answers.map(answer => optDiv.appendChild(answer))
answers.map(answer => answer.classList = "answer");
const nextButton = document.createElement("button");
nextButton.id = "next";
nextButton.innerText = "Next";
questDiv.appendChild(questP);
questDiv.appendChild(optDiv);
questDiv.appendChild(nextButton);
let score = 0;
let round = 0;

function isClicked(value) {
    console.log(value);
    document.querySelector(`button[value=${value}]`).classList = "answer clicked";
    Array.from(document.querySelectorAll(`section#opt button:not([value=${value}])`))
        .map(buttton => buttton.classList = "answer notclicked");

}

function checkQuest(question) {
    console.log("Respuesta");
}

function toNext() {
    console.log("To next");
}

function htmlEntities(str) {
    let txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

const questProm = fetch(API_URL).then(res => res.json())
    .then(questJSON => {
        let questTextNode = document.createTextNode(htmlEntities(questJSON.results[0].question));
        questP.appendChild(questTextNode);
        let options = questJSON.results[0].incorrect_answers;
        options.push(questJSON.results[0].correct_answer);
        options.sort(() => Math.random() - 0.5)
        options.map((option, i) => {
            answers[i].innerText = htmlEntities(option)
            answers[i].value = `o-${htmlEntities(option).replace(/[,.:;$#/()!?&'"]/g, '').replace(/\s/g, '-').toLowerCase()}`;
            console.log(answers[i].value)
        });
        answers.map(answer => answer.addEventListener("click", () => isClicked(answer.value)));
        nextButton.addEventListener("click", () => {
            checkQuest(questJSON[0]);
            toNext();
        })
        main.appendChild(questDiv);;
    })