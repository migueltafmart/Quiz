class Quiz {
    #name
    #about
    #length
    #q1
    #q2
    #q3
    #q4
    #q5
    #q6
    #q7
    #q8
    #q9
    #q10
    constructor(name, about, ...question){
        this.#name = name;
        this.#about = about;
        this.#length = question.length;
        this.#q1 = question[0];
        this.#q2 = question[1];
        this.#q3 = question[2];
        this.#q4 = question[3];
        this.#q5 = question[4];
        this.#q6 = question[5];
        this.#q7 = question[6];
        this.#q8 = question[7];
        this.#q9 = question[8];
        this.#q10 = question[9];
    }
    get name () {return this.#name};
    set name (name) {return this.#name = name};
    get about () {return this.#about};
    set about (about) {return this.#about = about};
    get length (){return this.#length};
    get q1 () {return this.#q1};
    set q1 (q1) {return this.#q1 = q1};
    get q2 () {return this.#q2};
    set q2 (q2) {return this.#q2 = q2};
    get q3 () {return this.#q3};
    set q3 (q3) {return this.#q3 = q3};s
    get q4 () {return this.#q4};
    set q4 (q4) {return this.#q4 = q4};
    get q5 () {return this.#q5};
    set q5 (q5) {return this.#q5 = q5};
    get q6 () {return this.#q6};
    set q6 (q6) {return this.#q6 = q6};
    get q7 () {return this.#q7};
    set q7 (q7) {return this.#q7 = q7};
    get q8 () {return this.#q8};
    set q8 (q8) {return this.#q8 = q8};
    get q9 () {return this.#q9};
    set q9 (q9) {return this.#q9 = q9};
    get q10 () {return this.#q10};
    set q10 (q10) {return this.#q10 = q10};
}