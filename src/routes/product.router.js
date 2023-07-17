// import RouterClass from "./Router.class.js";
import { uploader } from "../utils.js";
import {
  deleteProduct,
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  getMocksProducts,
} from "../controllers/product.controller.js";
import { authorizationRole, passportCall } from "../middleware/session.js";
import { Router } from "express";
import errorHandler from '../middleware/errors/index.js';
import toAsyncExpressDecorator from "async-express-decorator";

const router = toAsyncExpressDecorator(Router());

router.get("/mocking-products", getMocksProducts);
router.get(
  "/",
  passportCall("jwt"),
  authorizationRole(["user", "admin"]),
  getProducts
);
// router.post("/", passportCall("jwt"), authorizationRole(["admin"]), uploader.array("thumbnails"), saveProduct);
router.post("/", saveProduct);
router.get(
  "/:pid",
  passportCall("jwt"),
  authorizationRole(["user", "admin"]),
  getProduct
);
router.delete(
  "/:pid",
  passportCall("jwt"),
  authorizationRole(["admin"]),
  deleteProduct
);
router.put(
  "/:pid",
  passportCall("jwt"),
  authorizationRole(["admin"]),
  updateProduct
);
router.use(errorHandler);
// class ProductRouterClass extends RouterClass {
//   init() {
//     this.get("/mocking-products", getMocksProducts);
//     this.get("/", passportCall("jwt"), authorizationRole(["user", "admin"]), getProducts);
//     // this.post("/", passportCall("jwt"), authorizationRole(["admin"]), uploader.array("thumbnails"), saveProduct);
//     this.post("/", saveProduct);
//     this.get("/:pid", passportCall("jwt"), authorizationRole(["user", "admin"]), getProduct);
//     this.delete("/:pid", passportCall("jwt"), authorizationRole(["admin"]), deleteProduct);
//     this.put("/:pid", passportCall("jwt"), authorizationRole(["admin"]), updateProduct);
//   }
// }

export default router;
