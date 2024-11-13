import { useForm } from 'react-hook-form' // Importa el hook useForm para gestionar el formulario y la validación
import Error from './Error' // Importa el componente Error para mostrar los mensajes de error de validación
import type { TicketData } from '../types' // Importa el tipo TicketData para tipar los datos del ticket en el formulario
import { useTicketStore } from '../store' // Importa el hook useTicketStore para interactuar con el estado global de tickets
import { useEffect } from 'react' // Importa useEffect para manejar los efectos secundarios
import { toast } from 'react-toastify' // Importa toast para mostrar notificaciones

/**
 * Componente TicketForm
 *
 * Este componente renderiza un formulario para agregar o actualizar tickets.
 * Dependiendo de si un ticket está activo (editando un ticket existente),
 * el formulario se pre-puebla con los datos de ese ticket.
 * El formulario permite la validación de los campos y muestra los errores correspondientes.
 * Después de enviar el formulario, el ticket se guarda en el estado global.
 */
export default function TicketForm() {
    // Obtiene las funciones y datos necesarios desde el estado global usando useTicketStore
    const addTicket = useTicketStore((state) => state.addTicket)
    const activeId = useTicketStore((state) => state.activeId)
    const tickets = useTicketStore((state) => state.tickets)
    const updateTickets = useTicketStore((state) => state.updateTickets)

    // Configura el hook useForm para manejar el formulario y la validación de los datos
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<TicketData>()

    // Efecto secundario que se ejecuta cuando el ID del ticket activo o los tickets cambian
    useEffect(() => {
        if (activeId && tickets) {
            const activeTicket = tickets.find((ticket) => ticket.id === activeId)
            if (activeTicket) {
                // Pre-puebla el formulario con los datos del ticket activo
                setValue('name', activeTicket.name)
                setValue('metric', activeTicket.metric)
                setValue('status', activeTicket.status)
                setValue('priority', activeTicket.priority)
                setValue('date', activeTicket.date)
                setValue('email', activeTicket.email)
                setValue('description', activeTicket.description)
            }
        }
    }, [activeId, tickets, setValue])

    // Función que maneja el envío del formulario, registrando o actualizando el ticket
    const registerTicket = (data: TicketData) => {
        if (activeId) {
            updateTickets(data) // Si hay un ID activo, actualiza el ticket existente
            toast.success('Ticket updated successfully') // Muestra notificación de éxito
        } else {
            addTicket(data) // Si no hay ID activo, agrega un nuevo ticket
            toast.success('Ticket registered successfully') // Muestra notificación de éxito
        }
        reset() // Resetea el formulario después del envío
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Ticket Tracking</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Add tickets and {''}
                <span className="text-indigo-600 font-bold">manage them</span>
            </p>

            {/* Formulario para agregar o editar tickets */}
            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                noValidate
                onSubmit={handleSubmit(registerTicket)} // Envío del formulario
            >
                {/* Campo para el nombre del ticket */}
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Ticket
                    </label>
                    <input
                        id="name"
                        className="w-full p-3 border border-gray-100"
                        type="text"
                        placeholder="Username"
                        {...register('name', { required: 'The username is required' })} // Registro y validación del campo
                    />
                    {errors.name && <Error>{errors.name?.message}</Error>} {/* Muestra errores de validación */}
                </div>

                {/* Campo para la métrica */}
                <div className="mb-5">
                    <label htmlFor="metric" className="text-sm uppercase font-bold">
                        Metric
                    </label>
                    <input
                        id="metric"
                        className="w-full p-3 border border-gray-100"
                        type="text"
                        placeholder="Metric"
                        {...register('metric', { required: 'The metric is required' })}
                    />
                    {errors.metric && <Error>{errors.metric?.message}</Error>}
                </div>

                {/* Campo para el estado */}
                <div className="mb-5">
                    <label htmlFor="status" className="text-sm uppercase font-bold">
                        Status
                    </label>
                    <select
                        id="status"
                        className="w-full p-3 border border-gray-100"
                        {...register('status', { required: 'The status is required' })}
                    >
                        <option value="">Select Status</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    {errors.status && <Error>{errors.status?.message}</Error>}
                </div>

                {/* Campo para la prioridad */}
                <div className="mb-5">
                    <label htmlFor="priority" className="text-sm uppercase font-bold">
                        Priority
                    </label>
                    <select
                        id="priority"
                        className="w-full p-3 border border-gray-100"
                        {...register('priority', { required: 'The priority is required' })}
                    >
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    {errors.priority && <Error>{errors.priority?.message}</Error>}
                </div>

                {/* Campo para el correo electrónico */}
                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        User email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3 border border-gray-100"
                        type="email"
                        placeholder="User email"
                        {...register('email', {
                            required: 'User email required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email',
                            },
                        })}
                    />
                    {errors.email && <Error>{errors.email?.message}</Error>}
                </div>

                {/* Campo para la fecha */}
                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Creation date
                    </label>
                    <input
                        id="date"
                        className="w-full p-3 border border-gray-100"
                        type="date"
                        {...register('date', { required: 'The creation date is required' })}
                    />
                    {errors.date && <Error>{errors.date?.message}</Error>}
                </div>

                {/* Campo para la descripción */}
                <div className="mb-5">
                    <label htmlFor="description" className="text-sm uppercase font-bold">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="w-full p-3 border border-gray-100"
                        placeholder="Description"
                        {...register('description', { required: 'Description required' })}
                    />
                    {errors.description && <Error>{errors.description?.message}</Error>}
                </div>

                {/* Botón para enviar el formulario */}
                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value="Save Ticket"
                />
            </form>
        </div>
    )
}
