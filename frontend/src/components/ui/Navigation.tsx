import {routers, RoutesNames} from "../routers/Router.ts";
import {NavLink} from "react-router-dom";
import {FC, useContext} from "react";
import {Context, PStore} from "../../main.tsx";
import {observer} from "mobx-react-lite";

interface isActive {
    isActive: boolean,
}

const Navigation: FC = () => {
    const {store} = useContext<PStore>(Context);
    const setActive = ({isActive}: isActive) =>
        isActive ?
            "link link-underline-primary link-offset-3" :
            "link-underline link-underline-opacity-0"
    return (
        <>
            <ul className="nav border-bottom p-2">
                {Array.from(routers.values()).filter((route) => {
                    if (store.isAuth) {
                        return route.alwaysVisible || route.authVisible === store.isAuth;
                    } else {
                        return route.alwaysVisible || route.authVisible === false;
                    }
                }).map(route =>
                    <li className="nav-item m-2" key={route.path}>
                        <NavLink
                            className={setActive}
                            to={route.path}
                        >{route.name}</NavLink>
                    </li>
                )}
            </ul>
        </>
    )
}

export default observer(Navigation);