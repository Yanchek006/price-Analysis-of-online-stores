import {useContext, useState} from "react";
import {Context, PStore} from "../../main.tsx";
import {Data} from "../ui/Chart.tsx";
import {Parse} from "./Parse.tsx";
import {DualChart} from "../ui/DualChart.tsx";

export const ParsingPage = () => {
    const {store} = useContext<PStore>(Context);
    const [data1, setData1] = useState<Data[]>([])
    const [data2, setData2] = useState<Data[]>([])


    return (
        <>
            {(store.isLoading1 || store.isLoading2) &&
                <div className={"m-auto mt-5"} style={{width: 100, height: 100, background: ""}}>

                    <div className="spinner-border" role="status" style={{width: "100%", height: "100%"}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }

            <div hidden={(store.isLoading1 || store.isLoading2)}>
                <Parse command="parse-test" setData_={setData1}/>
                <Parse command="parse-maiki" setData_={setData2}/>
                <div className="table-responsive ms-4 me-4">
                    <DualChart data1={data1} data2={data2}/>
                </div>
            </div>
        </>
    );
};