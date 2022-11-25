import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { co2 } from "@prisma/client";

export default function App() {
  const [co2data, setco2data] = useState<co2[]>([]);
  // const data = [
  //   {
  //     name: "Page A",
  //     uv: co2data?.co2,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  // ];
  let data1;
  useEffect(() => {
    fetch("/api/co2")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setco2data(json);
      });
    console.log(co2data);
  }, []);
  data1 = co2data?.map((ele, inx) => {
    return { name: ele.time, co2: ele.co2 };
  });
  return (
    <div>
      <div>sss</div>
      <LineChart
        width={1000}
        height={300}
        data={data1}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="co2"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}
