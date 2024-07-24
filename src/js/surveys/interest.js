import { palabrasIntereses } from '../helpers/palabrasIntereses.js';
import { postInteresesRespuestas } from '../api.js';
import { showModal } from '../utils.js';

const dataString = localStorage.getItem('user');
const data = JSON.parse(dataString);

const respuestas = {
    id_usuario: data.id_usuario,
    id_estudio: data.id_estudio,
    grupos: []
};

const questionNumberedAnswers = (question) => {
    const results = [];
    let i = 0;
    for (let value of question.palabras) {
        i++;
        results.push(`
            <div class="card">
                <div class="card-content">
                    <div class="content is-flex is-align-content-center">
                        <p class="has-text-weight-bold">${i})&ensp;</p>
                        <span>${value}</span>
                    </div>
                </div>
            </div>
        `);
    }
    return `${results.join(" ")}`;
};

const questionGroup = (question) => {
    return `<article class="message">
        <div class="message-header">
            <p>Grupo ${question.grupo} de palabras</p>
        </div>
        <div class="message-body">
            <div class="grid">
                <div class="cell sortable" data-id-grupo="${question.grupo}">
                    ${questionNumberedAnswers(question)}
                </div>
            </div>
        </div>
      </article>`;
};

document.getElementById("list").innerHTML = palabrasIntereses.map(questionGroup).join(" ");

const listPanel = document.querySelectorAll(".grid .cell.sortable").forEach(panel => {
    const sortable = Sortable.create(panel, {
        onUpdate: function (evt) {
            panel.querySelectorAll("p").forEach((p, index) => {
                p.innerHTML = index + 1 + ')&ensp;';
            });
        },
        onEnd: function (evt) {
            evt.item.style.cursor = 'pointer';
        },
    });
});

document.getElementById("submit-btn").addEventListener("click", async () => {
    console.log("Hola")
    const grupos = [];

    document.querySelectorAll(".grid .cell.sortable").forEach(panel => {
        const idGrupo = parseInt(panel.getAttribute('data-id-grupo'));
        const ordenPalabras = Array.from(panel.querySelectorAll(".card .content span"))
            .map(span => span.textContent.trim().replace(/^\d+\) /, ''));

        grupos.push({
            id_grupo: idGrupo,
            orden_palabras: ordenPalabras
        });
    });

    const respuestas = {
        id_usuario: data.id_usuario,
        id_estudio: data.id_estudio,
        grupos: grupos
    };

    console.table(respuestas.grupos);
    console.log('Respuestas:', respuestas);

    try {
        const result = await postInteresesRespuestas(respuestas);
        console.log('Respuestas enviadas con éxito:', result);
        localStorage.setItem('stateSurveys', JSON.stringify(result));
        showModal('success', 'Respuestas enviadas con éxito.');
        window.location.href = 'surveyType.html';
    } catch (error) {
        console.error('Error al enviar las respuestas:', error.message);
        showModal('error', 'Error: ' + error.message);
    }
});

document.querySelectorAll(".grid .cell.sortable .card").forEach(card => {
    card.style.cursor = 'pointer';
});