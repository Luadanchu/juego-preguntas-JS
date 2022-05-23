
const introduccion = document.getElementById('introduccion');
const pregunta = document.getElementById('question');
const opciones = Array.from(document.getElementsByClassName('choice-text'));

const scoreText = document.getElementById('score');

let preguntaActual = {};
let respuestasVer = false;
let score = 0;
let indPregunta = 0;
let arrayPregDisp = [];
let preguntas = [];

//PUNTOS
const sumaPuntos3 = 3;
const cantPreguntas = 3;

//TRAIGO EL JSON
fetch('questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        preguntas = loadedQuestions;
        iniciarJuego();
    })
    .catch((err) => {
        console.error(err);
    });



//EMPEZAR EL JUEGO
iniciarJuego = () => {
    indPregunta = 0;
    score = 0;
    arrayPregDisp = [...preguntas];
    imprimirNuevaPreg();

    //console.log(arrayPregDisp); //Funciona!!
};

imprimirNuevaPreg = () => {
    if (arrayPregDisp.length === 0 || indPregunta >= cantPreguntas) {

        //LOCAL STORAGE
        localStorage.setItem('mostRecentScore', score);
        //QUE ME LLEVE AL FINAL DEL JUEGO
        return window.location.assign('./final.html');
    };

    indPregunta++;

    let indPreg = Math.floor(Math.random() * arrayPregDisp.length);
    preguntaActual = arrayPregDisp[indPreg];
    pregunta.innerText = preguntaActual.pregunta;
    introduccion.innerText = preguntaActual.introduccion;

    opciones.forEach((opcion) => {
        let nro = opcion.dataset['number'];
        opcion.innerText = preguntaActual['opcion' + nro];
    });

    //PARA NO REPETIR LAS PREGUNTAS
    arrayPregDisp.splice(indPreg, 1);
    respuestasVer = true;
};

opciones.forEach((opcion) => {
    opcion.addEventListener('click', (e) => {
        //console.log(e.target)
        if (!respuestasVer) return;

        respuestasVer = false;
        const opcionSeleccionada = e.target;
        const selectedAnswer = opcionSeleccionada.dataset['number'];

        //COLORES DE RESPUESTAS
        const tipoDeRta = selectedAnswer == preguntaActual.verdadera ? 'correct' : 'incorrect';

        if (tipoDeRta === 'correct') {
            puntajejugador(sumaPuntos3);
        }

        opcionSeleccionada.parentElement.classList.add(tipoDeRta);

        setTimeout(() => {
            opcionSeleccionada.parentElement.classList.remove(tipoDeRta);
            imprimirNuevaPreg();
        }, 1000);

        // console.log(tipoDeRta); //Funciona => trae el nro
    });
});

puntajejugador = (i) => {
    score += i;
    scoreText.innerText = score;
};







//TABLA DE POSICIONES => FIN JUEGO
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
 
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};