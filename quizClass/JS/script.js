class Quiz {
    #name
    #length
    constructor(name, ...question){
        this.#name = name;
        this.#length = question.length;

    }
    get name () {return this.#name};
    set name (name) {return this.#name = name};
    get length (){return this.#length};
}
class Question {
    #q
    #o1
    #o2
    #o3
    #o4
    #b1
    #b2
    #b3
    #b4
    constructor({question, option1, option2, option3, option4, booO1, booO2, booO3, booO4}){
        this.#q = question;
        this.#o1 = option1;
        this.#o2 = option2;
        this.#o3 = option3;
        this.#o4 = option4;
        this.#b1 = booO1 || false;
        this.#b2 = booO2 || false;
        this.#b3 = booO3 || false;
        this.#b4 = booO4 || false;
    }
    get q () {return this.#q};
    set q (question) { return this.#q = question};
    get o1 () {return this.#o1};
    set o1 (option1) {return this.#o1 = option1};
    get b1 () {return this.#b1};
    set b1 (boolean1) {return this.#b1 = boolean1};
    get o2 () {return this.#o2};
    set o2 (option2) {return this.#o2 = option2};
    get b2 () {return this.#b2};
    set b2 (boolean2) {return this.#b2 = boolean2};
    get o3 () {return this.#o3};
    set o3 (option3) {return this.#o3 = option3};
    get b3 () {return this.#b3};
    set b3 (boolean3) {return this.#b3 = boolean3};
    get o4 () {return this.#o4};
    set o4 (option4) {return this.#o4 = option4};
    get b4 () {return this.#b4};
    set b4 (boolean4) {return this.#b4 = boolean4};
}
let quest ={
    question:"¿De que color es el cielo?",
    option1: "De color amarillo",
    booO1: false,
    option2: "De color azul",
    booO2: true,
    option3: "De color rojo",
    booO3: false,
    option4: "De color verde",
    boo04:false,
}
let quest1 ={
    question:"¿Cuando pasan las cigueñas por Madrid?",
    option1: "En Agosto",
    booO1: false,
    option2: "En Octubre",
    booO2: false,
    option3: "En enero",
    booO3: false,
    option4: "Ya no vienen #CalentamientoGlobal",
    boo04:true,
}
function check (element){
   if (element.innerHTML === "check_box_outline_blank"){
       element.innerHTML = "check_box";
   }else{
        element.innerHTML = "check_box_outline_blank";
   };
}
function addAnswer(event){
    event.preventDefault();
    // Que por lo menos haya una respuesta marcada como correcta
    if(document.querySelectorAll("div.wrapper > input[type=checkbox]:checked") == null){
        alert("Marca una respuesta correcta porfa");
    }
    // Cuatro opciones llenas
    // Pregunta llena
    event.target.submit();
}
let Quest = new Question(quest);
let Quest1 = new Question(quest1);
let Quiz1 = new Quiz("Quiz de prueba", Quest, Quest1);
let s1 = document.getElementById("s1");
let s2 = document.getElementById("s2");
let s3 = document.getElementById("s3");
let s4 = document.getElementById("s4");
document.getElementById(s1.id).addEventListener("click",()=> check(s1));
document.getElementById(s2.id).addEventListener("click",()=> check(s2));
document.getElementById(s3.id).addEventListener("click",()=> check(s3));
document.getElementById(s4.id).addEventListener("click",()=> check(s4));
document.getElementById("send").addEventListener("submit", event => addAnswer(event));