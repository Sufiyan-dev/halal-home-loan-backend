import express from 'express'
// import walletRoutes from "./wallet";
// import transactionRoutes from "./transaction";
import erc20Routes from "./erc20.route.js";

const apiRoutes = express.Router();

apiRoutes.use("/erc20", erc20Routes);
// apiRoutes.use("/transaction", transactionRoutes);
// apiRoutes.use("/token",tokensRoutes)

export default apiRoutes;