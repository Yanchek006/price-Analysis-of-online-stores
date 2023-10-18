import {FC} from "react";

const Footer: FC = () => {
    return (
        <>
            <footer className="mt-auto text-center border-top p-3">
                © {new Date().getFullYear()} IKBO-24-21 Chibitok D. S
            </footer>
        </>
    );
}

export default Footer;