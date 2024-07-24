import { postValidateAccessCode } from './api.js';
import { showModal } from './utils.js';

(async () => {
    try {
        const dataString = localStorage.getItem('user');
        console.log('dataString:', dataString);
        if (!dataString) {
            throw new Error('No se encontró información del usuario en el almacenamiento local.');
        }

        const data = JSON.parse(dataString);
        console.log('data:', data);
        const usuarioId = data.id_usuario;
        const estudioId = data.id_estudio;
        const claveAcceso = data.codigo_acceso;

        console.log(usuarioId, estudioId, claveAcceso);

        const result = await postValidateAccessCode(usuarioId, estudioId, claveAcceso);
        console.log('result:', result);

        if (!result || typeof result !== 'object') {
            throw new Error('El resultado de la validación de acceso no es válido.');
        }

        const updateSurveyStatus = (id, status) => {
            const statusElement = document.getElementById(`${id}-status`);
            const buttonElement = document.getElementById(id);

            if (statusElement) {
                if (status) {
                    statusElement.textContent = 'Realizado';
                    statusElement.classList.add('is-success');
                    statusElement.classList.remove('is-danger');
                    if (buttonElement) {
                        buttonElement.classList.add('is-disabled');
                        buttonElement.removeEventListener('click', handleClick);
                    }
                } else {
                    statusElement.textContent = 'Por Realizar';
                    statusElement.classList.add('is-danger');
                    statusElement.classList.remove('is-success');
                    if (buttonElement) {
                        buttonElement.classList.remove('is-disabled');
                        buttonElement.addEventListener('click', handleClick);
                    }
                }
            } else {
                console.warn(`Elemento con ID '${id}-status' no encontrado.`);
            }

            function handleClick() {
                window.location.href = `survey${capitalizeFirstLetter(id)}.html`;
            }

            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        };

        // Actualizar el estado de cada encuesta
        updateSurveyStatus('behavior', result.comportamientos_completada);
        updateSurveyStatus('interest', result.intereses_completada);
        updateSurveyStatus('archetype', result.arquetipos_completada);

    } catch (error) {
        showModal('error', 'Error: ' + error.message);
    }
})();
