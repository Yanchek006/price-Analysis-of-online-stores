import {Link} from 'react-router-dom'
import {FC} from "react";

const NotFoundPage: FC = () => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3"><span className="text-danger">Ops!</span> Page not found.</p>
                    <p className="lead">
                        The page you’re looking for does’t exist.
                    </p>
                    <Link to={'/'} className="btn btn-success">Go Home</Link>
                </div>
            </div>
        </>
    );
}

export default NotFoundPage;