import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { BubbleData } from "./data";

interface Props {
  data: BubbleData[];
}

const BubbleChart = ({ data }: Props) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    const width = 500;
    const height = 500;

    svg.attr("width", width).attr("height", height);

    const maxSize = (d3.max(data, (d) => d.size) ?? 0) + 2;
    const margin = {
      top: 20 + maxSize,
      bottom: 20 + maxSize,
      right: 20 + maxSize,
      left: 20 + maxSize,
    };

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.x)!])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)!])
      .range([height - margin.bottom, margin.top]);

    const bubble = svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", (d) => d.size) // Add padding to the radius
      .attr("fill", "blue")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Draw the x axis
    const xAxis = d3.axisBottom(xScale);
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    // Draw the y axis
    const yAxis = d3.axisLeft(yScale);
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    bubble.append("title").text((d) => d.name);
  }, [data]);

  return <svg ref={ref} style={{ border: "1px solid #ccc" }}></svg>;
};

export default BubbleChart;
