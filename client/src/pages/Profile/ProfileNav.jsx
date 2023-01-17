import { profileStates } from '.'

export default function ProfileNav({ setState, state }) {
    return (
        <ul className="flex px-5 py-2 bg-background gap-x-16 rounded-lg w-10/12 mt-3 justify-center">
            <li
                key={profileStates.CREATED_TODO}
                className="rounded-lg bg-popupbg px-5 py-1 hover:cursor-pointer hover:text-slate-400 transition duration-200"
                onClick={() => setState(profileStates.CREATED_TODO)}
            >
                {profileStates.CREATED_TODO}
            </li>
            <li
                key={profileStates.COMPLETED_TODO}
                className="rounded-lg bg-popupbg px-5 py-1 hover:cursor-pointer hover:text-slate-400 transition duration-200"
                onClick={() => setState(profileStates.COMPLETED_TODO)}
            >
                {profileStates.COMPLETED_TODO}
            </li>
            <li
                key={profileStates.LEADERBOARDS}
                className="rounded-lg bg-popupbg px-5 py-1 hover:cursor-pointer hover:text-slate-400 transition duration-200"
                onClick={() => setState(profileStates.LEADERBOARDS)}
            >
                {profileStates.LEADERBOARDS}
            </li>
            <li
                key={profileStates.SETTINGS}
                className="rounded-lg bg-popupbg px-5 py-1 hover:cursor-pointer hover:text-slate-400 transition duration-200"
                onClick={() => setState(profileStates.SETTINGS)}
            >
                {profileStates.SETTINGS}
            </li>
        </ul>
    )
}
