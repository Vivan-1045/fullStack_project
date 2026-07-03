const db = require("../db/db");
const bcrypt = require("bcrypt");


exports.updatePassword = async (req, res) => {

  try {

    const userId = req.user.id;

    const {
      oldPassword,
      newPassword
    } = req.body;

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;

    if (!passwordRegex.test(newPassword)) {

      return res.status(400).json({
        message:
          "Password must be 8-16 chars with uppercase and special character"
      });

    }

    const query =
      "SELECT * FROM users WHERE id = ?";

    db.query(query, [userId], async (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(
        oldPassword,
        user.password
      );

      if (!isMatch) {

        return res.status(400).json({
          message: "Old password incorrect"
        });

      }

      const hashedPassword =
        await bcrypt.hash(newPassword, 10);

      const updateQuery = `
        UPDATE users
        SET password = ?
        WHERE id = ?
      `;

      db.query(
        updateQuery,
        [hashedPassword, userId],
        (err, data) => {

          if (err) {
            return res.status(500).json(err);
          }

          res.status(200).json({
            message: "Password updated successfully"
          });

        }
      );

    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};