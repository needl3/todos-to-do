import urls from '../../../utils/urls'
import { createPopup } from '../popup'
import { syncTodo } from '../todo'

export default password => dispatch => {
    fetch(urls.del, {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify({ password }),
    })
        .then(r => {
            if (r.status !== 200) throw r
            dispatch(createPopup('Successfully deleted account'))
            dispatch(syncTodo())
        })
        .catch(async e => {
            const response = await e.json()
            dispatch(createPopup(response.message))
        })
}
