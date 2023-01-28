import { timeStamp } from './CreatedStatistics'

export default function History({ handleUpdate, stamp }) {
    return (
        <ul className="text-md flex flex-row gap-x-2">
            <button
                className={`border rounded-md px-2 py-1 ${
                    stamp === timeStamp.ONE_WEEK ? 'bg-popupbg' : 'bg-inherit'
                }
                        `}
                onClick={() => {
                    handleUpdate(timeStamp.ONE_WEEK)
                }}
            >
                Last Week
            </button>
            <button
                className={`border rounded-md px-2 py-1 ${
                    stamp === timeStamp.ONE_MONTH ? 'bg-popupbg' : 'bg-inherit'
                }
                        `}
                onClick={() => {
                    handleUpdate(timeStamp.ONE_MONTH)
                }}
            >
                Last Month
            </button>
            <button
                className={`border rounded-md px-2 py-1 ${
                    stamp === timeStamp.THREE_MONTH
                        ? 'bg-popupbg'
                        : 'bg-inherit'
                }
                        `}
                onClick={() => {
                    handleUpdate(timeStamp.THREE_MONTH)
                }}
            >
                Last 3 months
            </button>
            <button
                className={`border rounded-md px-2 py-1 ${
                    stamp === timeStamp.CUSTOM ? 'bg-popupbg' : 'bg-inherit'
                }
                        `}
            >
                Custom
            </button>
        </ul>
    )
}