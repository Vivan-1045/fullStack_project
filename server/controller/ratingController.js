const db = require("../db/db");


exports.submitRating = (req, res) => {

  const userId = req.user.id;

  const {
    store_id,
    rating
  } = req.body;

  if(rating < 1 || rating > 5) {
    return res.status(400).json({
      message: "Rating must be between 1 and 5"
    });
  }

  const query = `
    INSERT INTO ratings
    (user_id, store_id, rating)
    VALUES (?, ?, ?)
  `;

  db.query(
    query,
    [userId, store_id, rating],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Rating submitted"
      });

    }
  );

};


exports.updateRating = (req, res) => {

  const userId = req.user.id;

  const ratingId = req.params.id;

  const { rating } = req.body;

  const query = `
    UPDATE ratings
    SET rating = ?
    WHERE id = ?
    AND user_id = ?
  `;

  db.query(
    query,
    [rating, ratingId, userId],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json({
        message: "Rating updated"
      });

    }
  );

};