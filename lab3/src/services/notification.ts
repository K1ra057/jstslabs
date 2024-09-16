export class NotificationService {
    static notify(message: string, type: 'info' | 'error' = 'info'): void {
        if (type === 'error') {
            alert(`Error: ${message}`);
        } else {
            alert(message);
        }
    }
}
