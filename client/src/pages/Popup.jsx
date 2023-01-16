import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removePopup } from '../redux/actions'

const POPUP_LIMIT = 2

export default function Popup() {
    const dispatch = useDispatch()
    const popups = useSelector(state => state.popups)
    const [displayablePopups, setDisplayablePopups] = useState([])

    useEffect(() => {
        if (displayablePopups.length < POPUP_LIMIT && popups.length) {
            setDisplayablePopups([...displayablePopups, popups.at(0)])
            setTimeout(
                id => {
                    const targetPopup = displayablePopups.filter(item => {
                        console.log(item)
                        item.id !== id
                    })
                    setDisplayablePopups(targetPopup)
                    dispatch(removePopup(popups.at(0).id))
                },
                popups.at(0).time || 1000,
                popups.at(0).id
            )
        }
    }, [popups])

    return (
        <ul
            className={`fixed top left-1/2 mt-4 -translate-x-1/2 items-center bg-transparent flex flex-col gap-y-2`}
        >
            {displayablePopups?.map(popup => {
                return (
                    <li
                        className={`py-2 px-5 text-xl rounded-md ${popup.colorbg} ${popup.color}`}
                        key={popup.id}
                    >
                        {popup.message}
                    </li>
                )
            })}
        </ul>
    )
}
