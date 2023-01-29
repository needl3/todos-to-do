import Reminder from './Reminder'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeState } from '../../redux/actions'
import states, { checkStatus, syncStatus } from '../../utils/states'

export default function Edit({ saveTodo, id }) {
    const dispatch = useDispatch()
    const name = useSelector(state => state.auth.name)
    const todo = useSelector(state =>
        state.todo.filter(todoItem => todoItem.id === id)
    ).at(-1)
    const [content, setContent] = useState({
        title: todo?.title || '',
        description: todo?.description || '',
        id: todo?.id || String(Date.now()) + '-' + name,
        checked: todo?.checked || checkStatus.NOT_DONE,
        cloud: syncStatus.SYNC_FAILED
    })

    // Prepare new reminder data
    const currentDate = new Date()
    const [year, month, day] = currentDate.toISOString().slice(0, 10).split('-')
    const [reminder, setReminder] = useState(
        todo?.reminder || {
            beforeMinutes: 5,
            hour: currentDate.getHours(),
            minutes: currentDate.getMinutes(),
            period: currentDate.getHours() >= 12 ? 'AM' : 'PM',
            day: day,
            month: month,
            year: year,
        }
    )

    return (
        <>
            <div
                id="edit-page-container"
                className="flex flex-col rounded-xl w-fit px-10 py-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center bg-popupbg backdrop-blur-md border border-lime-300 text-white"
            >
                <h1 className="my-3 text-3xl">EDIT</h1>
                <div
                    id="edit-body"
                    className="flex flex-row py-4 gap-x-10 px-5 items-end"
                >
                    <div
                        id="content"
                        className="flex flex-col w-fit items-center"
                    >
                        <input
                            type="text"
                            placeholder="Title Here"
                            value={content.title}
                            className="bg-inherit border border-color rounded-md px-5 py-1 text-center uppercase w-fit mb-3"
                            onChange={e => {
                                setContent({
                                    ...content,
                                    title: e.target.value,
                                })
                            }}
                        ></input>
                        <input
                            type="textarea"
                            placeholder="Description Here"
                            value={content.description}
                            className="bg-inherit border border-color rounded-xl px-3 py-1 text-center uppercase w-96 h-80"
                            onChange={e =>
                                setContent({
                                    ...content,
                                    description: e.target.value,
                                })
                            }
                        ></input>
                    </div>
                    <Reminder setReminder={setReminder} reminder={reminder} />
                </div>
                <div className="flex gap-x-10">
                    <button
                        className="border px-5 py-2 w-fit rounded-md text-md my-3 hover:border-lime-400 hover:text-lime-400 transition duration-300 border-loggedin text-loggedin"
                        onClick={() => {
                            dispatch(saveTodo(content, reminder))
                            dispatch(changeState(states.LANDING))
                        }}
                    >
                        Save
                    </button>
                    <button
                        className="border px-5 py-2 w-fit rounded-md text-md my-3 hover:border-lime-400 hover:text-lime-400 transition duration-300 border-red-900 hover:border-notloggedin text-red-900 hover:text-notloggedin"
                        onClick={() => {
                            dispatch(changeState(states.LANDING))
                        }}
                    >
                        Discard
                    </button>
                </div>
            </div>
        </>
    )
}
