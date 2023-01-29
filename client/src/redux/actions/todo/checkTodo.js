import store from '../../store'
import * as actions from '../../actions/actiontypes'
import urls from '../../../utils/urls'

export default function checkTodo(id, newState) {
    const todos = store.getState().todo

    let index = todos.length
    while (index--) {
        if (todos[index].id === id) break
    }

    if (index < 0) {
        return {
            type: actions.ADD_POPUP,
            payload: 'No such todo exists.',
        }
    }
    todos[index].checked = newState

    if (store.getState().auth.name) {
        fetch(urls.todo, {
            method: 'PATCH',
            body: JSON.stringify(todos[index]),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(r => {
                todos[index].cloud = syncStatus.SYNCED

                localStorage.setItem('todos', JSON.stringify(todos))
            })
            .catch(e => {
                localStorage.setItem('todos', JSON.stringify(todos))
            })
    } else localStorage.setItem('todos', JSON.stringify(todos))

    return {
        type: actions.CHECK_TODO,
        payload: [...todos],
    }
}
