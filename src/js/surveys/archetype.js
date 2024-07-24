import { preguntasArquetipos } from '../helpers/preguntasArquetipos.js';
import { postArquetiposRespuestas } from '../api.js';
import { showModal } from '../utils.js';

const dataString = localStorage.getItem('user');
const data = JSON.parse(dataString);

const respuestas = {
    id_usuario: data.id_usuario,
    id_estudio: data.id_estudio,
    encuesta: []
};

const questionAnswers = (question) => {
    const results = [];
    for (let [key, value] of Object.entries(question.opciones)) {
        results.push(`<a class="panel-block is-small option-block" data-pregunta="${question.id}" data-opcion="${key}">
              <span class="panel-icon is-small">
                ${key})
              </span>
              ${value}
            </a>`);
    }
    return `
            <p class="panel-heading panel-heading-custom is-small">${question.id}. ${question.pregunta}</p>
            ${results.join(" ")}`;
};

const questionGroup = (question) => {
    return `<article class="panel is-link mb-6 mx-6" id="question-${question.id}">
        ${questionAnswers(question)}
      </article>`;
};

const handleSelection = (event) => {
    const optionElement = event.target.closest(".panel-block");
    if (!optionElement) return;

    const preguntaId = parseInt(optionElement.getAttribute("data-pregunta"));
    const opcionSeleccionada = optionElement.getAttribute("data-opcion");

    const respuestaExistente = respuestas.encuesta.find(respuesta => respuesta.pregunta === preguntaId);
    if (respuestaExistente) {
        respuestaExistente.respuesta = opcionSeleccionada;
    } else {
        respuestas.encuesta.push({ pregunta: preguntaId, respuesta: opcionSeleccionada });
    }

    const panelBlocks = optionElement.parentNode.querySelectorAll(".panel-block");
    panelBlocks.forEach(block => block.classList.remove("selected"));
    optionElement.classList.add("selected");

    console.table(respuestas.encuesta);
};

const validateResponses = () => {
    let allAnswered = true;

    preguntasArquetipos.forEach(question => {
        const panel = document.getElementById(`question-${question.id}`);
        if (panel) {
            if (respuestas.encuesta.some(respuesta => respuesta.pregunta === question.id)) {
                panel.style.border = '';
            } else {
                panel.style.border = '2px solid #FFB6C1';
                allAnswered = false;
            }
        }
    });

    return allAnswered;
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("list").innerHTML = preguntasArquetipos.map(questionGroup).join(" ");

    document.getElementById("list").addEventListener("click", handleSelection);

    document.getElementById("submit-btn").addEventListener("click", async () => {
        if (validateResponses()) {
            console.log('Respuestas:', respuestas);
            try {
                const result = await postArquetiposRespuestas(respuestas);
                console.log('Respuestas enviadas con éxito:', result);
                localStorage.setItem('stateSurveys', JSON.stringify(result));
                showModal('success', 'Respuestas enviadas con éxito.');
                window.location.href = 'surveyType.html';
            } catch (error) {
                console.error('Error al enviar las respuestas:', error.message);
                showModal('error', 'Error: ' + error.message);
            }
        } else {
            showModal('info', 'Por favor, contesta todas las preguntas.');
        }
    });
});