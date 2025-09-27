require("dotenv").config();
const jwt = require("jsonwebtoken");

const createSecretToken = (id) => {
  try {
    const secretKey = process.env.SECRET_KEY;
    return jwt.sign({ id }, secretKey, {
      expiresIn: 3 * 24 * 60 * 60, // 3 days
    });
  } catch (error) {
    console.error("Error creating token:", error);
    throw error;
  }
};

module.exports = { createSecretToken };
