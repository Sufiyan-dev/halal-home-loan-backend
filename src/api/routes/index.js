const express = require('express')
// import walletRoutes from "./wallet";
// import transactionRoutes from "./transaction";
const erc20Routes = require("./erc20.route.js");
const erc1155Routes = require("./erc1155.route.js");
const projectManagerRoutes = require("./projectManager.route.js");

const apiRoutes = express.Router();

apiRoutes.use("/erc20", erc20Routes);
apiRoutes.use("/erc1155", erc1155Routes);
apiRoutes.use("/projectManager", projectManagerRoutes);

module.exports = apiRoutes;