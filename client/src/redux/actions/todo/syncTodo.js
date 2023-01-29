import * as actions from '../actiontypes'
import urls from '../../../utils/urls'
import { syncStatus } from '../../../utils/states'
import { createPopup } from '../popup'

export default id => async (dispatch, getState) => {
    const todos = [...getState().todo]
    if (id) {
        // For syncing single todo by pressing sync button

        let index = 0
        for (; index < todos.length && id !== todos[index].id; index++);

        // Mark syncing
        todos[index].cloud = syncStatus.SYNCING
        dispatch({ type: actions.SYNC_TODO, payload: [...todos] })
        try {
            const response = await fetch(urls.todo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todos[index]),
                credentials: 'include',
            })

            if (response.status !== 200) throw response

            todos[index].cloud = syncStatus.SYNCED
        } catch (e) {
            dispatch(createPopup('Sync Failed', false))
            todos[index].cloud = syncStatus.SYNC_FAILED
            console.error(e)
        }
        dispatch({ type: actions.SYNC_TODO, payload: todos })
    } else {
        // Is triggered every time user logs in
        // Currently disabled(Why not delete this then, you ask?)
        // Because I don't want to write this again if I change my mind to auto sync on login later
        try {
            const response = await fetch(urls.todo, {
                credentials: 'include',
            })

            if (response.status !== 200) throw response

            const serverTodos = (await response.json()).todos

            const integratedTodos = [...serverTodos, ...todos]

            dispatch({ type: actions.SYNC_TODO, payload: integratedTodos })
            // Make a useEffect to update Local storage automatically
            // if todos change later
            localStorage.setItem('todos', JSON.stringify(integratedTodos))
        } catch (e) {
            // If user is not logged in
            // This means, user just logged out
            // So, filter non synced todos and preserve them
            const preservedTodos = todos.filter(
                todo => todo.cloud === syncStatus.SYNC_FAILED
            )
            localStorage.setItem('todos', JSON.stringify(preservedTodos))

            dispatch({
                type: actions.SYNC_TODO,
                payload: preservedTodos,
            })
        }
    }
}
