import { Request, Response } from "express";
import dropModel from "../models/drop.model";

interface CreateDropRequestBody {
  textContent?: string;
  files?: any;
  location: {
    coordinates: [number, number];
  };
}

export const createDrop = async (
  req: Request<{}, {}, CreateDropRequestBody>,
  res: Response
) => {
  const { textContent, files, location } = req.body;

  if (
    !location ||
    !Array.isArray(location.coordinates) ||
    location.coordinates.length !== 2
  ) {
    throw new Error("Bad Request");
  }

  if (!textContent && !files) {
    throw new Error("Bad Request");
  }

  let body: {
    location: {
      type: string;
      coordinates: [number, number];
    };
    textContent?: string;
    files?: any;
  } = {
    location: {
      type: "Point",
      coordinates: location.coordinates,
    },
  };

  if (textContent) {
    body.textContent = textContent;
  }

  if (files) {
    body.files = files;
  }

  const savedDrop = await dropModel.create(body);

  return res.status(201).json({ success: true, drop: savedDrop });
};
