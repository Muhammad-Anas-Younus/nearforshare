import { Request, Response } from "express";
import cloudinary from "../lib/cloudinary";

export const uploadFiles = async (
  req: Request,
  res: Response
): Promise<any> => {
  const files = req.files;
  if (!files || !Array.isArray(files)) throw new Error("Bad request");

  const uploadPromises = files.map(async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
    });
    return result;
  });

  const results = await Promise.all(uploadPromises);

  const urls = results.map((result) => result.secure_url);

  return res.status(200).json({
    message: "Files uploaded successfully",
    urls: urls,
  });
};
