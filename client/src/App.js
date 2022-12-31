import React, { Suspense } from 'react'
const Main = React.lazy(() => import('./components/Main'))
import './App.css'
import User from './components/User'
import { useState } from 'react'
export default function App() {
    const [accessToken, setLoginStat] = useState(
        localStorage.getItem('userData') == null
            ? undefined
            : JSON.parse(localStorage.getItem('userData')).accessToken
    )
    return (
        <>
            <Suspense fallback={<div>User Component Loading</div>}>
                <User
                    setToken={token => {
                        setLoginStat(token)
                    }}
                />
            </Suspense>
            <Suspense fallback={<div>Todo Loading</div>}>
                <Main accessToken={accessToken} />
            </Suspense>
        </>
    )
}
