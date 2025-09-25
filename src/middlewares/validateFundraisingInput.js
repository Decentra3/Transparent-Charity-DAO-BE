// middlewares/validateFundraisingInput.js

export function validateFundraisingInput(req, res, next) {
  const { project_id, text } = req.body;
  const images = req.files?.images || [];
  const docs = req.files?.docs || [];

  // Validate project_id
  if (
    !project_id ||
    typeof project_id !== "string" ||
    project_id.trim() === ""
  ) {
    const err = new Error(
      "Invalid input: 'project_id' is required and must be a non-empty string"
    );
    err.statusCode = 400;
    return next(err);
  }

  // Validate text
  if (!text || typeof text !== "string" || text.trim().length < 10) {
    const err = new Error(
      "Invalid input: 'text' must be a non-empty string with at least 10 characters"
    );
    err.statusCode = 400;
    return next(err);
  }

  // Validate images upload (nếu có)
  if (images.length > 0) {
    for (const file of images) {
      if (!file.mimetype.startsWith("image/")) {
        const err = new Error(
          `Invalid file type: '${file.originalname}' is not an image`
        );
        err.statusCode = 400;
        return next(err);
      }
    }
  }

  // Validate docs upload (nếu có)
  if (docs.length > 0) {
    for (const file of docs) {
      if (
        file.mimetype !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        !file.originalname.endsWith(".docx")
      ) {
        const err = new Error(
          `Invalid file type: '${file.originalname}' is not a DOCX file`
        );
        err.statusCode = 400;
        return next(err);
      }
    }
  }

  next();
}
