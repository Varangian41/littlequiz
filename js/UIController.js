class UIController {

    constructor() {
        this.DOMStrings = {
            reset: document.getElementById('reset'),
            question: document.getElementById('question'),
            quizDisp: document.getElementById('quizDisplay'),
            resDisp: document.getElementById('resultDisplay'),
            scoreDisp: document.getElementById('scoreDisplay'),
            main: document.getElementById('main'),
            header: document.getElementById('header'),
            footer: document.getElementById('footer'),
            startBtn: document.getElementById('start-button'),
            buttonWrapper: document.getElementById('button-wrapper'),
            progressBar: document.getElementById('progress-bar'),
            closeIcon: document.querySelector('.close-icon'),
            closeQuiz: document.querySelector('.close-quiz')
        };
    }

    setQuestion(el) {

        this.DOMStrings.question.textContent = el.allQuestions[el.position].content;

        el.allQuestions[el.position].answers.forEach((cur, ind) => {

            document.getElementById(ind).textContent = ` ${cur}`;

        });

    }

    finishQuiz(el) {

        this.DOMStrings.quizDisp.classList.remove('enter');
        this.DOMStrings.quizDisp.classList.add('exit');
        setTimeout(() => {
            this.DOMStrings.quizDisp.classList.remove('exit');
            this.DOMStrings.quizDisp.classList.toggle('hide');
            this.DOMStrings.resDisp.classList.remove('hide', 'result-hidden');
            this.DOMStrings.resDisp.classList.add('result');
        }, 300);
        this.DOMStrings.scoreDisp.textContent += `${el.score} out of ${el.allQuestions.length} :)`;


    }

    extendProgress(width) {
        this.DOMStrings.progressBar.style.width = `${width}%`;
    }

    questionTransition() {
        this.DOMStrings.quizDisp.classList.remove('enter');
        this.DOMStrings.quizDisp.classList.add('exit');
        setTimeout(() => {
            this.DOMStrings.quizDisp.classList.remove('exit');
            this.DOMStrings.quizDisp.classList.add('enter');
        }, 300);
    }

    nextQuestion(el) {

        if (el.position <= (el.allQuestions.length - 1)) {

            this.setQuestion(el);
            this.questionTransition();

        } else {

            this.finishQuiz(el);

        }

    }

    timeoutStart() {
        setTimeout(() => {
            this.DOMStrings.startBtn.style.display = 'none';
            this.DOMStrings.quizDisp.classList.add('enter');
            this.DOMStrings.quizDisp.classList.remove('start-position');
        }, 300);
    }

    startQuiz() {
        this.DOMStrings.header.classList.add('open-up', 'small-headfoot');
        this.DOMStrings.footer.classList.add('open-up', 'small-headfoot');
        this.DOMStrings.startBtn.classList.add('hide-btn');
        this.DOMStrings.closeIcon.classList.remove('hide');
        this.DOMStrings.closeQuiz.classList.remove('hide');
        this.timeoutStart();       
    }

    restartQuiz() {
        this.DOMStrings.header.classList.add('close-up');
        this.DOMStrings.header.classList.remove('small-headfoot', 'open-up');
        this.DOMStrings.footer.classList.add('close-up');
        this.DOMStrings.footer.classList.remove('small-headfoot', 'open-up');
        this.DOMStrings.startBtn.classList.remove('hide-btn');
        this.DOMStrings.startBtn.style.display = 'inline';
        this.DOMStrings.progressBar.style.width = '0';
        this.DOMStrings.resDisp.classList.remove('result');
        this.DOMStrings.resDisp.classList.add('hide', 'result-hidden');
        this.DOMStrings.quizDisp.classList.remove('hide');
        this.DOMStrings.quizDisp.classList.add('start-position');
        this.DOMStrings.closeIcon.classList.add('hide');
        this.DOMStrings.closeQuiz.classList.add('hide');
        this.DOMStrings.scoreDisp.textContent = 'Your Score is: ';
        setTimeout(() => {
            this.DOMStrings.header.classList.remove('close-up');
            this.DOMStrings.footer.classList.remove('close-up');
            this.DOMStrings.quizDisp.classList.remove('enter');
        }, 300);
        
    }

}