class Question{
    constructor(question, answers, correct) {
        this.content = question;
        this.answers = answers;
        this.correct = correct;
    }

}

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
            progressBar: document.getElementById('progress-bar')
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
        this.timeoutStart();       
    }

    restartQuiz() {
        this.DOMStrings.header.classList.add('close-up');
        this.DOMStrings.header.classList.remove('small-headfoot');
        this.DOMStrings.footer.classList.add('close-up');
        this.DOMStrings.footer.classList.remove('small-headfoot');
        this.DOMStrings.startBtn.classList.remove('hide-btn');
        this.DOMStrings.startBtn.style.display = 'inline';
        this.DOMStrings.progressBar.style.width = '0';
        this.DOMStrings.resDisp.classList.remove('result');
        this.DOMStrings.resDisp.classList.add('hide', 'result-hidden');
        this.DOMStrings.quizDisp.classList.remove('hide');
        this.DOMStrings.quizDisp.classList.add('start-position');
        this.DOMStrings.scoreDisp.textContent = 'Your Score is: ';
        
    }

}

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

    init() {

        this.handleAnswer();
        this.handleStart();
        this.handleRestart();
        this.UICtrl.setQuestion(this.DataCtrl.Data);

    }

}


const Q1 = new Question('What is the capital of France?', ['Montpellier', 'Paris', 'Bordeaux', 'Marseille'], 1);
const Q2 = new Question('Who was the last tsar of Russia?', ['Alexander III', 'Ivan the Terrible', 'Alexander I', 'Nicholas II'], 3);
const Q3 = new Question('What is the dominant religion of India?', ['Hinduism', 'Buddhism', 'Islam', 'Christianity'], 0);
const Q4 = new Question('When did WWII start?', ['1941', '1939', '1940', '1937'], 1);
const Q5 = new Question('Which composer wrote the Ode of Joy?', ['Mozart', 'Bach', 'Beethoven', 'Strauss'], 2);

const ctrl = new AppController(new DataController([Q1, Q2, Q3, Q4, Q5]), new UIController());
ctrl.init();