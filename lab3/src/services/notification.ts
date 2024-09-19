import { Modal } from 'bootstrap';

export class NotificationService {
    static notify(message: string, type: 'info' | 'error' | 'success' = 'info'): void {
        const modalMessage = document.getElementById('modal-message')!;
        const modalElement = document.getElementById('notificationModal')!;
        
        const notificationModal = new Modal(modalElement);

        modalMessage.textContent = message;

        // Можна додати логіку для стилізації повідомлень в залежності від типу
        if (type === 'success') {
            modalElement.classList.add('modal-success');
        } else if (type === 'error') {
            modalElement.classList.add('modal-error');
        }

        notificationModal.show();
    }
}

