import { useForm } from 'react-hook-form'
import Error from './Error'
import type { TicketData } from '../types'
import { useTicketStore } from '../store'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function TicketForm() {
    const addTicket = useTicketStore((state) => state.addTicket)
    const activeId = useTicketStore((state) => state.activeId)
    const tickets = useTicketStore((state) => state.tickets)
    const updateTickets = useTicketStore((state) => state.updateTickets)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<TicketData>()

    useEffect(() => {
        if (activeId && tickets) {
            const activeTicket = tickets.find((ticket) => ticket.id === activeId)
            if (activeTicket) {
                setValue('name', activeTicket.name)
                setValue('metric', activeTicket.metric)
                setValue('date', activeTicket.date)
                setValue('email', activeTicket.email)
                setValue('description', activeTicket.description)
            }
        }
    }, [activeId, tickets, setValue])

    const registerTicket = (data: TicketData) => {
        if (activeId) {
            updateTickets(data)
            toast.success('Ticket updated successfully')
        } else {
            addTicket(data)
            toast.success('Ticket registered successfully')
        }
        reset()
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Ticket Tracking</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Add tickets and {''}
                <span className="text-indigo-600 font-bold">manage them</span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                noValidate
                onSubmit={handleSubmit(registerTicket)}
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Ticket
                    </label>
                    <input
                        id="name"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Username"
                        {...register('name', {
                            required: 'The username is required',
                        })}
                    />
                    {errors.name && <Error>{errors.name?.message}</Error>}
                </div>

                <div className="mb-5">
                    <label htmlFor="metric" className="text-sm uppercase font-bold">
                        Metric
                    </label>
                    <input
                        id="metric"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Metric"
                        {...register('metric', {
                            required: 'The metric is required',
                        })}
                    />
                    {errors.metric && <Error>{errors.metric?.message}</Error>}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                    User email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3  border border-gray-100"
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

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                    Creation date
                    </label>
                    <input
                        id="date"
                        className="w-full p-3  border border-gray-100"
                        type="date"
                        {...register('date', {
                            required: 'The creation date is required',
                        })}
                    />
                    {errors.date && <Error>{errors.date?.message}</Error>}
                </div>

                <div className="mb-5">
                    <label htmlFor="description" className="text-sm uppercase font-bold">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="w-full p-3  border border-gray-100"
                        placeholder="Description"
                        {...register('description', {
                            required: 'Description required',
                        })}
                    />
                    {errors.description && <Error>{errors.description?.message}</Error>}
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value="Save Ticket"
                />
            </form>
        </div>
    )
}
