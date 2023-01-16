import { BsCloudCheck, BsCloudMinus } from 'react-icons/bs'
import { AiOutlineCloudSync } from 'react-icons/ai'

import { syncTodo } from '../../redux/actions'

import { syncStatus } from '../../utils/states'
import { useDispatch, useSelector } from 'react-redux'

export default function Synced({ synced, id }) {
    const dispatch = useDispatch()

    if (!useSelector(state => state.auth.name)) return <></>

    switch (synced) {
        case syncStatus.SYNCED:
            return <BsCloudCheck color="#317b43" size={'1.7em'} />
        case syncStatus.SYNCING:
            return <AiOutlineCloudSync size={'1.7em'} />
        case syncStatus.SYNC_FAILED:
            return (
                <BsCloudMinus
                    size={'1.7em'}
                    className="hover:text-loggedin hover:cursor-pointer transition duration-200"
                    onClick={() => dispatch(syncTodo(id))}
                />
            )
        default:
            return <></>
    }
}
