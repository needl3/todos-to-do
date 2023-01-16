import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { authStates } from '..'
import { requestStatus } from '..'
import { login, createPopup } from '../../../redux/actions/'
import urls from '../../../utils/urls'

export default function Login({ setState }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState(requestStatus.NOT_INITIATED)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === requestStatus.FAILED) {
            setTimeout(() => setStatus(requestStatus.NOT_INITIATED), 2000)
        }
    }, [status])

    function tryLogin() {
        setStatus(requestStatus.SENDING)
        fetch(urls.login, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(async r => {
                const response = await r.json()

                if (r.status !== 200) {
                    dispatch(createPopup(response.message, false, 2000))
                    throw r
                } else {
                    setStatus(requestStatus.SENT)
                    dispatch(login(response.name))
                }
            })
            .catch(e => {
                setStatus(requestStatus.FAILED)
            })
    }

    return (
        <div className="flex flex-col rounded-xl w-fit px-48 pt-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center bg-popupbg backdrop-blur-md text-white">
            <h1 className="mt-2 text-4xl mb-16">LOGIN</h1>
            <div className="flex gap-5 mb-5 mt-1 flex-col text-xl items-center ">
                <input
                    type="email"
                    className="border rounded-md px-5 py-3 bg-inherit text-center"
                    placeholder="Email"
                    onChange={e => {
                        setEmail(e.target.value)
                    }}
                    value={email}
                />
                <input
                    type="password"
                    className="border rounded-md px-5 py-3 bg-inherit text-center"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <button
                    className="border rounded-md px-5 py-2 w-fit hover:text-loggedin hover:border-loggedin transition duration-300"
                    onClick={tryLogin}
                >
                    {status}
                </button>
                <button
                    className="px-5 py-2 w-fit text-sm mt-5"
                    onClick={() => setState(authStates.FORGOT_PASSWORD)}
                >
                    Forgot Password ?
                </button>
                <button
                    className="px-5 py-2 w-fit text-sm -mt-5 mb-16"
                    onClick={setState}
                >
                    Create New Account
                </button>
            </div>
        </div>
    )
}
