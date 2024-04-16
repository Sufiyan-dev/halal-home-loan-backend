const express = require('express')
// import walletRoutes from "./wallet";
// import transactionRoutes from "./transaction";
const erc20Routes = require("./erc20.route.js");

const apiRoutes = express.Router();

apiRoutes.use("/erc20", erc20Routes);
// apiRoutes.use("/transaction", transactionRoutes);
// apiRoutes.use("/token",tokensRoutes)
module.exports = apiRoutes;