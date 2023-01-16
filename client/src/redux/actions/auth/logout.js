import * as actions from '../actiontypes'

export default function logout() {
    // Do some work here
    // Return corresponding response
    return {
        type: actions.LOGOUT, // Corresponding response
        payload: {},
    }
}
