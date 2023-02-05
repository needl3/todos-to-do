import states from '../../../utils/states'
import urls from '../../../utils/urls'
import * as actions from '../actiontypes'
import { createPopup } from '../popup'
import { syncTodo } from '../todo'
import { changeState } from '../../actions'
export default () => (dispatch, getState) => {
    const data = {
        type: actions.LOGOUT,
        payload: { name: getState().auth.name },
    }

    localStorage.removeItem('name')

    fetch(urls.logout, { method: 'DELETE', credentials: 'include' })
        .then(r => {
            if (r.status !== 200) throw r

            data.payload.name = null
            dispatch(createPopup('Logged out', true, 3000))
            dispatch(data)

            // Preserve non synced Todos in react state
            // Dispatched after 1 second because
            // server sends token with expiry of 1second
            // so dispatching before that will just copy synced todos instead of removing instead
            // since the request to server will still be valid then
            setTimeout(() => {
                dispatch(syncTodo())
                dispatch(changeState(states.LANDING))
            }, 1000)
        })
        .catch(async e => {
            console.error(e)
            dispatch(createPopup((await e.json()).message), false, 3000)
            console.error(e)
            dispatch(data)
        })
}
