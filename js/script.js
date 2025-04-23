let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

const agregarTarea = () => {
    const input = document.getElementById('entradaTarea');
    const texto = input.value.trim();
    if (texto) {
        const nuevaTarea = {
            texto,
            completada: false,
            creadaEn: Date.now(),
            completadaEn: null
        };
        tareas.push(nuevaTarea);
        guardarYactualizar();
        input.value = '';
    }
};

const alternarTarea = (id) => {
    const tarea = tareas.find(t => t.creadaEn === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        tarea.completadaEn = tarea.completada ? Date.now() : null;
        guardarYactualizar();
    }
};

const eliminarTarea = (id) => {
    tareas = tareas.filter(t => t.creadaEn !== id);
    guardarYactualizar();
};

const eliminarCompletadas = () => {
    tareas = tareas.filter(({ completada }) => !completada);
    guardarYactualizar();
};

const guardarYactualizar = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
    actualizarTareas();
};

const actualizarTareas = () => {
    const lista = document.getElementById('listaTareas');
    const filtro = document.getElementById('filtro')?.value || 'todas';

    lista.innerHTML = '';

    const tareasFiltradas = tareas.filter(({ completada }) =>
        filtro === 'todas' ? true :
        filtro === 'completadas' ? completada :
        !completada
    );

    tareasFiltradas.sort((a, b) => a.creadaEn - b.creadaEn);

    tareasFiltradas.forEach(({ texto, completada, creadaEn }) => {
        const li = document.createElement('li');
        li.className = completada ? 'completada' : '';
        li.innerHTML = `
            <input type="checkbox" onclick="alternarTarea(${creadaEn})" ${completada ? 'checked' : ''}>
            <span class="${completada ? 'completada' : ''}">${texto}</span>
            <button onclick="eliminarTarea(${creadaEn})">Eliminar</button>
        `;
        lista.appendChild(li);
    });
};

const mostrarTareaMasRapida = () => {
    const tareasCompletadas = tareas.filter(({ completada, creadaEn, completadaEn }) => completada && completadaEn && creadaEn);
    if (tareasCompletadas.length === 0) {
        alert('No hay tareas completadas.');
        return;
    }

    const tareaRapida = tareasCompletadas.reduce((rapida, actual) => {
        const tiempoRapida = rapida.completadaEn - rapida.creadaEn;
        const tiempoActual = actual.completadaEn - actual.creadaEn;
        return tiempoActual < tiempoRapida ? actual : rapida;
    });

    const tiempoSegundos = ((tareaRapida.completadaEn - tareaRapida.creadaEn) / 1000).toFixed(2);
    alert(`La tarea completada más rápido fue "${tareaRapida.texto}" en ${tiempoSegundos} segundos.`);
};

actualizarTareas();
