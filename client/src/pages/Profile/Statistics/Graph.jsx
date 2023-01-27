import { CChartBar } from '@coreui/react-chartjs'
import { timeStamp } from './CreatedStatistics'

const xlabel = Object.freeze({
    ONE_WEEK: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ONE_MONTH: [...Array(30).keys()],
    THREE_MONTH: ['1/2', '1', '3/2', '2', '5/2', '3'],
    CUSTOM: null,
})

export default function Graph({ upto, createdTodos }) {
    const adjustedData = {}
    switch (upto) {
        case timeStamp.ONE_WEEK:
            adjustedData['label'] = xlabel.ONE_WEEK
            adjustedData['values'] = [...Array(7).keys()]
            console.log(adjustedData)
            break
        case timeStamp.ONE_MONTH:
            adjustedData['label'] = xlabel.ONE_MONTH
            adjustedData['values'] = [...Array(30).keys()]
            break
        case timeStamp.THREE_MONTH:
            adjustedData['label'] = xlabel.THREE_MONTH
            adjustedData['values'] = [...Array(6).keys()]
            break
        default:
            adjustedData['label'] = xlabel.CUSTOM
            break
    }

    return (
        <CChartBar
            data={{
                labels: adjustedData.label,
                datasets: [
                    {
                        label: 'Number of Todos',
                        data: adjustedData.values,
                        backgroundColor: 'lightyellow',
                        borderColor: 'rgba(40,40,40,40)',
                    },
                ],
            }}
            labels="Time"
            className="w-8/12"
        />
    )
}
