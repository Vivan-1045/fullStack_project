const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (name.length < 20 || name.length > 60) {
      return res.status(400).json({
        message: "Name must be between 20 and 60 characters",
      });
    }

    if (address.length > 400) {
      return res.status(400).json({
        message: "Address max length is 400",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8-16 chars with uppercase and special character",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const checkUser = "SELECT * FROM users WHERE email = ?";

    db.query(checkUser, [normalizedEmail], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashPass = await bcrypt.hash(password, 10);

      const insertQuery = `
        INSERT INTO users (name, email, password, address, role)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [name, normalizedEmail, hashPass, address, "USER"],
        (err, data) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.status(201).json({
            message: "User registered successfully",
          });
        },
      );
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], async (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
