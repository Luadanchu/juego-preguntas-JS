

const tablaPuntajes = document.getElementById("tablaPuntajes");
const puntajes = JSON.parse(localStorage.getItem("mayoresScores")) || [];

//IMPRIMIR PUNTAJES EN HTML
tablaPuntajes.innerHTML = puntajes
  .map(score => {
    return `<li class="high-score">${score.name} / ${score.score}</li>`;
  })
  .join("");