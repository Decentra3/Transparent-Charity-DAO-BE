export const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (email) {
    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    req.body.email = normalizedEmail; // chuẩn hóa email
  }

  next();
};
