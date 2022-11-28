import type { NextApiRequest, NextApiResponse } from "next";
import { co2, pir, humidity, light, temperature } from "@prisma/client";
import client from "../../libs/server/client";
type Data = {
  check?: string;
  dataset: Dataset;
};
interface Dataset {
  co2: co2[];
  pir: pir[];
  humidity: humidity[];
  light: light[];
  temperature: temperature[];
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const co2: co2[] = await client.co2.findMany({
    where: {
      ho: {
        endsWith: "413",
      },
    },
    orderBy: {
      time: "desc",
    },
    take: 1,
  });
  const pir: pir[] = await client.pir.findMany({
    where: {
      ho: {
        endsWith: "413",
      },
    },
    orderBy: {
      time: "desc",
    },
    take: 1,
  });
  const humidity: humidity[] = await client.humidity.findMany({
    where: {
      ho: {
        endsWith: "413",
      },
    },
    orderBy: {
      time: "desc",
    },
    take: 1,
  });
  const light: light[] = await client.light.findMany({
    where: {
      ho: {
        endsWith: "413",
      },
    },
    orderBy: {
      time: "desc",
    },
    take: 1,
  });
  const temperature: temperature[] = await client.temperature.findMany({
    where: {
      ho: {
        endsWith: "413",
      },
    },
    orderBy: {
      time: "desc",
    },
    take: 1,
  });

  const dataset = {
    co2,
    pir,
    humidity,
    light,
    temperature,
  };

  res.status(200).json({
    check: "ok",
    dataset: dataset,
  });
}
