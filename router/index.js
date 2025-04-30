const { Router } = require("express");
const mainRouter = Router();

const adminRouter = require("./adminRouter");
mainRouter.use(adminRouter);

module.exports = mainRouter;