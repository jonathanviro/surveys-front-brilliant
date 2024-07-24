const API_URL = 'https://surveys-back-brilliant-production.up.railway.app/api/v1';

async function postLogin(email, password) {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, contrasena: password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred');
    }
}

async function postValidateAccessCode(userId, studyId, accessCode) {
    try {
        const response = await axios.post(`${API_URL}/auth/validate-access-code`, { id_usuario: userId, id_estudio: studyId, clave_acceso: accessCode });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred');
    }
}

async function getCompanies() {
    try {
        const response = await axios.get(`${API_URL}/empresas`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred');
    }
}

async function postArquetiposRespuestas(respuestasEncuesta) {
    try {
        const response = await axios.post(`${API_URL}/arquetipos/respuestas`, respuestasEncuesta);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred');
    }
}

async function postComportamientosRespuestas(respuestasEncuesta) {
    try {
        const response = await axios.post(`${API_URL}/comportamientos/respuestas`, respuestasEncuesta);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred');
    }
}

async function postInteresesRespuestas(respuestasEncuesta) {
    try {
        const response = await axios.post(`${API_URL}/intereses/respuestas`, respuestasEncuesta);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred');
    }
}

export { postLogin, postValidateAccessCode, getCompanies, postArquetiposRespuestas, postComportamientosRespuestas, postInteresesRespuestas };
