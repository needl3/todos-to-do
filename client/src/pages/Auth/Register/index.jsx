import { useEffect, useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { GiCrossMark } from 'react-icons/gi'
import { useDispatch } from 'react-redux'
import { authStates } from '..'
import { requestStatus } from '..'
import { changeState, register, createPopup } from '../../../redux/actions/'
import states from '../../../utils/states'

import urls from '../../../utils/urls'

//
// Make button move sideways when repeat password doesnt match
//

export default function Register({ setState }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [username, setUsername] = useState('')
    const [checkRepeat, setCheckRepeat] = useState(<AiOutlineCheck />)
    const [status, setStatus] = useState(requestStatus.NOT_INITIATED)

    const dispatch = useDispatch()

    function tryRegister() {
        setStatus(requestStatus.SENDING)
        setTimeout(() => {
            fetch(urls.register, {
                method: 'POST',
                body: JSON.stringify({ email, password, username }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            })
                .then(r => {
                    if (r.status !== 200) throw r

                    setStatus(requestStatus.SENT)
                    dispatch(register())
                    dispatch(changeState(states.LANDING))
                })
                .catch(async e => {
                    const errmsg = (await e.json()).message
                    setStatus(requestStatus.FAILED)
                    dispatch(createPopup(errmsg, false, 2000))
                })
        }, 700)
    }
    useEffect(() => {
        if (password === repeatPassword)
            setCheckRepeat(<AiOutlineCheck color="green" size="30px" />)
        else setCheckRepeat(<GiCrossMark color="red" size="30px" />)
    }, [password, repeatPassword])

    return (
        <div className="flex flex-col rounded-xl w-fit px-48 pt-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center bg-popupbg backdrop-blur-md text-white">
            <h1 className="text-4xl mb-16">REGISTER</h1>
            <div className="flex gap-y-3 mb-5 flex-col text-xl items-center">
                <input
                    type="text"
                    className="border rounded-md px-5 py-3 bg-inherit text-center self-start ml-8"
                    placeholder="Username"
                    onChange={e => {
                        setUsername(e.target.value)
                    }}
                    value={username}
                />
                <input
                    type="email"
                    className="border rounded-md px-5 py-3 bg-inherit text-center self-start ml-8"
                    placeholder="Email"
                    onChange={e => {
                        setEmail(e.target.value)
                    }}
                    value={email}
                />
                <input
                    type="password"
                    className="border rounded-md px-5 py-3 bg-inherit text-center self-start ml-8"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <div className="flex items-center">
                    <input
                        type="password"
                        className="border rounded-md px-5 py-3 bg-inherit text-center ml-8 mr-3"
                        placeholder="Repeat Password"
                        onChange={e => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                    />
                    {checkRepeat}
                </div>
                <button
                    className="border rounded-md px-5 py-2 w-fit hover:text-loggedin hover:border-loggedin transition duration-300"
                    onClick={tryRegister}
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
                    className="px-5 py-2 w-fit text-sm -mt-5 mb-10"
                    onClick={() => setState(authStates.LOGIN)}
                >
                    Have an account? Login
                </button>
            </div>
        </div>
    )
}
