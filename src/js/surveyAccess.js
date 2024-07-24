import { postValidateAccessCode } from './api.js';
import { showModal } from './utils.js';

document.getElementById('submit-btn').addEventListener('click', async () => {
    const clave = document.getElementById('clave').value;

    const dataString = localStorage.getItem('user');

    if (dataString) {
        const data = JSON.parse(dataString);
        const usuarioId = data.id_usuario;
        const estudioId = data.id_estudio;

        // console.log({clave, usuarioId, estudioId})

        if (clave && usuarioId && estudioId) {
            try {
                const result = await postValidateAccessCode(usuarioId, estudioId, clave);
                // console.log('Access code validated:', result);
                localStorage.setItem('stateSurveys', JSON.stringify(result));
                showModal('success', '¡Acceso Existoso!');
                window.location.href = 'surveyType.html';
            } catch (error) {
                showModal('error', 'Error: ' + error.message);
            }
        } else {
            showModal('info', 'Ingrese la clave de acceso');
        }
    }
});
