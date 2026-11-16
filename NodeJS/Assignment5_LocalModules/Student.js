
class student {


    constructor(name, marks) {
        this.name = name;
        this.marks = marks;
    }

    isPassed() {
        if (this.marks >= 40) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = { student };