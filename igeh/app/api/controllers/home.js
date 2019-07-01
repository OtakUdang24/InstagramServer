// const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwtDecode = require('jwt-decode');
const config = require("../../../config");
const db = config.db;

module.exports = {
  testing: function(req, res, next) {
    res.send("testing at home");
  },
  insert: function(req, res, next) {
    const token = req.headers.authorization;
    const decoded = jwtDecode(token);
    const photo = req.body.photo;
    const caption = req.body.caption
    db.query(`SELECT users.id,users.name, users.avatar FROM users WHERE email = "${decoded.email}"`, function(err, rows, field) {
      if (err) res.send(err);
      let id = rows[0].id;
      db.query(`INSERT INTO posts(photo, caption, by_id) VALUES("${photo}", "${caption}", ${id})`, function(err, rows, field) {
        if (err) res.send(err);
        
        res.status(200).send({success: true, message: "success"})
      });
    });
  },
  getPost: function(req, res, next) {
    const token = req.headers.authorization;
    const decoded = jwtDecode(token);
    db.query(`SELECT users.id AS iduser FROM users WHERE email = "${decoded.email}"`, function(err, rows, field) {
      if (err) res.send(err);
      let id = rows[0].iduser;
      db.query(`SELECT users.id AS userid,users.name,users.avatar,posts.* FROM posts INNER JOIN users ON posts.by_id = users.id ORDER BY id DESC; `, function(err, rows) {
        if (rows.length > 0) {
          res.status(200).send({success: true , rows: rows, iduser : id});
        } else {
          res.send({ success: false, messsage: "empty data" });
        }
      });
    });

  },
  DeletePost: function(req, res) {
    const id = req.params.id;
    db.query(`DELETE FROM posts WHERE id = ${id}`, function(err, rows, fields) {
      if (err) res.send({success: false, message: "error"});
      
      res.send({ success: true });
    });
  },
  UpdatePost: function(req, res) {
    const id = req.params.id;
    const caption = req.body.caption
    db.query(
      `UPDATE posts
    SET caption = "${caption}"
    WHERE id = ${id}`,
      function(err, rows, fields) {
        if (err) res.send({success: false, message: "error"});

        res.send({ success: true });
      }
    );
  },
};
