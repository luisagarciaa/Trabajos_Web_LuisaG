// Versión mínima de las rondas 8 y 9. Funciona, pero no gana puntos.
export const CATEGORIAS = ['Nombre', 'Lugar', 'Animal', 'Objeto', 'Marca', 'Comida'];

export function normalizar(texto) {
  return String(texto ?? '').trim().toLowerCase();
}

export function esRespuestaValida(respuesta, letra) {
  const limpia = normalizar(respuesta);
  return limpia.length >= 3 && limpia.startsWith(normalizar(letra));
}

export function puntuarRespuesta(respuesta, letra, veces) {
  if (!esRespuestaValida(respuesta, letra)) return 0;
  return veces >= 2 ? 50 : 100;
}

export function calcularMarcador(ronda, categorias = CATEGORIAS) {
  return ronda.jugadores
    .map((jugador) => {
      let puntaje = 0;
      for (const categoria of categorias) {
        const respuesta = jugador.respuestas[categoria];
        const veces = ronda.jugadores.filter(
          (otro) => normalizar(otro.respuestas[categoria]) === normalizar(respuesta)
        ).length;
        puntaje += puntuarRespuesta(respuesta, ronda.letra, veces);
      }
      return { jugador: jugador.nombre, puntaje };
    })
    .sort((a, b) => b.puntaje - a.puntaje);
}
