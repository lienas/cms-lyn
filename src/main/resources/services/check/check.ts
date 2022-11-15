interface Request {
  body: string
}

interface Response {
  status: number,
  contentType: string,
  body: string
}

export function post(req: Request): Response {
  const params = JSON.parse(req.body) || {};

  return {
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({message: `Params length is ${params.length}.`})
  }
};
