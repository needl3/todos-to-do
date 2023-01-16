import * as actions from '../actions/actiontypes'

export default function reducer(
    state = {
        name: localStorage.getItem('name')
    },
    action
) {
    switch (action.type) {
        case actions.LOGIN:
            return action.payload
        case actions.LOGOUT:
            return action.payload
        case actions.DELETE_ACCOUNT:
            return action.payload
        case actions.REGISTER:
            return state
        default:
            return state
    }
}
