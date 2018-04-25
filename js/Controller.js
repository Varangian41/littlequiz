class AppController {

    constructor(DataCtrl, UiCtrl) {
        this.DataCtrl = DataCtrl;
        this.UICtrl = UiCtrl;
    }

    handleAnswer() {

        this.UICtrl.DOMStrings.quizDisp.addEventListener('click', (event) => {

            if (event.target.tagName === 'BUTTON') {
                this.DataCtrl.updateAnswers(parseInt(event.target.getAttribute('id'), 10));
                this.UICtrl.nextQuestion(this.DataCtrl.Data);
                this.UICtrl.extendProgress(this.DataCtrl.progressHelper());
            }

        });

    }

    handleStart() {

        this.UICtrl.DOMStrings.startBtn.addEventListener('click', () => {
            this.UICtrl.startQuiz();
        });

    }

    handleRestart() {

        this.UICtrl.DOMStrings.reset.addEventListener('click', () => {
            // CONTINUE WORK HERE!
            this.UICtrl.restartQuiz();
            this.DataCtrl.resetData();
            this.UICtrl.setQuestion(this.DataCtrl.Data);
        });

    }

    handleClose() {

        this.UICtrl.DOMStrings.closeQuiz.addEventListener('click', () => {
            this.UICtrl.restartQuiz();
            this.DataCtrl.resetData();
            this.UICtrl.setQuestion(this.DataCtrl.Data);
        });

    }

    init() {

        this.handleAnswer();
        this.handleStart();
        this.handleRestart();
        this.handleClose();
        this.UICtrl.setQuestion(this.DataCtrl.Data);

    }

}