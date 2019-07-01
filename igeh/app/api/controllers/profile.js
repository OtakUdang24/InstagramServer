const config = require("../../../config");
const jwtDecode = require('jwt-decode');
const db = config.db;

module.exports = {
  testing: function(req, res, next) {
    res.send("testing  at profile");
  },
  get: function(req, res) {
    const token = req.headers.authorization;
    const decoded = jwtDecode(token);

    db.query(`SELECT users.id,users.name, users.avatar FROM users WHERE email = "${decoded.email}"`, function(err, rows, field) {
      if (err) res.send(err);
      let bio = rows[0];
      let id = rows[0].id;
      db.query(`SELECT * FROM posts WHERE by_id = ${id}`, function(err, rows, field) {
        if (err) res.send(err);
        
        res.status(200).send({success: true, message: "success", rows, bio})
      });
    });

  }
};
