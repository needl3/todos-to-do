import { useState } from 'react'

import { authStates } from '..'
import { requestStatus } from '..'

export default function Login({setState}) {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(requestStatus.NOT_INITIATED)

    function sendEmail() {
        setSent(requestStatus.SENDING)
        setTimeout(() => {
            fetch('http://localhost:5000/api/auth/resetpassword', {
                method: 'POST',
                body: email,
            })
                .then(r => {
                    setSent(requestStatus.SENT)
                })
                .catch(e => {
                    setSent(requestStatus.FAILED)
                })
        }, 700)
    }
    return (
        <div className="flex flex-col rounded-xl w-fit px-48 pt-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center bg-popupbg backdrop-blur-md text-white">
            <h1 className="mt-2 text-3xl mb-16">FORGOT PASSWORD</h1>
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
                <button
                    className="border rounded-md px-5 py-2 w-fit hover:text-loggedin hover:border-loggedin transition duration-300"
                    onClick={sendEmail}
                >
                    {sent}
                </button>
                {sent === requestStatus.SENT ? 'Email sent. Check your inbox': ''}
                <button className="px-5 py-2 w-fit text-sm mt-5" onClick={()=>setState(authStates.LOGIN)}>Login</button>
                <button className="px-5 py-2 w-fit text-sm -mt-5 mb-16" onClick={setState}>
                    Create New Account
                </button>
            </div>
        </div>
    )
}
