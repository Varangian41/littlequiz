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
        if (ans !== false){
            this.Data.answers[this.Data.position] = ans;
            if (this.Data.answers[this.Data.position] === this.Data.allQuestions[this.Data.position].correct) {
                this.Data.score += 1;
            }
            this.Data.position += 1;
        }
    }

    resetData() {
        this.Data.position = 0;
        this.Data.answers = [];
        this.Data.score = 0;
    }

}

class UIController {

    constructor() {
        this.DOMStrings = {
            reset: 'reset',
            question: 'question',
            quizDisp: 'quizDisplay',
            resDisp: 'resultDisplay',
            scoreDisp: 'scoreDisplay',
            main: 'main',
            header: 'header',
            footer: 'footer',
            startBtn: 'start-button',
            buttonWrapper: 'button-wrapper'
        };
    }

    setQuestion(el) {

        document.getElementById(this.DOMStrings.question).textContent = el.allQuestions[el.position].content;

        el.allQuestions[el.position].answers.forEach((cur, ind) => {

            document.getElementById(ind).textContent = ` ${cur}`;

        });

    }

    finishQuiz(el) {

        document.getElementById(this.DOMStrings.resDisp).classList.toggle('hide');
        document.getElementById(this.DOMStrings.quizDisp).classList.remove('enter');
        document.getElementById(this.DOMStrings.quizDisp).classList.add('exit');
        setTimeout(() => {
            document.getElementById(this.DOMStrings.quizDisp).classList.remove('exit');
            document.getElementById(this.DOMStrings.quizDisp).classList.toggle('hide');
        }, 300);
        document.getElementById(this.DOMStrings.scoreDisp).textContent += `${el.score} out of ${el.allQuestions.length}`;


    }

    nextQuestion(el) {

        if (el.position <= (el.allQuestions.length - 1)) {

            this.setQuestion(el);
            document.getElementById(this.DOMStrings.quizDisp).classList.remove('enter');
            document.getElementById(this.DOMStrings.quizDisp).classList.add('exit');
            setTimeout(() => {
                document.getElementById(this.DOMStrings.quizDisp).classList.remove('exit');
                document.getElementById(this.DOMStrings.quizDisp).classList.add('enter');
            }, 300)

        } else {

            this.finishQuiz(el);

        }

    }

    timeoutNext() {

    }

    timeoutStart() {
        setTimeout(() => {
            document.getElementById(this.DOMStrings.startBtn).style.display = 'none'; 
            document.getElementById(this.DOMStrings.buttonWrapper).style.display = 'none';
            document.getElementById(this.DOMStrings.quizDisp).classList.add('enter');
            document.getElementById(this.DOMStrings.quizDisp).classList.remove('start-position');
        }, 300);
    }

    startQuiz() {
        document.getElementById(this.DOMStrings.header).classList.add('open-up', 'small-headfoot');
        document.getElementById(this.DOMStrings.footer).classList.add('open-up', 'small-headfoot');
        document.getElementById(this.DOMStrings.startBtn).classList.add('hide-btn');
        this.timeoutStart();       
    }

}

class AppController {

    constructor(DataCtrl, UiCtrl) {
        this.DataCtrl = DataCtrl;
        this.UICtrl = UiCtrl;
    }

    handleAnswer() {

        document.getElementById(this.UICtrl.DOMStrings.quizDisp).addEventListener('click', (event) => {

            if (event.target.tagName === 'BUTTON') {
                this.DataCtrl.updateAnswers(parseInt(event.target.getAttribute('id'), 10));
                this.UICtrl.nextQuestion(this.DataCtrl.Data);
            }

        });

    }

    handleStart() {

        document.querySelector('#start-button').addEventListener('click', () => {
            this.UICtrl.startQuiz();
        });

    }

    handleRestart() {

        document.getElementById(this.UICtrl.DOMStrings.reset).addEventListener('click', () => {
            this.UICtrl.restartQuiz();
            this.DataCtrl.resetData();
        });

    }

    init() {

        this.handleAnswer();
        this.handleStart();
        this.UICtrl.setQuestion(this.DataCtrl.Data);

    }

}


const Q1 = new Question('What is the capital of France?', ['Montpellier', 'Paris', 'Bordeaux', 'Marseille'], 1);
const Q2 = new Question('Who was the last tsar of Russia?', ['Alexander III', 'Ivan the Terrible', 'Alexander I', 'Nicholas II'], 3);
const Q3 = new Question('What is the dominant religion of India', ['Hinduism', 'Buddhism', 'Islam', 'Christianity'], 0);
const Q4 = new Question('When did WWII start?', ['1941', '1939', '1940', '1937'], 1);
const Q5 = new Question('Which composer wrote the Ode of Joy?', ['Mozart', 'Bach', 'Beethoven', 'Strauss'], 2);

const ctrl = new AppController(new DataController([Q1, Q2, Q3, Q4, Q5]), new UIController());
ctrl.init();