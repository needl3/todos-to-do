import { useSelector, useDispatch } from 'react-redux'
import { changeState } from '../../redux/actions'
import states from '../../utils/states'

export default function Nav() {
    const dispatch = useDispatch()
    const { name } = useSelector(state => state.auth)

    const displayText = name ? 'Logged In' : 'Not Logged In'

    return (
        <button
            id="user"
            className={`border-2 px-8 py-1 ${
                name
                    ? 'border-loggedin text-loggedin'
                    : ' text-notloggedin border-notloggedin'
            } my-2 self-end w-fit mr-10`}
            onClick={() => {
                if (name) dispatch(changeState(states.PROFILE))
                else dispatch(changeState(states.AUTH))
            }}
        >
            {displayText}
        </button>
    )
}
