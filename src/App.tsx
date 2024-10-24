import TicketForm from "./components/TicketForm"
import TicketsList from "./components/TicketsList"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function App() {
    return (
        <>
            <div className="container mx-auto mt-20">
                <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
                    Ticket Tracking {''}
                    <span className="text-indigo-700">Tech</span>
                </h1>
                <div className="mt-12 md:flex">
                    <TicketForm />
                    <TicketsList />
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default App
