import { Modal } from 'bootstrap';

export class NotificationService {
    static notify(message: string, type: 'info' | 'error' = 'info'): void {
        const modalMessage = document.getElementById('modal-message')!;
        const modalElement = document.getElementById('notificationModal')!;
        
        // Створюємо інстанс модального вікна через Bootstrap
        const notificationModal = new Modal(modalElement);

        // Встановлюємо повідомлення в модальне вікно
        modalMessage.textContent = message;

        // Відкриваємо модальне вікно
        notificationModal.show();
    }
}
