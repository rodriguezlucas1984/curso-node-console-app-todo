const Tarea = require("./tarea");

require("colors");
class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });
    // for (const key in this._listado) {
    //   if (Object.hasOwnProperty.call(this._listado, key)) {
    //     listado.push(this._listado[key]);
    //   }
    // }
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }
  cargarTareaFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompletado() {
    let tareas = "";
    Object.keys(this._listado).forEach((key, index) => {
      tareas += "\n\t" + (index + 1 + ". ").green;
      tareas += this._listado[key].desc + " :: ";
      tareas += this._listado[key].completaEn
        ? "Completada".green
        : "Pendiente".red;
    });
    tareas += "\n";
    return tareas;
  }
  listadoPendientesCompletadas(completadas = true) {
    let tareas = "";
    let i = 0;
    Object.keys(this._listado).forEach((key) => {
      const completada = this._listado[key].completaEn ? true : false;
      if (completadas === completada) {
        tareas += "\n\t" + (++i + ". ").green;
        tareas += this._listado[key].desc + " :: ";
        tareas += this._listado[key].completaEn
          ? this._listado[key].completaEn.green
          : "Pendiente".red;
      }
    });
    tareas += "\n";
    return tareas;
  }

  completarTareas(tareasId = []) {
    tareasId.forEach((id) => {
      if (!this._listado[id].completaEn) {
        this._listado[id].completaEn = new Date().toISOString();
      }
    });
    Object.keys(this._listado).forEach((key) => {
      if (!tareasId.includes(key)) {
        this._listado[key].completaEn = null;
      }
    });
  }
}
module.exports = Tareas;
