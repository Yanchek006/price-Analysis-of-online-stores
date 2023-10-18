import ReactDOM from 'react-dom/client'
import App from "./App.tsx";
import Store from "./store/store.ts";
import {createContext} from "react";
import React from 'react';

export interface PStore {
    store: Store
}

const store = new Store();

export const Context = createContext<PStore>({
    store,
})


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Context.Provider value={{
            store
        }}>
            <App/>
        </Context.Provider>
    </React.StrictMode>
)
