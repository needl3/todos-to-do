import { BiMinusCircle } from 'react-icons/bi'
import { GiSandsOfTime } from 'react-icons/gi'
import { BsCheckCircle } from 'react-icons/bs'

import { checkStatus } from '../../utils/states'

import { checkTodo } from '../../redux/actions'
import { useDispatch } from 'react-redux'

export default function Check({ id, setChecking }) {
    const dispatch = useDispatch()

    return (
        <div className="flex flex-col rounded-xl w-fit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center bg-popupbg backdrop-blur-md border border-lime-300 items-center">
            <p className="text-2xl mt-3 mb-5">Update Status</p>
            <div className="flex gap-x-20 px-10 py-4">
                <button
                    onClick={() => {
                        dispatch(checkTodo(id, checkStatus.DONE))
                        setChecking(false)
                    }}
                    className="flex flex-col items-center gap-y-3 hover:bg-zinc-800 px-5 py-3 rounded-md transition duration-300"
                >
                    <BsCheckCircle color="lightgreen" size="4em" />
                    Mark complete
                </button>
                <button
                    onClick={() => {
                        dispatch(checkTodo(id, checkStatus.IN_PROGRESS))
                        setChecking(false)
                    }}
                    className="flex flex-col items-center gap-y-3 hover:bg-zinc-800 px-5 py-3 rounded-md transition duration-300"
                >
                    <GiSandsOfTime color="yellow" size="4em" />
                    Mark In Progress
                </button>
                <button
                    onClick={() => {
                        dispatch(checkTodo(id, checkStatus.NOT_DONE))
                        setChecking(false)
                    }}
                    className="flex flex-col items-center gap-y-3 hover:bg-zinc-800 px-5 py-3 rounded-md transition duration-300"
                >
                    <BiMinusCircle color="black" size="4em" />
                    Mark Unattempted
                </button>
            </div>
        </div>
    )
}
