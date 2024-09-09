import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const WeatherChart = ({ data }) => {
  return (
    <div className="chart-container">
    <LineChart width={600} height={300} data={data} style={{ margin: '0 auto', padding: '20px' }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="temperature" stroke="#8884d9" />
      <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
    </LineChart>
    </div>
  );
};

export default WeatherChart;
