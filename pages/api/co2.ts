import type { NextApiRequest, NextApiResponse } from "next";
import { co2 } from "@prisma/client";
import client from "../../libs/server/client";
type Data = {
  check?: string;
  dataset?: co2[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await client.co2.findMany({
    where: {
      ho: {
        endsWith: "413",
      },
    },
  });

  res.status(200).json({ check: "ok", dataset: result });
}
