import { Request, Response, NextFunction } from "express";
import { Acronym } from "../models";
import { Acronymum } from "../models/Acronym";

const queryBuilder = (query: any) => {
  let newQuery: any = {};

  if (query.search) {
    const regex = { $regex: `.*${query.search}.*` };
    newQuery.$or = [{ acronym: regex }, { value: regex }];
  }

  return newQuery;
};

export const get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, limit } = {
        from: parseInt(req?.query?.from?.toString(), 10) || 1,
        limit: parseInt(req?.query?.limit?.toString(), 10) || 50,
      },
      query = queryBuilder(req.query),
      acr = await Acronym.default
        .find(query)
        .limit(limit)
        .skip((from - 1) * limit);

    return res.status(200).send({
      acronym: acr,
    });
  } catch (e) {
    console.log(e);
  }

  next();
};
