import { create } from 'zustand'
import { TicketData, Ticket } from './types'
import { v4 as uuidv4 } from 'uuid'
import { devtools, persist } from 'zustand/middleware'


type TicketState = {
    tickets: Ticket[]
    activeId: Ticket['id']
    addTicket: (data: TicketData) => void
    deleteTicket: (id: Ticket['id']) => void
    getTicketById: (id: Ticket['id']) => void
    updateTickets: (data: TicketData) => void
}

const createTicket = (ticket: TicketData): Ticket => {
    return { ...ticket, id: uuidv4() }
}

export const useTicketStore = create<TicketState>()(
    devtools(
        persist((set) => ({
        tickets: [],
        activeId: '',
        addTicket: (data) => {
            const newTicket = createTicket(data)
            set((state) => ({
                tickets: [...state.tickets, newTicket],
            }))
        },
        deleteTicket: (id) => {
            set((state) => ({
                tickets: state.tickets.filter((ticket) => ticket.id !== id),
            }))
        },
        getTicketById: (id) => {
            set(() => ({
                activeId: id,
            }))
        },
        updateTickets: (data) => {
            set((state) => ({
                tickets: state.tickets.map(ticket => ticket.id === state.activeId ? {id: state.activeId, ...data} : ticket),
                activeId: ''
            }))
        }
    }), {
        name:'ticket-storage'
    })
))
