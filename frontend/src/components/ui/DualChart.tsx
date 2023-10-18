import React, {FC, useState, useEffect} from "react";
import * as d3 from "d3";
import {Data} from "./Chart.tsx";
import {max} from "d3";

interface Props {
    data1: Data[];
    data2: Data[];
}

export const DualChart: FC<Props> = ({data1, data2}) => {

    const valuesFromData1 = data1.map(item => item.value).sort((a, b) => a - b);
    const valuesFromData2 = data2.map(item => item.value).sort((a, b) => a - b);


    const margin = {top: 40, right: 30, bottom: 30, left: 40};
    const width = 35 * max([data2.length, data1.length]);

    const [height, setHeight] = useState(window.innerHeight * 0.5);

    useEffect(() => {
        const handleResize = () => {
            setHeight(window.innerHeight * 0.5);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const xScale = d3
        .scaleLinear()
        .domain([0, max([data1.length - 1, data2.length - 1])])
        .range([0, width]);


    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max([...valuesFromData1, ...valuesFromData2])])
        .nice()
        .range([height, 0]);

    const yAxis = d3.axisLeft(yScale);


    const line = d3
        .line()
        .x((d, i) => xScale(i))
        // @ts-ignore
        .y((d) => yScale(d))
        .curve(d3.curveCatmullRom);

    const area = d3
        .area()
        .x((d, i) => xScale(i))
        .y0(height) // Задайте нижнюю границу области
        // @ts-ignore
        .y1((d) => yScale(d))
        .curve(d3.curveCatmullRom);

    return (
        <svg
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
            className="m-4"
        >
            <g className="axis" transform={`translate(${margin.left},${margin.top})`}
               ref={(ref) => d3.select(ref).call(yAxis)}/>
            <g className="axis xAxis" transform={`translate(${margin.left},${height + margin.top})`}/>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <path
                    className="area1"
                    fill="#7cb5ec" // Цвет для первой области
                    // @ts-ignore
                    d={area(valuesFromData1)}
                    opacity={0.1}
                />
                <path
                    className="line"
                    strokeWidth={3}
                    fill="none"
                    stroke="#7cb5ec"
                    // @ts-ignore
                    d={line(valuesFromData1)}
                    opacity={0.5}
                />
            </g>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <path
                    className="area2"
                    fill="red" // Цвет для второй области
                    // @ts-ignore
                    d={area(valuesFromData2)}
                    opacity={0.1}
                />
                <path
                    className="line"
                    strokeWidth={3}
                    fill="none"
                    stroke="red"
                    // @ts-ignore
                    d={line(valuesFromData2)}
                    opacity={0.5}
                />
            </g>
        </svg>
    );
};