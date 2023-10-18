import {FC} from "react";

const Spinner: FC = () => {
    return (
        <>
            <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </>
    );
}

export default Spinner;