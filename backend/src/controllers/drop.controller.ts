import { Request, Response } from "express";
import dropModel from "../models/drop.model";

const MAX_DISTANCE = 50;

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
): Promise<any> => {
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

interface GetNearbyDropsRequestQuery {
  latitude: string;
  longitude: string;
}

export const getNearbyDrops = async (
  req: Request<{}, {}, {}, GetNearbyDropsRequestQuery>,
  res: Response
): Promise<any> => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    throw new Error("Bad Request");
  }

  const drops = await dropModel.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        $maxDistance: MAX_DISTANCE, // radius in meters
      },
    },
    expiresAt: { $gt: new Date() }, // only get unexpired drops
  });

  return res.status(200).json(drops);
};
