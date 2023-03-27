import {showNotification} from "@mantine/notifications";

export function showSuccess(message: string) {
    showNotification({
        title: 'Success!',
        message: message,
        color: "green.5"
    })
}

export function showError(message: string) {
    showNotification({
        title: 'Error',
        message: message,
        color: "red.5"
    })
}
