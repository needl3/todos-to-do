import { useSelector } from 'react-redux'

import Landing from './pages/Landing'
import Edit from './pages/Edit'
import Auth from './pages/Auth'
import Popup from './pages/Popup'
import Profile from './pages/Profile'

import { addTodo, editTodo } from './redux/actions'

import './App.css'

import states from './utils/states'

export default function App() {
    const currentState = useSelector(state => state.state)
    let OverlayPage = null

    switch (currentState.state) {
        case states.AUTH:
            OverlayPage = <Auth />
            break
        case states.PROFILE:
            OverlayPage = <Profile />
            break
        case states.ADD_TODO:
            OverlayPage = <Edit saveTodo={addTodo} />
            break
        case states.EDIT_TODO:
            OverlayPage = <Edit saveTodo={editTodo} id={currentState.data} />
            break
    }

    return (
        <>
            <Popup />
            {OverlayPage}
            <Landing />
        </>
    )
}
