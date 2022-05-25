
//CUENTA REGRESIVA INICIO MUNDIAL => 21 noviembre 2022 13hs hora Arg.
const tiempoFalta = deadline => {
  let hoy = new Date(),
    inicioMundial = (new Date(deadline) - hoy + 1000) / 1000; // div 1000 para tener seg y + 1000 para la actualización
  let inicioMundialSeg = ("0" + Math.floor(inicioMundial % 60)).slice(-2),
    inicioMundialMin = ("0" + Math.floor(inicioMundial / 60 % 60)).slice(-2),
    inicioMundialHs = ("0" + Math.floor(inicioMundial / 3600 % 24)).slice(-2),
    inicioMundialDias = Math.floor(inicioMundial / (3600 * 24));
  return {
    inicioMundial,
    inicioMundialSeg,
    inicioMundialMin,
    inicioMundialHs,
    inicioMundialDias,
  };
};
//PARA QUE SE IMPRIMA EN HTML
const cuentaReg = (deadline, el, mensaje) => {
  el = document.getElementById("countdown");
  setInterval(() => {
    let tiempo = tiempoFalta(deadline);
    el.innerText = `Para el mundial faltan ${tiempo.inicioMundialDias}d - ${tiempo.inicioMundialHs}h - ${tiempo.inicioMundialMin}m - ${tiempo.inicioMundialSeg}s`
    if (tiempo.inicioMundial <= 1) {
      clearInterval(timerUpdate);
      el.innerText = mensaje;
    }
  }, 1000)
};
cuentaReg(`Nov 21 2022 13:00:00 GMT-0300`, `countdown`, `Empieza el mundial Qatar 2022!!`);






//TABLA DE PUNTAJES => no se quedan en el otro archivo

const tablaPuntajes = document.getElementById("tablaPuntajes");
const puntajes = JSON.parse(localStorage.getItem("mayoresScores")) || [];

//IMPRIMIR PUNTAJES EN HTML
tablaPuntajes.innerHTML = puntajes
  .map(score => {
    return `<li class="high-score">${score.score} - ${score.name}</li>`;
  })
  .join("");


