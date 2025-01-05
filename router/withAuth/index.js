const express = require("express");

const authorize = require("../../middleware/authorization/role.authorization");
const withAuthRouter = express.Router();



const userController = require("../../controller/user/user.controller");
const productController = require("../../controller/product/product.controller");


// seller section

withAuthRouter.post("/createProduct", authorize(["seller", "admin"]), productController.createProduct);
withAuthRouter.get("/userByRole/:role", authorize(["admin"]), userController.getUserByRole);
withAuthRouter.put("/updateUserRole/:id", authorize(["admin"]), userController.updateUserRole);
withAuthRouter.get("/profile/:id", userController.getUserById);

// buyer section

module.exports = withAuthRouter;

