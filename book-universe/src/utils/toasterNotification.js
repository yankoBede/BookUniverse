import { useToasts } from 'react-toast-notifications'

const { addToast, removeToast } = useToasts()

const publishNotification = (message, notificationType) => {
    const toast = addToast(message, { appearance: notificationType })

    setInterval(function() {
      removeToast(toast)
    }, 3000);
}

export default publishNotification