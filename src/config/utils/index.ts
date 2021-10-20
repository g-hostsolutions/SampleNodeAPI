import { Request, Response } from "express";

const configResponse = (req: Request, res: Response) => {
  return res.status(+res.status).send(req)
}

export default configResponse