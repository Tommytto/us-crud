export function getModalName(modalType) {
    return modalType && capitalize(modalType) + "Modal";
}

export function capitalize(str) {
    return str && str.charAt(0).toUpperCase() + str.substring(1)
}