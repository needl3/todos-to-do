import * as actions from '../actiontypes'
import urls from '../../../utils/urls'
import { syncStatus } from '../../../utils/states'
import { createPopup } from '../popup'

export default id => async (dispatch, getState) => {
    if (id) {
        const todos = [...getState().todo]

        let index = 0
        for (; index < todos.length && id !== todos[index].id; index++);

        // Mark syncing
        todos[index].cloud = syncStatus.SYNCING
        dispatch({ type: actions.SYNC_TODO, payload: [...todos] })
        try {
            console.log(todos[index])
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
        try {
            const response = await fetch(urls.todo, {
                credentials: 'include',
            })

            if (response.status !== 200) throw response

            const serverTodos = (await response.json()).todos

            const integratedTodos = [...serverTodos, ...getState().todo]

            dispatch({ type: actions.SYNC_TODO, payload: integratedTodos })
            // Make a useEffect to update Local storage automatically
            // if todos change later
            localStorage.setItem('todos', JSON.stringify(integratedTodos))
        } catch (e) {
            dispatch({
                type: actions.SYNC_TODO,
                payload: [],
            })
            console.error(e)
        }
    }
}
