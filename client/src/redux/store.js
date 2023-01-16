import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import states from '../utils/states'

const initialState = {
    auth: {
        name: localStorage.getItem('name')
    },
    todo: JSON.parse(localStorage.getItem('todos')) || [],
    state: {
        state: states.LANDING,
        data: null,
    },
    popups: [],
}

export default createStore(reducers, initialState, applyMiddleware(thunk))
