const express = require('express');
const router = express.Router();

const homeController = require('../app/api/controllers/home');

router.get("/home/getPost", homeController.getPost)
router.delete("/home/deletePost/:id", homeController.DeletePost)
router.patch("/home/updatePost/:id", homeController.UpdatePost)
router.post("/home/insert", homeController.insert)



module.exports = router;