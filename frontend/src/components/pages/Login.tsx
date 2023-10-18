import {FC, useContext, useState} from "react";
import {IUser} from "../../models";
import {Context, PStore} from "../../main.tsx";
import {observer} from "mobx-react-lite";
import CustomButton from "../ui/CustomButton.tsx";
import {routers, RoutesNames} from "../routers/Router.ts";
import {useNavigate} from "react-router-dom";
import {ParsingPage} from "./ParsingPage.tsx";

const Login: FC = () => {
    const [user, setUser] = useState<IUser>({
        username: "",
        password: "",
    });
    const {store} = useContext<PStore>(Context);
    const path = routers.get(RoutesNames.PersonalAccount)?.path;
    const navigate = useNavigate();
    return (
        <>
            <form className="p-4 m-auto" style={{maxWidth: 500}}>
                <div
                    hidden={store.errors.login.length === 0}>
                    {store.errors.login.map(error =>
                        <div
                            className="alert alert-danger"
                            role="alert"
                            key={error}
                        >
                            {error}
                        </div>
                    )}
                </div>
                <label className="form-label">You username</label>
                <div className="input-group mb-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="username"
                        value={user.username}
                        onChange={
                            event =>
                                setUser({...user, username: event.target.value})
                        }
                    />
                </div>
                <label className="form-label">You password</label>
                <div className="input-group mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        value={user.password}
                        onChange={
                            event =>
                                setUser({...user, password: event.target.value})
                        }
                    />
                </div>
                <CustomButton
                    onClick={() =>
                        store.login(user)
                            .then(() => {
                                path && navigate(path);
                            })
                }
                >
                    login
                </CustomButton>
            </form>
        </>
    );
}

export default observer(Login);