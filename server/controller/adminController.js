const db = require("../db/db");
const bcrypt = require("bcrypt");



exports.createUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      address,
      role
    } = req.body;

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
          message: "User created successfully"
        });

      }
    );

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};




exports.createStore = (req, res) => {

  try {

    const {
      name,
      email,
      address,
      owner_id
    } = req.body;

    const query = `
      INSERT INTO stores
      (name, email, address, owner_id)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      query,
      [name, email, address, owner_id],
      (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.status(201).json({
          message: "Store created successfully"
        });

      }
    );

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};




exports.getDashboard = (req, res) => {

  try {

    const dashboardData = {};

    db.query(
      "SELECT COUNT(*) as totalUsers FROM users",
      (err, usersResult) => {

        if (err) {
          return res.status(500).json(err);
        }

        dashboardData.totalUsers =
          usersResult[0].totalUsers;

        db.query(
          "SELECT COUNT(*) as totalStores FROM stores",
          (err, storesResult) => {

            if (err) {
              return res.status(500).json(err);
            }

            dashboardData.totalStores =
              storesResult[0].totalStores;

            db.query(
              "SELECT COUNT(*) as totalRatings FROM ratings",
              (err, ratingsResult) => {

                if (err) {
                  return res.status(500).json(err);
                }

                dashboardData.totalRatings =
                  ratingsResult[0].totalRatings;

                res.status(200).json(dashboardData);

              }
            );

          }
        );

      }
    );

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};





exports.getUsers = (req, res) => {

  const query = `
    SELECT
      id,
      name,
      email,
      address,
      role
    FROM users
  `;

  db.query(query, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

};





exports.getStores = (req, res) => {

  const query = `
    SELECT
      stores.*,
      AVG(ratings.rating) as average_rating
    FROM stores
    LEFT JOIN ratings
    ON stores.id = ratings.store_id
    GROUP BY stores.id
  `;

  db.query(query, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

};