const backButton = document.createElement("button");
backButton.innerHTML = "Back";
backButton.id ="back";
const createButton = document.getElementById("create");
const editButton = document.getElementById("edit");

function back () {
    document.querySelector("main > div.wrapper").removeChild(backButton);
    document.querySelector("main > div.wrapper").appendChild(createButton);
    document.querySelector("main > div.wrapper").appendChild(editButton);

}
function createQuiz (){
    console.log("Creando un Quiz...")
    //Pintar un módulo Quiz nuevo,
    //Pintar un módulo Question nuevo,
    // Pintar Botón añadir pregunta
};
function editQuiz () {
    console.log("Editando un Quiz...")
    // Pintar Mödulo con Todos los Quizes existentes
};

function nav (button) {
    document.querySelector("main > div.wrapper").removeChild(document.getElementById("create"));
    document.querySelector("main > div.wrapper").removeChild(document.getElementById("edit"));
    document.querySelector("main > div.wrapper").appendChild(backButton);
    if (button == createButton){
        createQuiz();
    }
    if (button == editButton){
        editQuiz();
    }
    
};

createButton.addEventListener("click", () => nav(createButton));
editButton.addEventListener("click", () => nav(editButton));
backButton.addEventListener("click", back);