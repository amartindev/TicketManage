import { useTicketStore } from '../store'
import { TicketDetails } from './TicketDetails'

export default function TicketsList() {
    const tickets = useTicketStore((state) => state.tickets)
    return (
        <>
            <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
                {tickets.length ? (
                    <>
                        <h2 className="font-black text-3xl text-center">List of Tickets</h2>
                        <p className='text-xl mt-5 mb-10 text-center'>
                            Manage your {''}
                            <span className="text-indigo-600 font-bold">
                                Tickets
                            </span>
                        </p>
                        {tickets.map(ticket => (
                            <TicketDetails key={ticket.id} ticket={ticket}></TicketDetails>
                        ))}
                    </>
                ) : (
                    <>
                        <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                        <p className="text-xl mt-5 mb-10 text-center">
                            Start by adding tickets {''}
                            <span className="text-indigo-600 font-bold">
                                and they will appear here
                            </span>
                        </p>
                    </>
                )}
            </div>
        </>
    )
}
