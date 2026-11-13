const validatePayload = ({ name, email, message }) => {
  if (!name || !email || !message) {
    return "VALIDATION_REQUIRED";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "INVALID_EMAIL";
  }

  return null;
};

module.exports = { validatePayload };
