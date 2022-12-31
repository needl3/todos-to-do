import React, { Suspense, useState } from 'react'
const Main = React.lazy(() => import('./components/Main'))
const User = React.lazy(() => import('./components/User'))

import './App.css'

export default function App() {
    const [accessToken, setLoginStat] = useState(
        localStorage.getItem('userData') == null
            ? undefined
            : JSON.parse(localStorage.getItem('userData')).accessToken
    )
    return (
        <>
            <Suspense fallback={<div></div>}>
                <User
                    setToken={token => {
                        setLoginStat(token)
                    }}
                />
            </Suspense>
            <Suspense fallback={<div></div>}>
                <Main accessToken={accessToken} />
            </Suspense>
        </>
    )
}
