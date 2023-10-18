import React, {FC, useContext, useEffect, useState} from "react";
import Chart, {Data} from "../ui/Chart.tsx";
import {BACKEND_ADDRESS} from "../../http";
import {Context, PStore} from "../../main.tsx";
import {observer} from "mobx-react-lite";

interface Props {
    command: string,
    setData_: React.Dispatch<React.SetStateAction<Data[]>>
}

export const Parse: FC<Props> = observer(({command, setData_}) => {
    const {store} = useContext<PStore>(Context);
    const [data, setData] = useState<Data []>([])
    const [width, setWidth] = useState(35)

    useEffect(() => {
        const socket = new WebSocket(`ws://${BACKEND_ADDRESS}/ws/`);

        socket.onopen = () => {
            const request = {
                command: command,
            };
            socket.send(JSON.stringify(request));
        };

        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);

            if (response.status === "Parsing started") {
                console.log("Parsing started");
            } else if (response.price) {

                if (command === "parse-test") {
                    store.setIsLoading1(false);
                } else {
                    store.setIsLoading2(false);
                }

                setData((prevState) => {
                    const value = [...prevState, {date: new Date(), value: response.price}];
                    setData_(value);
                    return value;
                })
                setWidth((prevState) => prevState + 35)
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = (event) => {
            if (event.wasClean) {
                console.log(
                    `WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`
                );
            } else {
                console.error("WebSocket connection abruptly closed");
            }
        };

        return () => {
            socket.close();
        };
    }, [command, setData_]);
    const [n, setN] = useState(5)
    return (
        <>
            {!(store.isLoading1 && store.isLoading2) &&
                <>
                    <div className="m-4" style={{width: "50%"}}>
                        <input type="range" className="form-range" id="customRange1"
                               min="5" max="200"
                               value={n}
                               onChange={event => setN(Number(event.target.value))}
                        />
                    </div>
                    <div className="table-responsive ms-4 me-4">
                        <Chart data={data} width_={width} n={n}/>
                    </div>
                </>
            }
        </>
    );
});