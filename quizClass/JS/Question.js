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