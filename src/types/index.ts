export type Ticket = {
    id: string
    name: string
    metric: string
    status: string
    priority: string
    email: string
    date: Date
    description: string
}

export type TicketData = Omit<Ticket, 'id'>