import { NextApiRequest, NextApiResponse } from 'next'

const biography = {
  name: 'Rizki Maulana Citra',
  born: 'Pandeglang, XX - XX - 2003',
  age: 19,
  status: 'Alive',
  occupant: 'Serang - Banten, Indonesia'
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(403).send({
      message: 'Your method sould be GET, otherwise it would cause error 😄',
      code: res.statusCode,
      data: null
    })
  }

  return res.status(200).send({
    message: 'fetch successfully',
    code: res.statusCode,
    data: biography
  })
}
