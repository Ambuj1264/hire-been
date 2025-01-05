const express = require("express");
const withoutAuthRouter = express.Router();


const userController = require("../../controller/user/user.controller");
const productController = require("../../controller/product/product.controller");


withoutAuthRouter.post("/createUser", userController.createUser);
withoutAuthRouter.post("/createUser/:role", userController.createUserByrole);
withoutAuthRouter.post("/loginUser", userController.loginUser);
withoutAuthRouter.get("/getAllProduct", productController.getAllProduct);
withoutAuthRouter.get("/getProductById/:id", productController.getProductById);
withoutAuthRouter.get("/productByCategory/:category", productController.getProductByCategory);


module.exports = withoutAuthRouter;
