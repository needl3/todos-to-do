import * as actions from '../actiontypes'

import store from '../../store'

import { syncStatus } from '../../../utils/states'
import urls from '../../../utils/urls'

function updateLocalStorage(payload) {
    let parsed = JSON.parse(localStorage.getItem('todos')) || []
    parsed = parsed.map(todo => {
        if (todo.id === payload.id) return payload
        return todo
    })
    localStorage.setItem('todos', JSON.stringify(parsed))
}

export default (content, reminder) => dispatch => {
    const loggedIn = store.getState().auth.name
    // check if logged in
    // If logged in, make a request
    // If successful, append cloudOk bit, else append, cloudNotOk bit
    // Store in localStorage
    // Update in redux store

    const editedTodo = { ...content, cloud: syncStatus.SYNC_FAILED, reminder }
    if (loggedIn) {
        // Dispatch syncing action to toggle cloud status icon

        fetch(urls.todo, {
            method: 'PATCH',
            body: JSON.stringify(editedTodo),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(r => {
                editedTodo.cloud = syncStatus.SYNCED

                updateLocalStorage(editedTodo)
            })
            .catch(e => {
                updateLocalStorage(editedTodo)
            })
    } else updateLocalStorage(editedTodo)

    const payload = store.getState().todo.map(todo => {
        if (todo.id === editedTodo.id) return editedTodo
        return todo
    })

    console.log(payload)
    return {
        type: actions.EDIT_TODO,
        payload,
    }
}
