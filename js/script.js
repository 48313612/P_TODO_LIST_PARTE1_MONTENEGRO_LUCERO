function validarForm() {
    let notaMatematica = document.getElementById('notaMatematica').value;
    let notaLengua = document.getElementById('notaLengua').value;
    let notaEFSI = document.getElementById('notaEFSI').value;

    let notaMatematicaValida = validacion(notaMatematica);
    let notaLenguaValida = validacion(notaLengua);
    let notaEFSIValida = validacion(notaEFSI);

    document.getElementById('notaMatematica').style.backgroundColor = 
        notaMatematica === '' ? '' : (notaMatematicaValida ? "#D6E5BD" : "#ff686b");
    
    document.getElementById('notaLengua').style.backgroundColor = 
        notaLengua === '' ? '' : (notaLenguaValida ? "#D6E5BD" : "#ff686b");
    
    document.getElementById('notaEFSI').style.backgroundColor = 
        notaEFSI === '' ? '' : (notaEFSIValida ? "#D6E5BD" : "#ff686b");

}

function validacion(datoAvalidar) {

    const tieneLetra = /(?:[A-Z])/.test(datoAvalidar) || /(?:[a-z])/.test(datoAvalidar);
    const tieneNum = /(?:\d)/.test(datoAvalidar);

    let esValido = false;

    if (datoAvalidar !== '' && datoAvalidar <= 10 && datoAvalidar >= 1 && tieneNum && !tieneLetra) {
        esValido = true;
    }

    return esValido;
}

function calcularPromedio() {
    let notaMatematica = parseFloat(document.getElementById('notaMatematica').value);
    let notaLengua = parseFloat(document.getElementById('notaLengua').value);
    let notaEFSI = parseFloat(document.getElementById('notaEFSI').value);

    let promedio = (notaEFSI + notaLengua + notaMatematica) / 3;
    let mensaje = `El promedio es de ${promedio}`;

    let alertaVerde = document.getElementById('alertaVerde');
    let alertaRojo = document.getElementById('alertaRojo');

    if (promedio >= 6) {
        alertaVerde.innerHTML = mensaje;
        alertaVerde.style.display = "block";
    } else {
        alertaRojo.innerHTML = mensaje;
        alertaRojo.style.display = "block";
    }
}

function mostrarMayorNota() {
    let notaMatematica = parseFloat(document.getElementById('notaMatematica').value);
    let notaLengua = parseFloat(document.getElementById('notaLengua').value);
    let notaEFSI = parseFloat(document.getElementById('notaEFSI').value);

    let notas = [
        { materia: "Matematica", nota: notaMatematica },
        { materia: "Lengua", nota: notaLengua },
        { materia: "EFSI", nota: notaEFSI }
    ];

    let mayorNota = Math.max(...notas.map(nota => nota.nota));

    let materiasConMayorNota = notas.filter(nota => nota.nota === mayorNota);

    let materias = materiasConMayorNota.map(nota => nota.materia).join(", ");
    
    let mensaje = `Las materias con la mayor nota (${mayorNota}) son: ${materias}`;
    let alertaAzul = document.getElementById('alertaAzul');
    alertaAzul.innerHTML = mensaje;
    alertaAzul.style.display = "block";
}
