import { useTicketStore } from '../store'
import { TicketDetails } from './TicketDetails'

/**
 * Componente `TicketsList` que muestra una lista de tickets guardados en el estado global.
 * Utiliza `useTicketStore` para acceder a los tickets y renderiza cada uno a través del componente `TicketDetails`.
 * 
 * @component
 * @returns {JSX.Element} - Un contenedor que muestra la lista de tickets si existen, o un mensaje de indicación si no hay tickets.
 */
export default function TicketsList() {
    // Obtiene la lista de tickets del estado global usando `useTicketStore`.
    const tickets = useTicketStore((state) => state.tickets)

    return (
        <>
            <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
                {tickets.length ? (
                    <>
                        {/* Encabezado de la lista de tickets */}
                        <h2 className="font-black text-3xl text-center">List of Tickets</h2>
                        <p className='text-xl mt-5 mb-10 text-center'>
                            Manage your{' '}
                            <span className="text-indigo-600 font-bold">
                                Tickets
                            </span>
                        </p>
                        {/* Renderiza cada ticket utilizando el componente `TicketDetails` */}
                        {tickets.map(ticket => (
                            <TicketDetails key={ticket.id} ticket={ticket}></TicketDetails>
                        ))}
                    </>
                ) : (
                    <>
                        {/* Mensaje que se muestra cuando no hay tickets disponibles */}
                        <h2 className="font-black text-3xl text-center">There are no tickets</h2>
                        <p className="text-xl mt-5 mb-10 text-center">
                            Start by adding tickets{' '}
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
