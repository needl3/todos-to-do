import { useSelector, useDispatch } from 'react-redux'

import { FaPlusCircle } from 'react-icons/fa'

import Nav from './Nav'
import TodoItem from './TodoItem'

import changeState from '../../redux/actions/changeState'

import states, { checkStatus } from '../../utils/states'
import { useRef } from 'react'
import { syncTodo } from '../../redux/actions'
import { useEffect } from 'react'

export default function Landing() {
    const todos = useSelector(state => state.todo)
    const outside = useRef()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(syncTodo())
    }, [])

    return (
        <div
            ref={outside}
            className="flex flex-col mx-4 h-screen"
            onClick={e => {
                if (e.target === outside.current)
                    dispatch(changeState(states.LANDING))
            }}
        >
            <Nav />

            <div className="text-3xl self-center mb-10">
                Whatcha planning' today?
            </div>

            <div
                id="todo-container"
                className="flex flex-col self-center items-center gap-y-3"
            >
                <ul>
                    {todos.map(todo => {
                        // Animation is not working
                        // Check later
                        let bcolor
                        if (todo.checked === checkStatus.DONE)
                            bcolor = 'border-completedtodoborder'
                        else if (todo.checked === checkStatus.IN_PROGRESS)
                            bcolor = 'border-inprogresstodoborder'
                        else bcolor = 'border-incompletetodoborder'

                        return (
                            <li
                                key={todo.id}
                                className={`w-fit flex px-4 py-2 flex gap-x-5 border mb-3 items-center rounded-md todoanimation ${bcolor}`}
                            >
                                <TodoItem
                                    title={todo.title}
                                    checked={todo.checked}
                                    id={todo.id}
                                    synced={todo.cloud}
                                />
                            </li>
                        )
                    })}
                </ul>
                <button
                    id="add-todo"
                    className="px-20 py-1 border rounded-lg w-fit self-center hover:border-loggedin transition duration-300 hover:text-loggedin"
                    onClick={() => dispatch(changeState(states.ADD_TODO))}
                >
                    <FaPlusCircle size={'2em'} />
                </button>
            </div>
        </div>
    )
}
