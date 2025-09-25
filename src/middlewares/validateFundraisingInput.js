// middlewares/validateFundraisingInput.js
import { isValidBase64 } from "../utils/validators.js";

export function validateFundraisingInput(req, res, next) {
  const { project_id, text, imageBase64 } = req.body;

  // validate project_id
  if (
    !project_id ||
    typeof project_id !== "string" ||
    project_id.trim().length === 0
  ) {
    const err = new Error(
      "Invalid input: 'project_id' is required and must be a non-empty string"
    );
    err.statusCode = 400;
    return next(err);
  }

  // validate text
  if (!text || typeof text !== "string" || text.trim().length < 10) {
    const err = new Error(
      "Invalid input: 'text' must be a non-empty string with at least 10 characters"
    );
    err.statusCode = 400;
    return next(err);
  }

  // validate image (nếu có)
  if (imageBase64) {
    if (typeof imageBase64 !== "string" || !isValidBase64(imageBase64)) {
      const err = new Error(
        "Invalid input: 'imageBase64' must be a valid Base64 string"
      );
      err.statusCode = 400;
      return next(err);
    }
  }

  next();
}
