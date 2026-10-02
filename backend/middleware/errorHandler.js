import { logger, errorInfo } from "../utils/logger.js";

export const notFound = (req, res) =>
  res.status(404).json({ success: false, message: "Not found." });

// Last stop for any error. Visitors get a short, generic message; the details
// go to the server log only, so internals are never exposed to attackers.
// Express recognises an error handler by its four arguments, so `next` stays.
export const errorHandler = (err, req, res, next) => {
  if (err.type === "entity.parse.failed")
    return res.status(400).json({ success: false, message: "Invalid request." });

  if (err.type === "entity.too.large")
    return res.status(413).json({ success: false, message: "Request is too large." });

  logger.error("Unhandled error", { path: req.originalUrl, ...errorInfo(err) });
  res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
};
