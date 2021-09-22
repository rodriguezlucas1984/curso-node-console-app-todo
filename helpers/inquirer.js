const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      { value: "1", name: `${"1".magenta}. Crear tarea` },
      { value: "2", name: `${"2".magenta}. Listar tareas` },
      { value: "3", name: `${"3".magenta}. Listar tareas completadas` },
      { value: "4", name: `${"4".magenta}. Listar tareas pendientes` },
      { value: "5", name: `${"5".magenta}. Completar tarea(s)` },
      { value: "6", name: `${"6".magenta}. Borrar tarea` },
      { value: "0", name: `${"0".magenta}. Salir` },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("======================================".green);
  console.log("       Seleccione una opción".white);
  console.log("======================================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  await inquirer.prompt([
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ]);
  console.log("\n");
  return true;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        } else {
          return true;
        }
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    return {
      value: tarea.id,
      name: (++index + ". ").green + tarea.desc,
    };
  });
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });
  const questions = [
    {
      type: "list",
      name: "id",
      message: "Seleccione la tarea a eliminar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirmar = async (mensaje) => {
  const pregunta = {
    type: "confirm",
    name: "ok",
    message: mensaje,
  };
  const { ok } = await inquirer.prompt(pregunta);
  return ok;
};

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    return {
      value: tarea.id,
      name: tarea.desc,
      checked: tarea.completaEn ? true : false,
    };
  });
  const questions = [
    {
      type: "checkbox",
      name: "tareasCompletadas",
      message: "Seleccione las tareas completadas",
      choices,
    },
  ];
  const { tareasCompletadas } = await inquirer.prompt(questions);
  return tareasCompletadas;
};
module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
};
