// Next.js API route support:   
import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs';
import path from 'path';
import Cors from 'cors';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    // Run the middleware
    await runMiddleware(req, res, cors)

  
  const jsonDirectory = path.join(process.cwd(), 'src/json');
  const fileContents = await JSON.parse(await fs.readFile(jsonDirectory + '/game-elem-mech.json', 'utf8'));

  res.status(200).json(fileContents);
}
