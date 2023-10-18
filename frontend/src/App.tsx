import React, {useContext, useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./components/ui/Navigation.tsx";
import {routers} from "./components/routers/Router.ts";
import NotFoundPage from "./components/pages/NotFoundPage.tsx";
import Footer from "./components/ui/Footer.tsx";
import TokenService from "./services/TokenService.ts";
import {Context, PStore} from "./main.tsx";
import {observer} from "mobx-react-lite";

const App = () => {
    const {store} = useContext<PStore>(Context);

    useEffect(() => {
        if (TokenService.loadTokensFromLocalStorage().refresh) {
            store.checkAuth().then();
        }
    }, [])

    return (
        <>
            <BrowserRouter>
                <div className="d-flex flex-column min-vh-100">
                    <header>
                        <Navigation/>
                    </header>
                    <div style={{minHeight: "85vh"}}>
                        <Routes>
                            {Array.from(routers.values()).filter((route) => {
                                if (store.isLoading) {
                                    return route;
                                }

                                if (route.path.includes(":")) {
                                    return true;
                                }

                                if (store.isAuth) {
                                    return route.alwaysVisible || route.authVisible === store.isAuth;
                                } else {
                                    return route.alwaysVisible || route.authVisible === false;
                                }
                            }).map(route =>
                                <Route
                                    path={route.path}
                                    element={<route.component/>}
                                    key={route.name}
                                />
                            )}
                            <Route path={"*"} element={<NotFoundPage/>}></Route>
                        </Routes>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        </>
    );
}

export default observer(App);