const db = require("../db/db");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const allowedRoles = ["ADMIN", "USER", "OWNER"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users
      (name, email, password, address, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [name, email, hashedPassword, address, role],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(201).json({
          message: "User created successfully",
        });
      },
    );
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.createStore = (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    const checkStore = "SELECT * FROM stores WHERE email = ?";

    db.query(checkStore, [email], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Store with this email already exists",
        });
      }

      const ownerQuery = `
          SELECT * FROM users
          WHERE id = ?
          AND role = 'OWNER'
        `;

      db.query(ownerQuery, [owner_id], (err, ownerResult) => {
        if (err) {
          return res.status(500).json(err);
        }

        if (ownerResult.length === 0) {
          return res.status(400).json({
            message: "Invalid owner ID",
          });
        }

        const query = `
              INSERT INTO stores
              (name, email, address, owner_id)
              VALUES (?, ?, ?, ?)
            `;

        db.query(
          query,
          [name, email.toLowerCase(), address, owner_id],
          (err, result) => {
            if (err) {
              return res.status(500).json(err);
            }

            res.status(201).json({
              message: "Store created successfully",
            });
          },
        );
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getDashboard = (req, res) => {
  try {
    const dashboardData = {};

    db.query("SELECT COUNT(*) as totalUsers FROM users", (err, usersResult) => {
      if (err) {
        return res.status(500).json(err);
      }

      dashboardData.totalUsers = usersResult[0].totalUsers;

      db.query(
        "SELECT COUNT(*) as totalStores FROM stores",
        (err, storesResult) => {
          if (err) {
            return res.status(500).json(err);
          }

          dashboardData.totalStores = storesResult[0].totalStores;

          db.query(
            "SELECT COUNT(*) as totalRatings FROM ratings",
            (err, ratingsResult) => {
              if (err) {
                return res.status(500).json(err);
              }

              dashboardData.totalRatings = ratingsResult[0].totalRatings;

              res.status(200).json(dashboardData);
            },
          );
        },
      );
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getUsers = (req, res) => {
  const { name, email, role } = req.query;

  const { sortBy, order } = req.query;

  let query = `
    SELECT
      id,
      name,
      email,
      address,
      role
    FROM users
    WHERE 1=1
  `;

  const values = [];

  if (name) {
    query += " AND name LIKE ?";
    values.push(`%${name}%`);
  }

  if (email) {
    query += " AND email LIKE ?";
    values.push(`%${email}%`);
  }

  if (role) {
    query += " AND role = ?";
    values.push(role);
  }

  const allowedSortFields = ["name", "email", "role"];

  if (sortBy && allowedSortFields.includes(sortBy)) {
    query += `
    ORDER BY ${sortBy}
    ${order === "desc" ? "DESC" : "ASC"}
  `;
  }

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);
  });
};

exports.getStores = (req, res) => {
  const { name, address } = req.query;

  let query = `
    SELECT
      stores.*,
      AVG(ratings.rating) as average_rating

    FROM stores

    LEFT JOIN ratings
    ON stores.id = ratings.store_id

    WHERE 1=1
  `;

  const values = [];

  if (name) {
    query += " AND stores.name LIKE ?";
    values.push(`%${name}%`);
  }

  if (address) {
    query += " AND stores.address LIKE ?";
    values.push(`%${address}%`);
  }

  query += " GROUP BY stores.id";

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);
  });
};
