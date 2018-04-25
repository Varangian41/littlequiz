const Q1 = new Question('What is the capital of France?', ['Montpellier', 'Paris', 'Bordeaux', 'Marseille'], 1);
const Q2 = new Question('Who was the last tsar of Russia?', ['Alexander III', 'Ivan the Terrible', 'Alexander I', 'Nicholas II'], 3);
const Q3 = new Question('What is the dominant religion of India?', ['Hinduism', 'Buddhism', 'Islam', 'Christianity'], 0);
const Q4 = new Question('When did WWII start?', ['1941', '1939', '1940', '1937'], 1);
const Q5 = new Question('Which composer wrote the Ode of Joy?', ['Mozart', 'Bach', 'Beethoven', 'Strauss'], 2);

const ctrl = new AppController(new DataController([Q1, Q2, Q3, Q4, Q5]), new UIController());
ctrl.init();