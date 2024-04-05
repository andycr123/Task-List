/* Obteniendo elementos del DOM */
const dateNumber = document.getElementById("dateNumber");
const dateText = document.getElementById("dateText");
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

/* Función para ordenar las tareas en la lista */
const order = () => {
  const done = [];
  const toDo = [];
  tasksContainer.childNodes.forEach((el) => {
    el.classList.contains("done") ? done.push(el) : toDo.push(el); // Divide las tareas en hechas y no hechas
  });
  return [...toDo, ...done]; // Retorna un array con las tareas no hechas seguidas de las hechas
};

/* Función para renderizar las tareas ordenadas en la lista */
const renderOrderedTasks = () => {
  order().forEach((el) => tasksContainer.appendChild(el)); // Agrega cada tarea en el orden correcto al contenedor de tareas
};

/* Configuración inicial: establece la fecha actual y renderiza las tareas ordenadas */
setDate();
renderOrderedTasks();
