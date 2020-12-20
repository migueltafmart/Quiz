let quest ={
    question:"¿De que color es el cielo?",
    option1: "De color amarillo",
    booO1: false,
    option2: "De color azul",
    booO2: true,
    option3: "De color rojo",
    booO3: false,
    option4: "De color verde",
    booO4:false,
}
let quest1 ={
    question:"¿Cuando pasan las cigueñas por Madrid?",
    option1: "En Agosto",
    booO1: false,
    option2: "En Octubre",
    booO2: true,
    option3: "En enero",
    booO3: false,
    option4: "Ya no vienen #CalentamientoGlobal",
    booO4:true,
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
let Quiz1 = new Quiz("Quiz de prueba", "Este quiz es de prueba y tiene preguntas de prueba dentro.", Quest, Quest1);
let s1 = document.getElementById("s1");
let s2 = document.getElementById("s2");
let s3 = document.getElementById("s3");
let s4 = document.getElementById("s4");
document.getElementById(s1.id).addEventListener("click",()=> check(s1));
document.getElementById(s2.id).addEventListener("click",()=> check(s2));
document.getElementById(s3.id).addEventListener("click",()=> check(s3));
document.getElementById(s4.id).addEventListener("click",()=> check(s4));
document.getElementById("send").addEventListener("submit", event => addAnswer(event));
