let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
actualizarTareas();

function agregarTarea() {
    const input = document.getElementById('entradaTarea');
    const texto = input.value.trim();
    if (texto) {
        tareas.push({ texto, completada: false, creadaEn: Date.now(), completadaEn: null });
        guardarYactualizar();
        input.value = '';
    }
}

function alternarTarea(indice) {
    tareas[indice].completada = !tareas[indice].completada;
    tareas[indice].completadaEn = tareas[indice].completada ? Date.now() : null;
    guardarYactualizar();
}

function eliminarTarea(indice) {
    tareas.splice(indice, 1);
    guardarYactualizar();
}

function eliminarCompletadas() {
    tareas = tareas.filter(tarea => !tarea.completada);
    guardarYactualizar();
}

function guardarYactualizar() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
    actualizarTareas();
}

function actualizarTareas() {
    const lista = document.getElementById('listaTareas');
    lista.innerHTML = '';
    tareas.forEach((tarea, indice) => {
        const li = document.createElement('li');
        li.className = tarea.completada ? 'completada' : '';
        li.innerHTML = `
            <input type="checkbox" onclick="alternarTarea(${indice})" ${tarea.completada ? 'checked' : ''}>
            <span class="${tarea.completada ? 'completada' : ''}">${tarea.texto}</span>
            <button onclick="eliminarTarea(${indice})">Eliminar</button>
        `;
        lista.appendChild(li);
    });
}