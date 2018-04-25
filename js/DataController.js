class DataController {
    
    constructor(allQuestions) {
        this.Data = {
            allQuestions: [],
            position: 0,
            answers: [],
            score: 0
        };
        this.Data.allQuestions = allQuestions;
    }

    updateAnswers(ans) {
        this.Data.answers[this.Data.position] = ans;
        if (this.Data.answers[this.Data.position] === this.Data.allQuestions[this.Data.position].correct) {
            this.Data.score += 1;
        }
        this.Data.position += 1;
    }

    resetData() {
        this.Data.position = 0;
        this.Data.answers = [];
        this.Data.score = 0;
    }

    progressHelper() {
        return ((this.Data.position/this.Data.allQuestions.length)*100);
    }

}