import {FC, ReactNode, useContext} from "react";
import Spinner from "../ux/Spinner.tsx";
import {Context, PStore} from "../../main.tsx";
import {observer} from "mobx-react-lite";

interface Props {
    children: ReactNode,
    onClick: any
}

const CustomButton: FC<Props> = ({children, onClick}) => {
    const {store} = useContext<PStore>(Context);
    return (
        <>
            <div
                className="btn btn-primary ps-3 pe-3"
                onClick={onClick}
            >
                {store.isLoading ? <Spinner/> : children}
            </div>
        </>
    );
}

export default observer(CustomButton);