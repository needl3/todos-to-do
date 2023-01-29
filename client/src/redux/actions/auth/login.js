import states from '../../../utils/states'
import * as actions from '../actiontypes'
import changeState from '../changeState'
import { createPopup } from '../popup'
import { syncTodo } from '../todo'

export default name => dispatch => {
    localStorage.setItem('name', name)
    dispatch(syncTodo())

    // There must be another way to change login states
    // without dispatching here again
    // because login is being dispatched by tryLogin callback
    // So, dispatching by that will be a nicer option
    dispatch(createPopup('Logged In as '+name, true, 2000))
    dispatch(changeState(states.LANDING))
    dispatch({
        type: actions.LOGIN,
        payload: {
            name,
        },
    })
}
