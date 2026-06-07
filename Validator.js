const validateEmail = (email) => {
  if (!email || typeof email !== "string") {
    return { valid: false, error: "Email must be a non-empty string." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format." };
  }
  return { valid: true, error: null };
};

const validatePhone = (phone) => {
  if (!phone || typeof phone !== "string") {
    return { valid: false, error: "Phone number must be a non-empty string." };
  }
  const standardRegex = /^\+?[1-9]\d{1,14}$/;
  const USRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const hyphenatedRegex = /^\d+(-\d+)+$/;

  const cleanPhone = phone.trim();
  if (standardRegex.test(cleanPhone) || USRegex.test(cleanPhone) || hyphenatedRegex.test(cleanPhone)) {
    return { valid: true, error: null };
  }
  return { valid: false, error: "Invalid phone number format." };
};

const validatePassword = (password) => {
  if (!password || typeof password !== "string") {
    return { valid: false, error: "Password must be a non-empty string." };
  }
  if (password.length < 8) {
    return { valid: false, error: "Password must be at least 8 characters long." };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: "Password must contain at least one uppercase letter." };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: "Password must contain at least one lowercase letter." };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: "Password must contain at least one number." };
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, error: "Password must contain at least one special character." };
  }
  return { valid: true, error: null };
};

const validateURL = (url) => {
  if (!url || typeof url !== "string") {
    return { valid: false, error: "URL must be a non-empty string." };
  }
  try {
    new URL(url);
    return { valid: true, error: null };
  } catch (e) {
    return { valid: false, error: "Invalid URL structure." };
  }
};

const validateDate = (dateString) => {
  if (!dateString || typeof dateString !== "string") {
    return { valid: false, error: "Date must be a non-empty string." };
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return { valid: false, error: "Date must match the format YYYY-MM-DD." };
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return { valid: false, error: "Date value does not exist on the calendar." };
  }

  return { valid: true, error: null };
};

const validator = {
  email: validateEmail,
  phone: validatePhone,
  password: validatePassword,
  url: validateURL,
  date: validateDate
};
