import {useState} from 'react';

function App() {
    const [vistaActual, setVistaActual] = useState('home');

    return (
        <div>
            <nav>
                <button onClick={() => setVistaActual('home')}>Home</button>
                <button onClick={() => setVistaActual('recetas')}>Recetas</button>
                <button onClick={() => setVistaActual('despensa')}>Despensa</button>
                <button onClick={() => setVistaActual('calendario')}>Calendario</button>
            </nav>
        </div>
    );
}