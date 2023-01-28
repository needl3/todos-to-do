import { useEffect, useState } from 'react'
import urls from '../../../utils/urls'
import { useDispatch } from 'react-redux'
import { createPopup } from '../../../redux/actions/popup'

export default function Leaderboard() {
    const dispatch = useDispatch()
    const [todoers, setTodoers] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        fetch(urls.leaderboard + `?page=${page}`, { credentials: 'include' })
            .then(async r => {
                if (r.status !== 200) throw r
                const data = await r.json()

                if (data.data.length === 0) {
                    setPage(page - 1)
                    return
                }

                const rankedData = []
                for (
                    let i = page * data.limit + 1, dataIndex = 0;
                    dataIndex < data.data.length;
                    i++, dataIndex++
                ) {
                    data.data[dataIndex].rank = i
                    rankedData.push(data.data[dataIndex])
                }

                setTodoers(rankedData)
            })
            .catch(e => {
                console.error(e)
                dispatch(
                    createPopup(
                        'Cannot fetch leaderboard data right now.',
                        false,
                        3000
                    )
                )
            })
    }, [page])

    return (
        <div className="border rounded-md py-3 px-5 mt-3 mb-5 w-10/12 flex flex-col items-center gap-x-5">
            <h1 className="border-2 rounded-md border-green-500 px-3 py-1 mb-3">
                Top Todoers
            </h1>
            <ul>
                {todoers.map(item => {
                    return (
                        <li
                            key={item.username}
                            className="flex items-center border px-3 py-1 rounded-md mt-3 gap-x-10"
                        >
                            <h2 className="px-2 border rounded-md border-yellow-500">
                                {item.rank}
                            </h2>
                            <img src={item.image} className="w-10 rounded-xl" />
                            <p className="px-5 py-2 border rounded-md border-todoborder">
                                {item.username}
                            </p>
                            <h2 className="border border-green-500 rounded-md px-2">
                                {item.completed}
                            </h2>
                            <h2 className="border border-yellow-500 rounded-md px-2">
                                {item.created}
                            </h2>
                            <h2 className="border border-green-700 rounded-md px-2">
                                {item.completed / item.created}
                            </h2>
                        </li>
                    )
                })}
            </ul>
            <div className="flex mt-3 gap-x-3">
                <button
                    onClick={() => {
                        if (page > 0) setPage(page - 1)
                    }}
                    className="bg-cyan-700 px-3 py-1 hover:bg-cyan-400 rounded duration-300"
                >
                    {'<<'}
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    className="bg-cyan-700 px-3 py-1 hover:bg-cyan-400 rounded duration-300"
                >
                    {'>>'}
                </button>
            </div>
        </div>
    )
}
