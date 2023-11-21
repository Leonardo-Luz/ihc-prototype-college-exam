import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div>
            404 Not Found
            <Link to={'/'}>Voltar</Link>
        </div>
    )
}

export default Error;