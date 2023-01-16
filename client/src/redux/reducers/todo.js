import * as actions from '../actions/actiontypes'

export default function todoReducer(
    state = JSON.parse(localStorage.getItem('todos')) || [],
    action
) {
    switch (action.type) {
        case actions.ADD_TODO:
            return [...state, action.payload]
        case actions.EDIT_TODO:
            return action.payload
        case actions.DELETE_TODO:
            return action.payload
        case actions.CHECK_TODO:
            return action.payload
        case actions.UPDATE_CLOUD_INDICATOR:
            return action.payload
        case actions.SYNC_TODO:
            // Right now just delete all local todos
            // Then overwrite with server response todos
            // Create a logic to integrate all these todos later on
            return action.payload
        default:
            return state
    }
}
