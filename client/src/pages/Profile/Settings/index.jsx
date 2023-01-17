import Image from './Image'
import { logout, deleteAccount } from '../../../redux/actions'
import {useDispatch} from 'react-redux'

export default function Settings() {
    const dispatch = useDispatch()
    return (
        <div className="flex flex-col justify-center my-12 py-3 border border-color pt-10 rounded-lg w-10/12">
            <div className="flex gap-x-32 justify-center relative">
                <Image customClass="rounded-md w-1/4 " />
                <div className="flex flex-col gap-y-3 place-content-center">
                    <input
                        type="text"
                        className="border rounded-md px-5 py-3 bg-inherit text-center hover:cursor-not-allowed"
                        placeholder="Your Username Here"
                        readOnly
                        value={'USERNAME'}
                    />
                    <input
                        type="text"
                        className="border rounded-md px-5 py-3 bg-inherit text-center"
                        readOnly
                        value={'EMAIL@EMAIL.COM'}
                    />
                </div>
            </div>
            <div className="flex gap-x-16 justify-center mt-32">
                <button
                    className="border px-5 py-2 border-inprogresstodoborder hover:text-yellow-500 duration-200"
                    onClick={() => dispatch(logout())}
                >
                    Logout
                </button>
                <button
                    className="border px-5 py-2 border-red-500 hover:text-red-500 duration-200"
                    onClick={() => dispatch(deleteAccount())}
                >
                    Delete Account
                </button>
            </div>
        </div>
    )
}
