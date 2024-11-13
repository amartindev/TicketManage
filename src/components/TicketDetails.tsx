import { Ticket } from '../types' // Importa el tipo Ticket, que define la estructura de un ticket
import TicketDetailItem from './TicketDetailItem' // Importa el componente TicketDetailItem para mostrar los datos individuales del ticket
import { useTicketStore } from '../store' // Importa el hook personalizado useTicketStore para interactuar con el estado global de tickets
import { toast } from 'react-toastify' // Importa el módulo toast de react-toastify para mostrar notificaciones

// Define los tipos de las propiedades del componente
type TicketDetailsProps = {
    ticket: Ticket // Propiedad ticket, de tipo Ticket, que contiene los datos del ticket a mostrar
}

/**
 * Componente TicketDetails
 *
 * Este componente muestra los detalles de un ticket específico y permite al usuario
 * editar o eliminar el ticket. Los detalles del ticket se muestran en un formato de lista,
 * y se proporcionan botones de acción para la edición y eliminación.
 *
 * @param {TicketDetailsProps} props - Las propiedades del componente, que incluyen el objeto ticket
 */
export const TicketDetails = ({ ticket }: TicketDetailsProps) => {
    // Obtiene las funciones deleteTicket y getTicketById del estado global
    const deleteTicket = useTicketStore((state) => state.deleteTicket)
    const getTicketById = useTicketStore((state) => state.getTicketById)

    // Maneja la eliminación del ticket y muestra una notificación
    const handleClick = () => {
        deleteTicket(ticket.id) // Llama a la función deleteTicket con el ID del ticket
        toast.error('Ticket deleted') // Muestra una notificación de eliminación de ticket
    }

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            {/* Muestra los detalles del ticket usando el componente TicketDetailItem */}
            <TicketDetailItem label="ID" data={ticket.id} />
            <TicketDetailItem label="Name" data={ticket.name} />
            <TicketDetailItem label="Metric" data={ticket.metric} />
            <TicketDetailItem label="Status" data={ticket.status} />
            <TicketDetailItem label="Priority" data={ticket.priority} />
            <TicketDetailItem label="Email" data={ticket.email} />
            <TicketDetailItem label="Creation Date" data={ticket.date.toString()} />
            <TicketDetailItem label="Description" data={ticket.description} />
            {/* Botones para editar y eliminar el ticket */}
            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => getTicketById(ticket.id)} // Llama a la función getTicketById con el ID del ticket para editar
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => handleClick()} // Llama a handleClick para eliminar el ticket
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
