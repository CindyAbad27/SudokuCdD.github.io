const solution = [
    5, 3, 4, 6, 7, 8, 9, 1, 2,
    6, 7, 2, 1, 9, 5, 3, 4, 8,
    1, 9, 8, 3, 4, 2, 5, 6, 7,
    8, 5, 9, 7, 6, 1, 4, 2, 3,
    4, 2, 6, 8, 5, 3, 7, 9, 1,
    7, 1, 3, 9, 2, 4, 8, 5, 6,
    9, 6, 1, 5, 3, 7, 2, 8, 4,
    2, 8, 7, 4, 1, 9, 6, 3, 5,
    3, 4, 5, 2, 8, 6, 1, 7, 9
];

const concepts = [
    "Latencia", "Ancho de banda", "Protocolo", "Frecuencia", "Modulación",
    "Red", "Trama", "Paquete", "Señal", "Bit",
    "Topología", "Capa física", "Retransmisión", "Multiplexación",
    "Dirección IP", "Máscara de red", "Enlace", "Switch", "Router", "Internet"
];

const incompleteConcepts = [
    "Lat_n_ia", "A_cho d_ b_n_d_", "Pro_oco_o", "Fre_u_nci_", "M_d_lac_ón",
    "R_d", "Tra_a", "P_q_ete", "S_ñ_l", "B_t",
    "T_p_l_gía", "Cap_ f_ísi_a", "R_tr_n_mis_ón", "Mul_i_l_xac_ó_",
    "Dir_c_i_ón I_", "Más_ara d_ r_d", "E_lac_", "Swi_h", "R_ute_", "Int_r_et"
];

// Definiciones cortas para cada concepto
const definitions = {
    "Latencia": "Tiempo que tarda un paquete de datos en ir desde el origen hasta el destino.",
    "Ancho de banda": "Capacidad de una red para transferir datos en un tiempo determinado.",
    "Protocolo": "Conjunto de reglas que permiten la comunicación entre dispositivos.",
    "Frecuencia": "Número de veces que ocurre una señal en un segundo.",
    "Modulación": "Proceso de variar una señal para transmitir datos.",
    "Red": "Conjunto de dispositivos interconectados para compartir recursos.",
    "Trama": "Unidad de datos transmitida en una red.",
    "Paquete": "Bloque de datos que se transmite en una red.",
    "Señal": "Representación física de los datos transmitidos.",
    "Bit": "Unidad básica de información en informática.",
    "Topología": "Distribución física o lógica de una red.",
    "Capa física": "Capa del modelo OSI que se encarga de la transmisión de datos a nivel de hardware.",
    "Retransmisión": "Reenvío de datos desde un nodo de red a otro.",
    "Multiplexación": "Método para combinar múltiples señales en una sola para su transmisión.",
    "Dirección IP": "Identificador único para cada dispositivo en una red.",
    "Máscara de red": "Patrón de bits utilizado para dividir una dirección IP en subredes y especificar dispositivos disponibles en la red.",
    "Enlace": "Conexión física o lógica entre dos nodos de red.",
    "Switch": "Dispositivo que conecta dispositivos en una red y filtra y reenvía paquetes de datos.",
    "Router": "Dispositivo que enruta paquetes de datos entre diferentes redes.",
    "Internet": "Red global de redes interconectadas que utiliza el conjunto de protocolos de Internet."
};

const conceptIndexes = [2, 3, 6, 8, 11, 17, 22, 29, 34, 37, 40, 42, 48, 58, 62, 64, 69, 72, 74, 75];

const completedConcepts = Array(20).fill(false);
const correctConceptsList = document.getElementById('correct-concepts-list');
const checkButton = document.querySelector('.btn');

// Deshabilitar el botón inicialmente
checkButton.disabled = true;

let startTime = Date.now();

function handleCellClick(index) {
    const conceptIndex = conceptIndexes.indexOf(index);
    if (conceptIndex !== -1) {
        if (completedConcepts[conceptIndex]) {
            alert("Este concepto ya ha sido ingresado correctamente.");
            return;
        }

        const conceptCorrect = checkConcept(conceptIndex);
        if (conceptCorrect) {
            completedConcepts[conceptIndex] = true;
            const cell = document.getElementById(`cell-${index}`);
            cell.readOnly = false;
            alert("¡Concepto correcto! Ahora puedes ingresar el número.");
            addCorrectConceptToList(concepts[conceptIndex]);
        } else {
            const cell = document.getElementById(`cell-${index}`);
            cell.readOnly = true;
            cell.value = '';
        }
    }
    checkIfAllCellsFilled(); // Verificar si todas las celdas están llenas
}

function checkConcept(index) {
    const userConcept = prompt(`Completa el concepto: ${incompleteConcepts[index]}`);
    if (userConcept && userConcept.toLowerCase() === concepts[index].toLowerCase()) {
        return true;
    } else {
        alert("Concepto incorrecto o cancelado. Intenta de nuevo.");
        return false;
    }
}

function addCorrectConceptToList(concept) {
    const listItem = document.createElement('li');
    listItem.textContent = concept;
    listItem.addEventListener('click', () => {
        alert(definitions[concept]);
    });
    correctConceptsList.appendChild(listItem);
}

function checkIfAllCellsFilled() {
    let allFilled = true;
    for (let i = 0; i < 81; i++) {
        const cell = document.getElementById(`cell-${i}`);
        if (!cell.disabled && cell.readOnly && cell.value === "") {
            allFilled = false;
            break;
        }
    }
    checkButton.disabled = !allFilled;
}

checkButton.addEventListener('click', (event) => {
    if (checkButton.disabled) {
        alert("Debes llenar todas las celdas primero.");
        event.preventDefault();
    }
});

function checkAnswers() {
    let correct = true;

    for (let i = 0; i < 81; i++) {
        const cell = document.getElementById(`cell-${i}`);

        if (!cell.disabled && !cell.readOnly) {
            if (cell.value === "")
                { 
                cell.style.backgroundColor = "#F7CFD6"; // Color específico para rojo
                correct = false;
            } 
            else { const userAnswer = parseInt(cell.value, 10);
            if (userAnswer !== solution[i]) { 
                cell.style.backgroundColor = "#F7CFD6"; // Color específico para rojo
                 correct = false; } else { cell.style.backgroundColor = "#CDF4CF"; // Color específico para verde
            }
        }
    }
}

    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // Tiempo en segundos

    if (correct) {
        alert(`¡Felicidades! Todas las respuestas son correctas.\nTiempo: ${timeTaken.toFixed(2)} segundos`);
    } else {
        alert(`Algunas respuestas son incorrectas.\nTiempo: ${timeTaken.toFixed(2)} segundos\nRevisa las celdas en rojo.`);
    }
}
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', () => 
    {
        location.reload(); // Recargar la página para reiniciar el Sudoku 
    });