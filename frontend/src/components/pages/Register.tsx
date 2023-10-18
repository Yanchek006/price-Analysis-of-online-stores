import {FC, useContext, useState} from "react";
import {IRegisterUser} from "../../models";
import {Context, PStore} from "../../main.tsx";
import {observer} from "mobx-react-lite";
import CustomButton from "../ui/CustomButton.tsx";
import {routers, RoutesNames} from "../routers/Router.ts";
import {useNavigate} from "react-router-dom";

const Register: FC = () => {
    const [user, setUser] = useState<IRegisterUser>(
        {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },
    )
    const [password, setPassword] = useState('');
    const {store} = useContext<PStore>(Context);
    const path = routers.get(RoutesNames.PersonalAccount)?.path;
    const navigate = useNavigate();
    return (
        <>
            <form className="p-4 m-auto" style={{maxWidth: 500}}>
                <div
                    hidden={store.errors.register.length === 0}>
                    {store.errors.register.map(error =>
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
                <label className="form-label">You email</label>
                <div className="input-group mb-1">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="email"
                        value={user.email}
                        onChange={
                            event =>
                                setUser({...user, email: event.target.value})
                        }
                    />
                </div>
                <label className="form-label">You first name</label>
                <div className="input-group mb-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Jonh"
                        value={user.first_name}
                        onChange={
                            event =>
                                setUser({...user, first_name: event.target.value})
                        }
                    />
                </div>
                <label className="form-label">You last name</label>
                <div className="input-group mb-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rosso"
                        value={user.last_name}
                        onChange={
                            event =>
                                setUser({...user, last_name: event.target.value})
                        }
                    />
                </div>
                <label className="form-label">You password</label>
                <div className="input-group mb-1">
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
                <label className="form-label">Repeat you password</label>
                <div className="input-group mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        value={password}
                        onChange={
                            event =>
                                setPassword(event.target.value)
                        }
                    />
                </div>
                <CustomButton
                    onClick={() => {
                        store.register(user)
                            .then(() => {
                                path && navigate(path);
                            })
                    }}
                >
                    register
                </CustomButton>
            </form>
        </>
    );
}

export default observer(Register);