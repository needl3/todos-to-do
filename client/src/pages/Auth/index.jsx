import { useState } from 'react'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'

import Processing from './Misc/Processing'
import { AiOutlineCheck } from 'react-icons/ai'
import { GiCrossMark } from 'react-icons/gi'

export const authStates = Object.freeze({
    LOGIN: 0,
    FORGOT_PASSWORD: 2,
})

export const requestStatus = Object.freeze({
    SENT: <AiOutlineCheck color="#0aa" />,
    SENDING: <Processing />,
    FAILED: <GiCrossMark color="#a22" size="1.4em" />,
    NOT_INITIATED: 'Proceed',
})

export default function Auth() {
    const [state, setState] = useState(authStates.LOGIN)

    switch (state) {
        case authStates.LOGIN:
            return <Login setState={setState} />
        case authStates.FORGOT_PASSWORD:
            return <ForgotPassword setState={setState} />
        default:
            return <Register setState={setState} />
    }
}
