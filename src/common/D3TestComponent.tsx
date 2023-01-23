import * as d3 from "d3";

const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  // .append("g")
  // .attr("transform", `translate(${margin.left}, ${margin.top})`);

svg
  .append("text")
  .attr("x", 100)
  .attr("y", 100)
  .text("Hello d3js");

svg.append("circle")
  .attr("r", 30)
  .attr("cx", 60)
  .attr("cy", 50);

