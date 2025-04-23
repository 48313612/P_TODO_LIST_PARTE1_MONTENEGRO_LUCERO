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
    }

    let tareaRapida = tareasCompletadas[0];
    let tiempoRapida = tareaRapida.completadaEn - tareaRapida.creadaEn;

    for (let i = 1; i < tareasCompletadas.length; i++) {
        const actual = tareasCompletadas[i];
        const tiempoActual = actual.completadaEn - actual.creadaEn;
        
        if (tiempoActual < tiempoRapida) {
            tareaRapida = actual;
            tiempoRapida = tiempoActual;
        }
    }

    const tiempoSegundos = (tiempoRapida / 1000).toFixed(2);
    alert(`La tarea completada más rápido fue "${tareaRapida.texto}" en ${tiempoSegundos} segundos.`);
};

actualizarTareas();