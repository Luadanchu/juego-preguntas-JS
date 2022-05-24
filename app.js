
const introduccion = document.getElementById('introduccion');
const pregunta = document.getElementById('question');
const opciones = Array.from(document.getElementsByClassName('choice-text'));
 
const scoreText = document.getElementById('score');

const nombreJugador = document.getElementById('username');
const botonScore = document.getElementById('scoreBoton');
const scoreFinal = document.getElementById('scoreFinal');
const ultimoScore = localStorage.getItem('ultimoScore');

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
        localStorage.setItem('ultimoScore', score);
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

            Toastify({
                text: "Gool!",
                duration: 2000,
                gravity: "top", 
                position: "right",
                className: "alert",
                style: {
                  background: "#28a745",
                },
              }).showToast();

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

//LOCAL STORAGE => FIN JUEGO

const mayoresScores = JSON.parse(localStorage.getItem('mayoresScores')) || [];
//console.log(mayoresScores)
 
scoreFinal.innerText = ultimoScore;

nombreJugador.addEventListener('keyup', () => {
    botonScore.disabled = !nombreJugador.value;
    //console.log(nombreJugador.value)
});

guardarPuntaje = (e) => {
    e.preventDefault();

    const score = {
        score: ultimoScore,
        name: nombreJugador.value,
    };
    mayoresScores.push(score);
    mayoresScores.sort((a, b) => b.score - a.score);

    //REEMPLAZO EL LOCAL STORAGE
    localStorage.setItem('mayoresScores', JSON.stringify(mayoresScores));
    window.location.assign('./index.html');

    //console.log(mayoresScores)
};