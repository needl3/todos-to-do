import * as actions from '../actiontypes'

import store from '../../store'
import urls from '../../../utils/urls'

function updateLocalStorage(payload) {
    let parsed = JSON.parse(localStorage.getItem('todos')) || []
    parsed = parsed.filter(todo => todo.id !== payload)
    localStorage.setItem('todos', JSON.stringify(parsed))
}

export default function removeTodo(id) {
    const {name} = store.getState().auth
    // check if logged in
    // If logged in, make a request
    // If not successful, do nothing more and just return state
    // Store in localStorage
    // Update in redux store
    const payload = store.getState().todo.filter(todo => todo.id !== id)

    if (name) {
        // Dispatch syncing action to toggle cloud status icon
        fetch(urls.todo, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(r => {
                updateLocalStorage(id)
            })
            .catch(e => {
                console.error(e)
                // dispatch to notify of unsuccessful deletion
            })
    } else {
        updateLocalStorage(id)
    }

    return {
        type: actions.DELETE_TODO,
        payload,
    }
}
