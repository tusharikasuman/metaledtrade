import { fieldErrors } from "../validation/schemas.js";

// Checks req.body against a schema. On success the cleaned data (trimmed,
// unknown fields removed) is placed on req.data for the route to use.
export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body ?? {});

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Please check the highlighted fields.",
      errors: fieldErrors(result.error),
    });
  }

  req.data = result.data;
  next();
};
