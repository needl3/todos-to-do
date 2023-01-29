export default function Reminder({ setReminder, reminder }) {
    return (
        <div
            id="reminder-container"
            className="flex flex-col justify-center items-center gap-y-3 px-10 py-4 border border-color text-xl tracking-wider h-fit bottom-0"
        >
            <p>Remind Me</p>
            <div id="before-container" className="flex flex-row gap-x-2">
                <input
                    type="text"
                    value={reminder.beforeMinutes}
                    onChange={e =>
                        setReminder({
                            ...reminder,
                            beforeMinutes: e.target.value,
                        })
                    }
                    className="w-12 text-center bg-inherit border-todoborder border rounded-md"
                />
                <p>minutes</p>
            </div>
            <p>before</p>
            <div
                id="time-container"
                className="flex flex-row gap-x-2 items-center"
            >
                <input
                    type="text"
                    value={reminder.hour}
                    onChange={e =>
                        setReminder({
                            ...reminder,
                            hour: e.target.value,
                        })
                    }
                    className="w-12 border border-todoborder bg-inherit text-center rounded-md p-1"
                />
                :
                <input
                    type="text"
                    value={reminder.minutes}
                    onChange={e =>
                        setReminder({
                            ...reminder,
                            minutes: e.target.value,
                        })
                    }
                    className="w-12 border border-todoborder bg-inherit text-center rounded-md p-1"
                />
                <select
                    className="border border-todoborder bg-inherit text-center rounded-md p-1 text-center"
                    value={reminder.period}
                    onChange={e =>
                        setReminder({
                            ...reminder,
                            period: e.target.value,
                        })
                    }
                >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
            <p>on</p>
            <input
                type="date"
                className="bg-inherit border rounded-md border-todoborder p-2 pl-6"
                value={`${reminder.year}-${reminder.month}-${reminder.day}`}
                onChange={e => {
                    const [year, month, day] = e.target.value.split('-')
                    setReminder({ ...reminder, day, month, year })
                }}
            />
        </div>
    )
}
