// const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const config = require("../../../config");
const db = config.db;

module.exports = {
  testing: function(req, res, next) {
    res.send("testing at user");
  },
  authenticate: function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
      `SELECT * FROM users WHERE email = "${email}" AND password = ${password}`,
      function(err, rows, fields) {
        if(err){
          res.send({success: false, message: err, })
        }else if(rows.length > 0 ){
          const token = jwt.sign({email: email}, config.secret)
          res.status(200).send({success: true, message: "success", token: token})
        }else{
          res.send({success: false, message: "error", })
        }
      }
    );
  },
  get: function(req, res, next) {
    db.query(`SELECT * FROM posts`, function(err, rows) {
      if (rows.length > 0) {
        res.send(rows);
      } else {
        res.send({ status: "Data Kosong" });
      }
    });
  },
  Delete: function(req, res) {
    const id = req.params.id;
    db.query(`DELETE FROM posts WHERE id = ${id}`, function(err, rows, fields) {
      if (err) res.status(401).send({status: "Error"});
      
      res.send({ status: "ok" });
    });
  },
  Update: function(req, res) {
    const id = req.params.id;
    const link = req.body.link;
    const caption = req.body.caption
    db.query(
      `UPDATE posts
    SET photo = "${link}", caption = "${caption}"
    WHERE id = ${id}`,
      function(err, rows, fields) {
        if (err) res.send(err);

        res.send({ status: "ok" });
      }
    );
  },
  GetWhere: function(req, res){
    const id = req.params.id;
    db.query(`SELECT * FROM posts WHERE id = ${id}`, function(err, rows, fields) {
      if (err) res.send(err);

      if (rows.length > 0) {
        res.send(rows);
      } else {
        res.send({ status: "Data Kosong" });
      }
    });
  }
};
