import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
    name: string
  }

export default function lmao(req: NextApiRequest,res: NextApiResponse<Data>) {
    res.status(200).json({ name: 'Get some bitches and Dawgs here' })
  }
  