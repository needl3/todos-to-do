import { CChartBar } from '@coreui/react-chartjs'
import { useDispatch } from 'react-redux'
import { createPopup } from '../../../redux/actions/popup'
import { timeStamp } from './CreatedStatistics'

export default function Graph({ upto, todos }) {
    const dispatch = useDispatch()
    const adjustedData = { mapped: {}, label: [] }
    switch (upto) {
        case timeStamp.ONE_WEEK:
            let count = 7

            // Prepare label and data placeholder
            while (count--) {
                const nonFormattedDate = new Date(new Date() - count * 86400000)
                adjustedData['mapped'][
                    nonFormattedDate.toString().split(' ')[2]
                ] = 0
                adjustedData['label'].push(
                    nonFormattedDate.toString().split(' ')[0]
                )
            }

            // Parse values
            todos.forEach(todo => {
                const date = todo.createdAt.split('T')[0].split('-')[2]
                adjustedData['mapped'][date] =
                    (adjustedData['mapped'][date] || 0) + 1
            })

            break
        case timeStamp.ONE_MONTH:
            count = 30

            // Prepare label and data placeholder
            while (count--) {
                const nonFormattedDate = new Date(new Date() - count * 86400000)
                console.log(nonFormattedDate)
                adjustedData['mapped'][
                    nonFormattedDate.toString().split(' ')[2]
                ] = 0
                adjustedData['label'].push(
                    nonFormattedDate.toString().split(' ')[2]
                )
            }

            // Parse values
            todos.forEach(todo => {
                const date = todo.createdAt.split('T')[0].split('-')[2]
                adjustedData['mapped'][date] =
                    (adjustedData['mapped'][date] || 0) + 1
            })

            break
        case timeStamp.THREE_MONTH:
            dispatch(
                createPopup("Haven't implemented this one yet.", false, 3000)
            )
    }

    return (
        <CChartBar
            data={{
                labels: adjustedData.label,
                datasets: [
                    {
                        label: 'Number of Todos',
                        data: Object.values(adjustedData.mapped),
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
