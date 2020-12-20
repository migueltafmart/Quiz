const answers = {
    p1: "azul",
    p2: "verde",
    p3: "amarillo",
    p4: "rojo",
    p5: "verde"
}

let aciertos = 0;
function chequear(num,respuesta){
    //Pregunta 1
    let options = document.querySelectorAll(`fieldset#p${num} input`);
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked && options[i].value === respuesta)
            ++aciertos;
            console.log(aciertos);
    }
}

function checkAnswers(e) {
    e.preventDefault();
    chequear(1,answers.p1)
    chequear(2,answers.p2)
    chequear(3,answers.p3)
    chequear(4,answers.p4)
    chequear(5,answers.p5)
    //e.target.submit();
};
//document.getElementById("quiz").addEventListener("submit", event => checkAnswers(event));