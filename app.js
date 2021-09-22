require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";

  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareaFromArray(tareasDB);
  }

  do {
    //Imprimir el menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;
      case "2":
        console.log(tareas.listadoCompletado());
        break;
      case "3":
        console.log(tareas.listadoPendientesCompletadas(true));
        break;
      case "4":
        console.log(tareas.listadoPendientesCompletadas(false));
        break;
      case "5":
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.completarTareas(ids);
        break;

      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar(
            `Confirma que desea borrar la tarea: ${
              tareas.listadoArr.find((tarea) => tarea.id === id).desc
            }`
          );
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);
    if (opt !== "0") await pausa();
  } while (opt !== "0");
};

main();
