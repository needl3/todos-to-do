import * as actions from './actiontypes'

export function createPopup(message, positive = true, time = 1000) {
    return {
        type: actions.ADD_POPUP,
        payload: {
            message,
            colorbg: positive ? 'bg-popuppositive' : 'bg-popupnegative',
            color: positive ? 'text-green' : 'text-red-100',
            time,
            id: Date.now().toString().slice(-5),
        },
    }
}

export function removePopup(id) {
    return {
        type: actions.REMOVE_POPUP,
        payload: id,
    }
}
