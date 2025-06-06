import { Request, Response } from "express";

export const uploadFiles = async (
  req: Request,
  res: Response
): Promise<any> => {
  console.log("Received files:", req.file);
};
