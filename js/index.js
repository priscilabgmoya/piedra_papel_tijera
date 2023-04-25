const ganador = 10,
  perdedor = -5,
  empate = 5,
  movimiento = ["piedra", "papel", "tijera"],
  reloj_vista = document.getElementById("reloj"),
  bodyResultado = document.getElementById("bodyResultado"),
  puntos_user = document.getElementById("puntos_usuario"),
  puntos_pc = document.getElementById("puntos_pc");

let pto_user = 0,
  pto_pc = 0,
  vueltas = 0,
  seleccionado_jugador = "",
  vuelta = 1;

$("#btnIniciarPartida").on('click', function () {
  inciarContador_OpcionUsuario();
});

$("#btnFinalizarPartida").on('click',function(){
  window.location.reload(); 
 })
function inciarContador_OpcionUsuario() {
  let segundos_de_espera = 6;
  const conteo = setInterval(() => {
    segundos_de_espera = segundos_de_espera - 1;
    let segundos_mostrar = "0" + segundos_de_espera;
    reloj_vista.innerHTML = "00:" + segundos_mostrar;
    habilitarRadio("opcionJugador"); 
    if (segundos_de_espera === 0) {
      let campana_reloj = new Audio("./audio/campanas-tibetana.mp3");
      campana_reloj.play();
      clearInterval(conteo);
      seleccionado_jugador = document.querySelector('input[name="opcionJugador"]:checked').value;
      let movimiento_pc = numeroRandom(0, 2);
      let resultado = verGanador(seleccionado_jugador, movimiento[movimiento_pc]);
      setRadio("opcionPc", movimiento[movimiento_pc]);
      agregarFila(vuelta, resultado, seleccionado_jugador,movimiento[movimiento_pc] );
      vuelta++;
      limpiarRadio("opcionPc");
      limpiarRadio("opcionJugador");
    }
  }, 1000);
}
function habilitarRadio(name){
    document.querySelectorAll(`input[name="${name}"]`).forEach((element) => {
      element.disabled = false;
  });
}
function limpiarRadio(name){
  document.querySelectorAll(`input[name="${name}"]`).forEach((element) => {
    element.checked = false;
    element.disabled = true;
});
}
function setRadio(name, value) {
  document.querySelectorAll(`input[name="${name}"]`).forEach((element) => {
    if (element.value === value) {
      element.checked = true;
      element.disabled = false;
    }
  });
}

function numeroRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function verGanador(movimiento1, movimiento2) {
  if (movimiento1 === movimiento2) {
    pto_pc += empate;
    pto_user += empate;
    puntos_user.innerHTML = pto_user;
    puntos_pc.innerHTML = pto_pc;
    return "Empate entre el Usuario y la PC";
  }
  if (
    (movimiento1 === "piedra" && movimiento2 === "tijera") ||
    (movimiento1 === "tijera" && movimiento2 === "papel") ||
    (movimiento1 === "papel" && movimiento2 === "piedra")
  ) {
    pto_pc += perdedor;
    pto_user += ganador;
    puntos_user.innerHTML = pto_user;
    puntos_pc.innerHTML = pto_pc;
    return "Gana el Usuario";
  } else {
    pto_pc += ganador;
    pto_user += perdedor;
    puntos_user.innerHTML = pto_user;
    puntos_pc.innerHTML = pto_pc;
    return "Gana PC";
  }
}

function agregarFila(vuelta, resultado, movimientoJugador,movimientoPC) {
  let fila = document.createElement("tr");

  let columna = document.createElement("td");
  columna.innerText = vuelta;
  fila.appendChild(columna);

  columna = document.createElement("td");
  columna.innerText = resultado;
  fila.appendChild(columna);

  columna = document.createElement("td");
  columna.innerText = movimientoJugador;
  fila.appendChild(columna);

  columna = document.createElement("td");
  columna.innerText = movimientoPC;
  fila.appendChild(columna);
  bodyResultado.appendChild(fila);
}
