const publishNotification = (message, notificationType, addToast, removeToast) => {
    const toast = addToast(message, { appearance: notificationType })

    setInterval(function() {
      removeToast(toast)
    }, 3000);
}

export default publishNotification