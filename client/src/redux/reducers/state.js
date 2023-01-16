import states from '../../utils/states'
import * as actions from '../actions/actiontypes'

export default function changeState(
    state = { state: states.LANDING, data: null },
    action
) {
    switch (action.type) {
        case actions.CHANGE_STATE:
            return action.payload
        default:
            return state
    }
}
