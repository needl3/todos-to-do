import * as actions from '../actions/actiontypes'

export default function changeState(state, data) {
    const a = {
        type: actions.CHANGE_STATE,
        payload: { state, data },
    }
    return a
}
