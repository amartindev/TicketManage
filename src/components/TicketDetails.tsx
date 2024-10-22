import { Ticket } from '../types'
import TicketDetailItem from './TicketDetailItem'
import { useTicketStore } from '../store'
import { toast } from 'react-toastify'

type TicketDetailsProps = {
    ticket: Ticket
}

export const TicketDetails = ({ ticket }: TicketDetailsProps) => {
    const deleteTicket = useTicketStore((state) => state.deleteTicket)
    const getTicketById = useTicketStore((state) => state.getTicketById)
    const handleClick = () => {
        deleteTicket(ticket.id)
        toast.error('Ticket deleted')
    }
    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <TicketDetailItem label="ID" data={ticket.id} />
            <TicketDetailItem label="Name" data={ticket.name} />
            <TicketDetailItem label="Metric" data={ticket.metric} />
            <TicketDetailItem label="Status" data={ticket.status} />
            <TicketDetailItem label="Priority" data={ticket.priority} />
            <TicketDetailItem label="Email" data={ticket.email} />
            <TicketDetailItem label="Creation Date" data={ticket.date.toString()} />
            <TicketDetailItem label="Description" data={ticket.description} />
            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => getTicketById(ticket.id)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                    onClick={()=>handleClick()}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
