const q1 = {
    name: "viajes",
    legend: "¿A dónde te gustaría ir de viaje?",
    answers: [
        {label: "Playa", value:"playa"},
        {label:"Montaña", value:"montana"},
        {label:"Al pueblo", value:"pueblo"},
        {label:"Cualquier sitio en el que me pueda quejar", value: "quejar"}
    ],
    correct:"playa",
};

const q2 = {
    name: "cumple",
    legend: "¿Qué me vas a regalar por mi cumple?",
    answers: [
        {label: "Ropa", value:"ropa"},
        {label:"Comida", value:"comida"},
        {label:"Mimos", value:"mimos"},
        {label:"¿Tu cumple fue ayer? Ups", value: "nada"}
    ],
    correct:"comida",
};

const questions = [ q1, q2 ];

function printQuestion (question) {
    let form = document.createElement("form");
    form.setAttribute("name", question.name);
    let legend = document.createElement("legend");
    let labelText = document.createTextNode(question.legend);
    legend.appendChild(labelText);
    form.appendChild(legend);
    question.answers.map(option => {
        let input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("value", option.value);
        input.setAttribute("name", question.name)
        let label = document.createElement("label");
        let labelText = document.createTextNode(option.label);
        label.appendChild(labelText);
        label.appendChild(input);
        form.appendChild(label);
        return document.querySelector("main").appendChild(form);
    });
    let nextButton = document.createElement("input");
    nextButton.setAttribute("type", "submit");
    nextButton.setAttribute("value", "Next");
    form.appendChild(nextButton);

    function checkQuestion (event) {
        event.preventDefault();
        let userInput = document.querySelector(`input[type=radio][name=${question.name}]:checked`);
        if (userInput === null){
            console.error("Porfi responde");
        }else if(userInput.value === question.correct){
            console.log("Respuesta Correcta!");
        }else{
            console.warn("Respuesta Incorrecta");
            console.log(userInput);

        }
    }
    form.addEventListener("submit", (event) => checkQuestion(event));
    return form;
}

function printQuestions (questions) {
 return questions.map(question => printQuestion(question))
}