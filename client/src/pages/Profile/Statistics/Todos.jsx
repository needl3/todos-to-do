import { checkStatus } from '../../../utils/states'

export default function Todos({ todos, page, setPage }) {
    return (
        <div className="text-xl text-center border rounded px-5 py-3 ">
            <h1>Recently created todos</h1>
            <ul className="px-5 py-3 flex flex-col gap-y-2 text-sm">
                {todos.map(todo => {
                    return (
                        <li
                            key={todo.id}
                            className={`py-1 px-3 border rounded-md ${
                                todo.checked === checkStatus.DONE
                                    ? 'border-completedtodoborder'
                                    : todo.checked === checkStatus.IN_PROGRESS
                                    ? 'border-inprogresstodoborder'
                                    : 'border-incompletetodoborder'
                            } bg-background`}
                        >
                            {todo.title}
                        </li>
                    )
                })}
            </ul>
            <button
                onClick={() => setPage(page + 1)}
                className="text-sm border rounded-md px-2 py-1 float-right"
            >
                Next
            </button>
            <button
                onClick={() => setPage(page + 1)}
                className="text-sm border rounded-md px-3 py-1 float-left"
            >
                Prev
            </button>
        </div>
    )
}
