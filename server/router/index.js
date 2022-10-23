import TransactionsApi from "./TransactionsApi.js";
import UserApi from "./UserApi.js";
import AuthApi from "./AuthApi.js";
import { Router } from "express";
import passport from "passport";
import CategoryApi from "./CategoryApi.js";
const router = new Router();

const auth = passport.authenticate("jwt", { session: false });
router.use("/transaction", auth, TransactionsApi);
router.use("/auth", AuthApi);
router.use("/user", UserApi);
router.use("/category", auth, CategoryApi);

export default router;
