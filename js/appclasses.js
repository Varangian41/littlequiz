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

    updateAnswers( ans) {
        if (ans !== false){
            this.Data.answers[this.Data.position] = ans;
            if (this.Data.answers[this.Data.position] === this.Data.allQuestions[this.Data.position].correct) {
                this.Data.score += 1;
            }
            this.Data.position += 1;
        }
    }

    stepBack() {

        if (this.Data.position !== 0) {
            this.Data.position -= 1;
        }

        if (this.Data.score !== 0) {
            this.Data.score -= 1;
        }

    }

}

class UIController {

    constructor() {
        this.DOMStrings = {
            next: 'next',
            back: 'back',
            reset: 'reset',
            alert: 'alert',
            o0: '0',
            o1: '1',
            o2: '2',
            o3: '3',
            input0: 'inp0',
            input1: 'inp1',
            input2: 'inp2',
            input3: 'inp3',
            question: 'question',
            radios: 'input',
            quizDisp: 'quizDisplay',
            resDisp: 'resultDisplay',
            scoreDisp: 'scoreDisplay',
            main: 'main'
        };
    }

    setQuestion(el) {

        document.getElementById(this.DOMStrings.question).textContent = el.allQuestions[el.position].content;

        el.allQuestions[el.position].answers.forEach((cur, ind) => {

            document.getElementById(ind).textContent = ` ${cur}`;

        });

    }

    checkSel() {

        let check = false;
        document.querySelectorAll(this.DOMStrings.radios).forEach(cur => {
            if ($(cur).prop('checked') === true) {
                check = true;
                this.resetWarning();
            }
        });

        if (check === false) {
            this.displayWarning();
        }

    }

    checkAnswer() {

        let ans = -1;
        document.querySelectorAll(this.DOMStrings.radios).forEach((cur, ind) => {

            if ($(cur).prop('checked') === true) {
                ans = ind;
                console.log(ans);
            }
        });

        if (ans !== -1){
            return ans;
        } else return false;

    }

    finishQuiz(el) {

        document.getElementById(this.DOMStrings.resDisp).classList.toggle('hide');
        document.getElementById(this.DOMStrings.quizDisp).classList.toggle('hide');
        document.getElementById(this.DOMStrings.next).classList.toggle('hide');
        document.getElementById(this.DOMStrings.back).classList.toggle('hide');
        document.getElementById(this.DOMStrings.reset).classList.toggle('hide');
        document.getElementById(this.DOMStrings.scoreDisp).textContent += `${el.score} out of ${el.allQuestions.length}`;


    }

    resetCheck(el) {

        if (el.answers[el.position] || el.answers[el.position] === 0) {
            this.fetchCheck(el)
        } else {
            $(`#inp${el.answers[el.position-1]}`).prop('checked', false);
        }

    }

    displayWarning() {

        if (document.getElementById(this.DOMStrings.alert).classList.contains('hide')) {
            document.getElementById(this.DOMStrings.alert).classList.remove('hide');
        }


    }

    resetWarning() {

        if(!document.getElementById(this.DOMStrings.alert).classList.contains('hide'))
        document.getElementById(this.DOMStrings.alert).classList.add('hide');

    }

    fetchCheck(el) {

            $(`#inp${el.answers[el.position]}`).prop('checked', true);

    }

    backOne(el) {

        this.setQuestion(el);
        this.fetchCheck(el);
        document.getElementById(this.DOMStrings.next).textContent = 'Next';

    }

    nextQuestion (el) {

        if (el.position < (el.allQuestions.length - 1)) {

            this.setQuestion(el);
            this.resetCheck(el);

        }else if (el.position === (el.allQuestions.length - 1)) {

            this.setQuestion(el);
            this.resetCheck(el);
            document.getElementById(this.DOMStrings.next).textContent = 'Finish!';

        } else {

            this.finishQuiz(el);

        }

    }

    resetOpacity() {

        document.getElementById(this.DOMStrings.main).style.opacity = 0;

    }

}

class AppController {

    constructor(DataCtrl, UiCtrl) {
        this.DataCtrl = DataCtrl;
        this.UICtrl = UiCtrl;
    }

    handleNext() {

        const self = this;

        document.getElementById(this.UICtrl.DOMStrings.next).addEventListener('click', function () {

            self.UICtrl.resetOpacity();
            self.handleLoad();
            self.UICtrl.checkSel();
            let answer = self.UICtrl.checkAnswer();
            self.DataCtrl.updateAnswers(answer);
            self.UICtrl.nextQuestion(self.DataCtrl.Data);

        })

    };

    handleBack() {

        const self = this;

        document.getElementById(this.UICtrl.DOMStrings.back).addEventListener('click', function () {

            self.UICtrl.resetOpacity();
            self.handleLoad();
            self.DataCtrl.stepBack(self.DataCtrl.Data);
            self.UICtrl.backOne(self.DataCtrl.Data);

        })

    };

    handleReset() {

        document.getElementById(this.UICtrl.DOMStrings.reset).addEventListener('click', function () {

            location.reload();

        })
    };

     handleRadio() {

        document.querySelectorAll(this.UICtrl.DOMStrings.radios).forEach((cur) => {

            cur.addEventListener('click', function () {

                $('input').attr('checked', false);
                $(`#${cur.id}`).attr('checked', true);

            });

        });

    };

    handleLoad() {

        $('#main').animate({opacity: 1}, 500);

    };

    

    init() {

        this.handleLoad();
        this.handleNext();
        this.handleBack();
        this.handleRadio();
        this.handleReset();
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