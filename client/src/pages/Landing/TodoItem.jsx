import Synced from './Synced'
import states, { checkStatus } from '../../utils/states'

import { BsCheckCircle } from 'react-icons/bs'
import { BiMinusCircle } from 'react-icons/bi'
import { GiSandsOfTime } from 'react-icons/gi'
import { MdOutlineDelete } from 'react-icons/md'

import { useDispatch, useSelector } from 'react-redux'
import removeTodo from '../../redux/actions/todo/removeTodo'
import { changeState } from '../../redux/actions'
import { useState } from 'react'

import Check from './Check'

export default function TodoItem({ title, checked, synced, id }) {
    const [isChecking, setChecking] = useState(false)

    const dispatch = useDispatch()
    const checkedIcon =
        checked === checkStatus.DONE ? (
            <BsCheckCircle size={'1.7em'} color="lightgreen" />
        ) : checked === checkStatus.IN_PROGRESS ? (
            <GiSandsOfTime size={'1.7em'} color="yellow" />
        ) : (
            <BiMinusCircle size={'1.7em'} color="black" />
        )
    return (
        <>
            {isChecking && <Check id={id} setChecking={setChecking} />}
            <button onClick={() => setChecking(true)}>{checkedIcon}</button>
            <input
                type="text"
                readOnly={true}
                onClick={() => {
                    dispatch(changeState(states.EDIT_TODO, id))
                }}
                value={title}
                className="bg-background border border-todoborder text-2xl text-center rounded-md uppercase hover:cursor-pointer hover:border-orange-300 transition duration-300 focus:outline-none"
            ></input>
            <Synced synced={synced} id={id} />
            <button onClick={() => dispatch(removeTodo(id))}>
                <MdOutlineDelete
                    size={'1.7em'}
                    className="transition duration-300 hover:text-red-500"
                />
            </button>
        </>
    )
}
