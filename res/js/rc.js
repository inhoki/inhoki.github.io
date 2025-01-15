const toastBox = document.querySelector('.toastBox');

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerHTML = '<button class="close-btn">✖</button>' + message;
    toastBox.appendChild(toast);

    const closeButton = toast.querySelector('.close-btn');
    closeButton.addEventListener('click', () => {
        toast.remove();
    });

    setTimeout(() => {
        toast.remove();
    }, 3000);
}



function x() {
	showToast('<i class=\'fas fa-exclamation-circle\'></i> Segera Hadir', 'invalid');
}