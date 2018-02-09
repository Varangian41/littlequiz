class Question{
    constructor(question, answers, correct) {
        this.content = question;
        this.answers = answers;
        this.correct = correct;
    }

}


Q1 = new Question('What is the capital of France?', ['Montpellier', 'Paris', 'Bordeaux', 'Marseille'], 1);
Q2 = new Question('Who was the last tsar of Russia?', ['Alexander III', 'Ivan the Terrible', 'Alexander I', 'Nicholas II'], 3);
Q3 = new Question('What is the dominant religion of India', ['Hinduism', 'Buddhism', 'Islam', 'Christianity'], 0);
Q4 = new Question('When did WWII start?', ['1941', '1939', '1940', '1937'], 1);
Q5 = new Question('Which composer wrote the Ode of Joy?', ['Mozart', 'Bach', 'Beethoven', 'Strauss'], 2);


function dataController() {

    let data = {

        allQuestions: [Q1, Q2, Q3, Q4, Q5],
        position : 0,
        answers: [],
        score: 0

    };



    return {

        getData: function () {

            return data;

        },

        updateAnswers: function (el, ans) {
            if (ans !== false){
                el.answers[el.position] = ans;
                if (el.answers[el.position] === el.allQuestions[el.position].correct) {
                    el.score += 1;
                }
                data.position += 1;
            }
        },

        stepBack: function (el) {

            if (el.position !== 0) {
                el.position -= 1;
            }

            if (el.score !== 0) {
                el.score -= 1;
            }

        }

    };

}



function uiController() {

    const DOMStrings = {

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

    return {

        getDOMStrings: function () {

            return DOMStrings;

        },

        setQuestion: function (el) {

            document.getElementById(DOMStrings.question).textContent = el.allQuestions[el.position].content;

            el.allQuestions[el.position].answers.forEach((cur, ind) => {

                document.getElementById(ind).textContent = ` ${cur}`;

            });

        },

        checkSel: function () {

            let check = false;
            document.querySelectorAll(DOMStrings.radios).forEach(cur => {
                if ($(cur).prop('checked') === true) {
                    check = true;
                    this.resetWarning();
                }
            });

            if (check === false) {
                this.displayWarning();
            }

        },

        checkAnswer: function () {

            let ans = -1;
            document.querySelectorAll(DOMStrings.radios).forEach((cur, ind) => {

                if ($(cur).prop('checked') === true) {
                    ans = ind;
                    console.log(ans);
                }
            });

            if (ans !== -1){
                return ans;
            } else return false;

        },

        finishQuiz: function (el) {

            document.getElementById(DOMStrings.resDisp).classList.toggle('hide');
            document.getElementById(DOMStrings.quizDisp).classList.toggle('hide');
            document.getElementById(DOMStrings.next).classList.toggle('hide');
            document.getElementById(DOMStrings.back).classList.toggle('hide');
            document.getElementById(DOMStrings.reset).classList.toggle('hide');
            document.getElementById(DOMStrings.scoreDisp).textContent += `${el.score} out of ${el.allQuestions.length}`;


        },

        resetCheck: function (el) {

            if (el.answers[el.position] || el.answers[el.position] === 0) {
                this.fetchCheck(el)
            } else {
                $(`#inp${el.answers[el.position-1]}`).prop('checked', false);
            }

        },

        displayWarning: function () {

            if (document.getElementById(DOMStrings.alert).classList.contains('hide')) {
                document.getElementById(DOMStrings.alert).classList.remove('hide');
            }


        },

        resetWarning: function () {

            if(!document.getElementById(DOMStrings.alert).classList.contains('hide'))
            document.getElementById(DOMStrings.alert).classList.add('hide');

        },

        fetchCheck: function (el) {

                $(`#inp${el.answers[el.position]}`).prop('checked', true);

        },

        backOne: function (el) {

            this.setQuestion(el);
            this.fetchCheck(el);
            document.getElementById(DOMStrings.next).textContent = 'Next';

        },

        nextQuestion: function (el) {

            if (el.position < (el.allQuestions.length - 1)) {

                this.setQuestion(el);
                this.resetCheck(el);

            }else if (el.position === (el.allQuestions.length - 1)) {

                this.setQuestion(el);
                this.resetCheck(el);
                document.getElementById(DOMStrings.next).textContent = 'Finish!';

            } else {

                this.finishQuiz(el);

            }

        },

        resetOpacity: function () {

            document.getElementById(DOMStrings.main).style.opacity = 0;

        }

    }

}



function controller(DataCtrl, UICtrl) {

    const data = DataCtrl.getData();

    const strings = UICtrl.getDOMStrings();

    const handleNext = function () {

        document.getElementById(strings.next).addEventListener('click', function () {

            UICtrl.resetOpacity();
            handleLoad();
            UICtrl.checkSel();
            let answer = UICtrl.checkAnswer();
            DataCtrl.updateAnswers(data, answer);
            UICtrl.nextQuestion(data);

        })

    };

    const handleBack = function () {

        document.getElementById(strings.back).addEventListener('click', function () {

            UICtrl.resetOpacity();
            handleLoad();
            DataCtrl.stepBack(data);
            UICtrl.backOne(data);

        })

    };

    const handleReset = function () {

        document.getElementById(strings.reset).addEventListener('click', function () {

            location.reload();

        })
    };

    const handleRadio = function () {

        document.querySelectorAll(strings.radios).forEach((cur) => {

            cur.addEventListener('click', function () {

                $('input').attr('checked', false);
                $(`#${cur.id}`).attr('checked', true);

            });

        });

    };

    const handleLoad = function () {

        $('#main').animate({opacity: 1}, 500);

    };

    return {

        init: function () {

            handleLoad();
            handleNext();
            handleBack();
            handleRadio();
            handleReset();
            uiCtrl.setQuestion(data);

        }

    }

}


const dataCtrl = dataController();
const uiCtrl = uiController();
const ctrl = controller(dataCtrl, uiCtrl);
ctrl.init();