import * as d3 from "d3";
import React, {FC, useEffect, useState} from "react";
import "./style.css";

interface Props {
    data: Data[];
    width_: number;
    n: number
}

export interface Data {
    date: Date;
    value: number;
}

export const Chart: FC<Props> = ({data, width_, n}) => {

    const margin = {top: 40, right: 30, bottom: 30, left: 40};
    const width = width_ - margin.left - margin.right;

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
        .scaleTime()
        .domain(d3.extent(data, (d) => d.date))
        .range([0, width]);

    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .nice()
        .range([height, 0]);

    const yAxis = d3.axisLeft(yScale);

    const line = d3
        .line()
        // @ts-ignore
        .x((d) => xScale(d.date))
        // @ts-ignore
        .y((d) => yScale(d.value))
        .curve(d3.curveCatmullRom);

    const area = d3
        .area()
        // @ts-ignore
        .x((d) => xScale(d.date))
        .y0(yScale(0))
        // @ts-ignore
        .y1((d) => yScale(d.value))
        .curve(d3.curveCatmullRom);

    const [activeIndex, setActiveIndex] = useState(null);

    const handleMouseMove = (event) => {
        const x = xScale.invert(event.nativeEvent.offsetX - 40);
        // @ts-ignore
        const bisectDate = d3.bisector((d) => d.date).center;
        const index = bisectDate(data, x, 0);
        setActiveIndex(index);
    };

    const handleMouseLeave = () => {
        setActiveIndex(null);
    };

    const averageValue = d3.mean(data, (d) => d.value);

    // Добавим скользящую среднюю
    const movingAverage = (data, n) => {
        return data.map((d, i) => {
            const start = Math.max(0, i - n);
            const end = i + 1;
            const values = data.slice(start, end);
            // @ts-ignore
            const sum = d3.sum(values, (d) => d.value);
            return {
                date: d.date,
                value: sum / values.length,
            };
        });
    };


    const movingAverageData = movingAverage(data, n);

    const movingAverageLine = d3
        .line()
        // @ts-ignore
        .x((d) => xScale(d.date))
        // @ts-ignore
        .y((d) => yScale(d.value))
        .curve(d3.curveCatmullRom);

    return (
        <svg
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
            className="m-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <g className="axis" transform={`translate(${margin.left},${margin.top})`}
               ref={(ref) => d3.select(ref).call(yAxis)}/>
            <g className="axis xAxis" transform={`translate(${margin.left},${height + margin.top})`}/>
            <g transform={`translate(${margin.left},${margin.top})`}>
                {data.map((item, index) => (
                    <g key={index}>
                        {index === activeIndex && (
                            <text fill="#666" x={xScale(item.date)} y={yScale(item.value) - 10} textAnchor="middle">
                                {item.value}
                            </text>
                        )}
                        <circle
                            cx={xScale(item.date)}
                            cy={yScale(item.value)}
                            r={index === activeIndex ? 8 : 4}
                            fill="#7cb5ec"
                            style={{transition: `ease-out .15s`}}
                        />
                    </g>
                ))}
                <path
                    className="line"
                    strokeWidth={3}
                    fill="none"
                    stroke="#7cb5ec"
                    // @ts-ignore
                    d={line(data)}
                    opacity={0.5}
                />
                <path
                    className="area"
                    fill="#7cb5ec"
                    // @ts-ignore
                    d={area(data)}
                    opacity={0.1}
                />
                <line
                    x1={0}
                    x2={width}
                    y1={yScale(averageValue)}
                    y2={yScale(averageValue)}
                    stroke="#7cb5ec"
                    strokeWidth={2}
                    strokeDasharray="10"
                />
                <text x={100} y={yScale(averageValue) + 10} dy="0.35em" fill="#fffff" opacity={0.6}>
                    mean: {Math.ceil(averageValue)}
                </text>

                {/* Отрисовка скользящей средней */}
                <path
                    className="moving-average"
                    strokeWidth={3}
                    opacity={0.4}
                    fill="none"
                    stroke="red"
                    d={movingAverageLine(movingAverageData)}
                />
            </g>
        </svg>
    );
};

export default Chart;
