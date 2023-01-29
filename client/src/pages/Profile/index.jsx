import { useState } from 'react'

import CreatedStat from './Statistics/CreatedStatistics'
import CompletedStat from './Statistics/CompletedStatistics'
import Leaderboards from './Leaderboards'
import Settings from './Settings'
import ProfileNav from './ProfileNav'

export const profileStates = Object.freeze({
    CREATED_TODO: 'Created Statistics',
    COMPLETED_TODO: 'Completed Statistics',
    LEADERBOARDS: 'Leaderboards',
    SETTINGS: 'Settings',
})

export default function Profile() {
    const [state, setState] = useState(profileStates.COMPLETED_TODO)

    let currentState = null
    switch (state) {
        case profileStates.CREATED_TODO:
            currentState = <CreatedStat />
            break
        case profileStates.COMPLETED_TODO:
            currentState = <CompletedStat />
            break
        case profileStates.LEADERBOARDS:
            currentState = <Leaderboards />
            break
        case profileStates.SETTINGS:
            currentState = <Settings />
            break
        default:
            currentState = <></>
    }

    return (
        <div className="flex flex-col rounded-xl w-9/12 py-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center bg-popupbg backdrop-blur-md border border-lime-300 text-white">
            <ProfileNav state={state} setState={setState} />
            {currentState}
        </div>
    )
}
