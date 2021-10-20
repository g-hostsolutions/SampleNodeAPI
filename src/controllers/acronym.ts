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

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // You also can use mongoose-paginate to automatically paginate instead.
    const { from, limit } = {
        from: parseInt(req?.query?.from?.toString(), 10) || 1,
        limit: parseInt(req?.query?.limit?.toString(), 10) || 50,
      },
      query = queryBuilder(req.query);

    const acrm: Acronymum[] = await Acronym.default.aggregate([
      { $match: query },
      { $sort: { acronym: -1 } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            { $skip: (from - 1) * limit },
            { $limit: limit },
            { $project: { _id: 0 } },
          ],
        },
      },
    ]);

    return res.status(200).send({
      acronym: acrm,
    });
  } catch (e) {
    console.log(e);
  }

  next();
};
