// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { siweServer } from "@/utils/siweServer";

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await siweServer.getSession(req, res);
  console.log(result, "result");
  res.status(200).json({ name: 'John Doe' })
}
