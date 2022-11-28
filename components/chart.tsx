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
import { co2, pir, humidity, light, temperature } from "@prisma/client";
interface dataset {
  co2: co2[];
  pir: pir[];
  humidity: humidity[];
  light: light[];
  temperature: temperature[];
}
interface chartDataSetType {
  name: string;
  co2: number;
  pir: number;
  humidity: number;
  light: number;
  temperature: number;
}

export default function chart() {
  const [allDataSet, setAllDataSet] = useState<dataset>();
  const [ChartDataSet, setChartDataSet] = useState<chartDataSetType[]>([]);
  function unixTime(time: any) {
    let myDate = new Date(time * 1000);
    var date =
      myDate.getMonth() +
      1 +
      "월" +
      myDate.getDate() +
      "일" +
      myDate.getHours() +
      "시" +
      myDate.getMinutes() +
      "분";
    return date;
  }
  function dataFirstSeting(props: dataset) {
    try {
      let datachart: chartDataSetType | any = [];
      for (let i = 0; i < 110; i++) {
        console.log(allDataSet, "set???");
        const Datav: any = {
          name: unixTime(props.co2[i].time).toString(),
          co2: props.co2[i].co2,
          pir: props.pir[i].pir,
          humidity: props.humidity[i].humidity,
          light: props.light[i].light,
          temperature: props.temperature[i].temperature,
        };

        datachart.push(Datav);
      }
      setChartDataSet(datachart);
    } catch (err) {
      console.log(err);
    }
  }
  async function getApiData() {
    try {
      await fetch("/api/firstdata")
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          dataFirstSeting(json.dataset);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div>
      <div>sss</div>
      <LineChart width={1000} height={300} data={ChartDataSet}>
        <CartesianGrid strokeDasharray="6 6" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="co2"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="pir"
          stroke="#d88484"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#d8af84"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="light"
          stroke="#bfd884"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#9884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
      )
    </div>
  );
}
