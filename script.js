/*les questions du quiz(tableau d'objets)*/
const questions = [
    {
        question: "Quelle est la syntaxe correcte pour afficher 'Hello World' dans la console ?",
        answer: [
            { text: "console.log('Hello World');", correct: true },
            { text: "print('Hello World');", correct: false },
            { text: "echo 'Hello World';", correct: false },
            { text: "log.console('Hello World');", correct: false },
        ],
    },
    {
        question: "Quel mot-clé est utilisé pour déclarer une variable en JavaScript ?",
        answer: [
            { text: "var", correct: true },
            { text: "int", correct: false },
            { text: "float", correct: false },
            { text: "char", correct: false },
        ],
    },
    {
        question: "Lequel des éléments suivants n'est pas un type de données JavaScript ?",
        answer: [
            { text: "String", correct: false },
            { text: "Number", correct: false },
            { text: "Boolean", correct: false },
            { text: "Float", correct: true },
        ],
    },
    {
        question: "Quel est le résultat de `typeof null` en JavaScript ?",
        answer: [
            { text: "null", correct: false },
            { text: "object", correct: true },
            { text: "undefined", correct: false },
            { text: "string", correct: false },
        ],
    },
    {
        question: "Quelle méthode est utilisée pour convertir JSON en objet JavaScript ?",
        answer: [
            { text: "JSON.parse()", correct: true },
            { text: "JSON.stringify()", correct: false },
            { text: "JSON.convert()", correct: false },
            { text: "JSON.objectify()", correct: false },
        ],
    },
    {
        question: "À quoi fait référence le mot-clé 'this' en JavaScript ?",
        answer: [
            { text: "L'objet courant", correct: true },
            { text: "L'objet global", correct: false },
            { text: "L'objet parent", correct: false },
            { text: "L'élément DOM", correct: false },
        ],
    },
    {
        question: "Quelle méthode ajoute un ou plusieurs éléments à la fin d'un tableau ?",
        answer: [
            { text: "push()", correct: true },
            { text: "pop()", correct: false },
            { text: "shift()", correct: false },
            { text: "unshift()", correct: false },
        ],
    },
    {
        question: "Lequel des éléments suivants est utilisé pour créer une fonction asynchrone ?",
        answer: [
            { text: "async", correct: true },
            { text: "await", correct: false },
            { text: "setTimeout", correct: false },
            { text: "then", correct: false },
        ],
    },
    {
        question: "Que fait l'opérateur '===' en JavaScript ?",
        answer: [
            { text: "Compare seulement les valeurs", correct: false },
            { text: "Compare les valeurs et les types", correct: true },
            { text: "Assigne une valeur", correct: false },
            { text: "Aucune des réponses ci-dessus", correct: false },
        ],
    },
    {
        question: "Quelle méthode peut être utilisée pour sélectionner un élément HTML par son ID ?",
        answer: [
            { text: "document.getElementById()", correct: true },
            { text: "document.querySelector()", correct: false },
            { text: "document.selectElement()", correct: false },
            { text: "document.getElementByClass()", correct: false },
        ],
    },
];
/*cibler l'élément HTML où la question sera affichée.*/
const questionElement = document.getElementById("question");

/*cibler le conteneur où les boutons de réponses seront insérés.*/
const answerButton = document.getElementById("answer-buttons");

/*cibler le bouton Suivant qui permet de passer à la question suivante.*/
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0; /*compteur pour suivre l'index de la question courante*/
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Suivant";
    showQuestion();/*afficher la première question en appelant cette fonction*/
}

function showQuestion() {
    resetState();/*supprime toutes les réponses précédemment affichées et cache le bouton Suivant
     pour le préparer à un nouvel affichage après une sélection de réponse.*/
    let currentQuestion = questions[currentQuestionIndex];/*contient la question et ses réponses*/
    let questionNo = currentQuestionIndex + 1; /*affiche le num de la question dans l'interface user*/
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;/*affiche num avec son quest*/

    currentQuestion.answer.forEach((answer) => {
        const button = document.createElement("button");/*bouton HTML est créé dynamiquement pour chaque option de réponse*/
        button.innerHTML = answer.text;/*affichage du texte de la réponse*/
        button.classList.add("btn");/*Le bouton aura les styles associés à la classe .btn par la méthode classList*/
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);/*selectAnswer pour vérifier si la réponse est correcte ou non*/
        answerButton.appendChild(button);/*le bouton sera visible à l'utilisateur*/
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {/*e: event qui a déclenché la fonction*/
    const selectedButton = e.target;/*identifie l'élément sur lequel l'utilisateur a agi*/
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `Votre score est ${score} sur ${questions.length}!`;
    nextButton.innerHTML = "Recommencer";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
