const db = require("../db/db");

exports.getAllStores = (req, res) => {

  const userId = req.user.id;

  const query = `
    SELECT
      stores.id,
      stores.name,
      stores.address,

      AVG(ratings.rating) as average_rating,

      (
        SELECT rating
        FROM ratings
        WHERE ratings.store_id = stores.id
        AND ratings.user_id = ?
      ) as user_rating

    FROM stores

    LEFT JOIN ratings
    ON stores.id = ratings.store_id

    GROUP BY stores.id
  `;

  db.query(query, [userId], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

};