import CustomButton from "../ui/CustomButton.tsx";
import {routers, RoutesNames} from "../routers/Router.ts";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {Context, PStore} from "../../main.tsx";
import {ParsingPage} from "./ParsingPage.tsx";

export const PersonalAccount = () => {
    const {store} = useContext<PStore>(Context);
    const navigate = useNavigate();
    const path = routers.get(RoutesNames.Home)?.path;
    return (
        <>
            <div
                className="d-flex flex-row d-flex justify-content-between ms-4 me-4 mt-4 pb-4 border-bottom">
                <div>
                    <div className="">Добро пожаловать</div>
                </div>
                <div className="">
                    <CustomButton
                        onClick={() => {
                            store.logout();
                            path && navigate(path);
                        }}
                    >
                        logout
                    </CustomButton>
                </div>
            </div>
            <ParsingPage/>
        </>
    );
};