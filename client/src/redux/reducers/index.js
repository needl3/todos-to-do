import { combineReducers } from 'redux'

import auth from './auth'
import todo from './todo'
import state from './state'

import * as actions from '../actions/actiontypes'
function popups(state = [], action) {
    switch (action.type) {
        case actions.ADD_POPUP:
            return [...state, action.payload]
        case actions.REMOVE_POPUP:
            return state.filter(popup => popup.id !== action.payload)
        default:
            return state
    }
}

export default combineReducers({
    auth,
    todo,
    state,
    popups,
})
