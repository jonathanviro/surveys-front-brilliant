import { postLogin } from './api.js';
import { showModal } from './utils.js';

document.getElementById('submit-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        try {
            const result = await postLogin(email, password);
            localStorage.setItem('user', JSON.stringify(result));
            showModal('success', '¡Bienvenido a nuestra plataforma de encuestas! Tómate tu tiempo para completar las encuestas; no hay respuestas correctas o incorrectas, tu opinión es valiosa.');
            window.location.href = 'surveyAccess.html';
        } catch (error) {
            showModal('error', 'Error: ' + error.message);
        }
    } else {
        showModal('info', 'Por favor, ingresa el usuario y contraseña');
    }
});