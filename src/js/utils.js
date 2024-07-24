function showModal(type, message) {
    const icon = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        info: 'fa-info-circle'
    }[type] || 'fa-info-circle';

    const buttonClass = {
        success: 'is-success',
        error: 'is-danger',
        info: 'is-info'
    }[type] || 'is-info';

    const modalHTML = `
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head ${buttonClass}">
                    <span class="modal-card-title">
                        <i class="fas ${icon}"></i>
                    </span>
                </header>
                <section class="modal-card-body">
                    <p>${message}</p>
                </section>
                <footer class="modal-card-foot">
                    <button class="button ${buttonClass}">Cerrar</button>
                </footer>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.querySelector('.modal .button').addEventListener('click', () => {
        document.querySelector('.modal').remove();
    });
}

export { showModal };
