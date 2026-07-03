const db = require("../db/db");



exports.getOwnerDashboard = (req, res) => {

  const ownerId = req.user.id;

  const query = `
    SELECT
      stores.name as store_name,
      users.name as user_name,
      ratings.rating,

      (
        SELECT AVG(rating)
        FROM ratings
        WHERE ratings.store_id = stores.id
      ) as average_rating

    FROM stores

    LEFT JOIN ratings
    ON stores.id = ratings.store_id

    LEFT JOIN users
    ON ratings.user_id = users.id

    WHERE stores.owner_id = ?
  `;

  db.query(query, [ownerId], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

};