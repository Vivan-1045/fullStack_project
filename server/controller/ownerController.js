const db = require("../db/db");



exports.getOwnerDashboard = (req, res) => {

  const ownerId = req.user.id;

  const query = `
    SELECT
      stores.id,
      stores.name,
      stores.address,

      AVG(ratings.rating) as average_rating

    FROM stores

    LEFT JOIN ratings
    ON stores.id = ratings.store_id

    WHERE stores.owner_id = ?

    GROUP BY stores.id
  `;

  db.query(query, [ownerId], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

};