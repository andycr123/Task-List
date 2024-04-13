/* Obteniendo elementos del DOM */
const dateNumber = document.getElementById("dateNumber");
const dateText = document.getElementById("dateText");
const clock = document.getElementById("clock");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");
const tasksContainer = document.getElementById("tasksContainer");

/* Función para establecer la fecha actual */
const setDate = () => {
  const date = new Date();
  dateNumber.textContent = date.toLocaleString("es", { day: "numeric" });
  dateText.textContent = date.toLocaleString("es", { weekday: "long" });
  dateMonth.textContent = date.toLocaleString("es", { month: "short" });
  dateYear.textContent = date.toLocaleString("es", { year: "numeric" });
};

const setTime = () => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  clock.textContent = `${hours}:${minutes}:${seconds}`;
};

/* Función para agregar una nueva tarea */
const addNewTask = (event) => {
  event.preventDefault();
  const { value } = event.target.taskText;
  if (!value) return; // Si no hay texto en la tarea, no hacer nada
  const task = document.createElement("div");
  task.classList.add("task", "roundBorder");
  task.addEventListener("click", changeTaskState);
  task.textContent = value;
  tasksContainer.prepend(task); // Agrega la nueva tarea al principio de la lista
  event.target.reset(); // Reinicia el formulario para limpiar el campo de entrada
};

/* Función para cambiar el estado de una tarea (hecho/no hecho) */
const changeTaskState = (event) => {
  event.target.classList.toggle("done"); // Alterna la clase 'done' en la tarea, marcándola como hecha o no hecha
};

/* Funcion para prdenar las tareas las tareas en la lista */
const order = () => {
  const  done  = [];
  const  toDo  = [];
  tasksContainer.childNodes.forEach((el) => {
    el.classList.contains("done") ? done.push(el) : toDo.push(el) /* Dividir las tareas listas y no listas*/
  })
  return [...toDo, ...done]; /*Es que me va a devolver de los arrays las tareas hechas y no hechas, */
 }

 /*Funcionalidad para retornar las tareas hechas en la lista  */
 const renderOrderedTasks = () => {
  order().forEach((el) => tasksContainer.appendChild(el)); /* Agregar en cada tarea el orden correcto del contenedor */
 }

/* Configuración inicial: establece la fecha actual y renderiza las tareas ordenadas */
setDate();
setTime();
renderOrderedTasks();

/*Llamar la constante setTime cada segundo*/
setInterval(setTime, 1000)