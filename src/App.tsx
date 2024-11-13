import TicketForm from "./components/TicketForm" // Importa el componente TicketForm que permite agregar o editar tickets
import TicketsList from "./components/TicketsList" // Importa el componente TicketsList que muestra la lista de tickets
import { ToastContainer } from 'react-toastify' // Importa el contenedor de notificaciones de react-toastify
import "react-toastify/dist/ReactToastify.css" // Importa el CSS necesario para las notificaciones de react-toastify

/**
 * Componente App
 *
 * Este es el componente principal de la aplicación. Renderiza el título de la aplicación,
 * el formulario para agregar o editar tickets (TicketForm) y la lista de tickets (TicketsList).
 * También configura el contenedor para las notificaciones (ToastContainer).
 */
function App() {
    return (
        <>
            <div className="container mx-auto mt-20">
                {/* Título principal de la aplicación */}
                <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
                    Ticket Tracking {''}
                    <span className="text-indigo-700">Tech</span>
                </h1>

                {/* Contenedor para el formulario y la lista de tickets */}
                <div className="mt-12 md:flex">
                    <TicketForm /> {/* Componente que maneja el formulario para agregar o editar tickets */}
                    <TicketsList /> {/* Componente que muestra la lista de tickets registrados */}
                </div>
            </div>

            {/* Contenedor para las notificaciones de react-toastify */}
            <ToastContainer />
        </>
    )
}

export default App
