const express = require('express');
const router = express.Router();

const userController = require('../app/api/controllers/user');

router.get("/user/testing", userController.testing)
router.post("/user/login", userController.authenticate)
// router.post("/user/register", userController.register)


router.get("/user/get", userController.get)
router.delete("/user/delete/:id", userController.Delete)
router.patch("/user/update/:id", userController.Update)
router.get("/user/get/:id", userController.GetWhere)




module.exports = router;