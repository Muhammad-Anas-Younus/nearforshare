import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const isError = req.query?.error;
  if (isError) {
    // Simulate an error for testing purposes
    throw new Error("Simulated error for testing");
  }
  res.json({
    message: "Drops api is indeed working!",
  });
});

export default router;
