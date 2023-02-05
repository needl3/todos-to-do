import { useEffect, useState } from 'react'
import Todos from '../Todos'
import Graph from '../Graph'
import History from '../History'
import urls from '../../../../utils/urls'
import { useDispatch } from 'react-redux'
import { createPopup } from '../../../../redux/actions/popup'

export function getFormattedDate(toDeduct) {
    return new Date(
        new Date() - new Date().getTimezoneOffset() * 60000 - toDeduct
    )
        .toISOString()
        .slice(0, 10)
}

export const timeStamp = Object.freeze({
    ONE_WEEK: getFormattedDate(6 * 24 * 60 * 60 * 1000),
    ONE_MONTH: getFormattedDate(30 * 24 * 60 * 60 * 1000),
    THREE_MONTH: getFormattedDate(3 * 30 * 24 * 60 * 60 * 1000),
    CUSTOM: null,
})

const LIMIT = 4

export default function CreateStatistics() {
    const [createdTodos, setCreatedTodos] = useState([])
    const [upto, setUpto] = useState(timeStamp.ONE_WEEK)
    const [page, setPage] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        // Page parameter is redundant
        fetch(urls.createdStats + '?page=' + page + '&date=' + upto, {
            credentials: 'include',
        })
            .then(async r => {
                if (r.status !== 200) throw r

                setCreatedTodos((await r.json()).data)
            })
            .catch(e => {
                dispatch(
                    createPopup('Cannot fetch todos right now.', false, 3000)
                )
            })
    }, [upto])

    return (
        <>
            <div className="border rounded-md py-3 px-5 mt-3 mb-5 h-max flex gap-x-5 items-center">
                <Todos
                    todos={createdTodos.slice(page * LIMIT, (page + 1) * LIMIT)}
                    page={page}
                    setPage={setPage}
                />
                <Graph upto={upto} todos={createdTodos} />
            </div>
            <History handleUpdate={setUpto} stamp={upto} />
        </>
    )
}
