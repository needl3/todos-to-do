import { useState, lazy } from 'react'
const Main = lazy(() => import('./components/Main'))
const User = lazy(() => import('./components/User'))

import './App.css'

export default function App() {
    const [accessToken, setLoginStat] = useState(
        localStorage.getItem('userData') == null
            ? undefined
            : JSON.parse(localStorage.getItem('userData')).accessToken
    )
    return (
        <>
            <User
                setToken={token => {
                    setLoginStat(token)
                }}
            />
            <Main accessToken={accessToken} />
        </>
    )
}
