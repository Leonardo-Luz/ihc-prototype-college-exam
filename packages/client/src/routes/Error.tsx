import { Link } from "react-router-dom";

import '../styles/error.style.css'

const Error = () => {
    return (
        <div className="body">
            <div className="container error-container">
                <h1>Oops.</h1>
                <label className="error-label">
                    <h2>Ocorreu um Erro!</h2>
                    <h2>Página não encontra!</h2>
                </label>
                <Link to={'/'} className="error-link">Voltar para a página inicial</Link>
            </div>
        </div>
    )
}

export default Error;