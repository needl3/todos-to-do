import * as actions from '../actiontypes'
import store from '../../store'
import { checkStatus, syncStatus } from '../../../utils/states'
import urls from '../../../utils/urls'

function updateLocalStorage(payload) {
    const parsed = JSON.parse(localStorage.getItem('todos')) || []
    parsed.push(payload)
    localStorage.setItem('todos', JSON.stringify(parsed))
}

export default (content, reminder) => async dispatch => {
    const loggedIn = store.getState().auth.name
    // check if logged in
    // If logged in, make a request
    // If successful, append cloudOk bit, else append, cloudNotOk bit
    // Store in localStorage
    // Update in redux store

    const payload = {
        ...content,
        reminder,
    }

    // Dispatch syncing action to toggle cloud status icon
    try {
        if (loggedIn) {
            const r = await fetch(urls.todo, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            if (r.status !== 200) throw r
            payload.cloud = syncStatus.SYNCED

            updateLocalStorage(payload)
            dispatch({
                type: actions.ADD_TODO,
                payload,
            })
        } else throw Error()
    } catch (e) {
        updateLocalStorage(payload)
        dispatch({
            type: actions.ADD_TODO,
            payload,
        })
    }
}
