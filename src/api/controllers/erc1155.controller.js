const { getBalance, getBalanceBatch, getUri, getIsApproveForAll, getSetApprovedForAll } = require("../services/erc1155.servicee");
const { handleError, handleResponse } = require("../utils/responseHelper");

const balanceController = async (req,res) =>{
    try {
        const {account, tokenId, token} = req.body;
        // console.log(!account, typeof(tokenId) != Number ,!tokenId, typeof(tokenId), !token);

        if(!account || !tokenId || !token) {
            throw new TypeError("require body values account, tokenId, token");
        }

        const result = await getBalance(account, tokenId, token);
        console.log("result balance ",result)

        if(result.error){
            throw new TypeError(result.message);
        }

        handleResponse({res, statusCode: 201, result: result.message})

    } catch(err) {
        if (err instanceof TypeError) {
            handleError({ res, statusCode: 400, err: err.message });
        } else {// internal error
            handleError({ res, statusCode: 500, err: err.message });
        }
    }
}

const balanceBatchController = async (req,res) => {
    try {
        const {accounts, tokenIds, token} = req.body;

        if(!accounts || !tokenIds || !token) {
            throw new TypeError("require body values accounts, tokenIds, token");
        }

        if(accounts.length != tokenIds.length){
            throw new TypeError("require length of accounts and tokenIds to be equal")
        }

        const result = await getBalanceBatch(accounts, tokenIds, token);
        console.log("result balance ",result)

        if(result.error){
            throw new TypeError(result.message);
        }

        console.log(result,result.message)

        handleResponse({res, statusCode: 201, result: result.message})

    } catch(err) {
        if (err instanceof TypeError) {
            handleError({ res, statusCode: 400, err: err.message });
        } else {// internal error
            handleError({ res, statusCode: 500, err: err.message });
        }
    }
}

const uriController = async (req,res) => {
    try {
        const { token, hasTokenId, tokenId } = req.body;

        if(!token || hasTokenId === undefined){
            throw new TypeError("require body values token, hastokenId");
        }

        if(hasTokenId){
            if(!tokenId){
                throw new TypeError("Need token when passed tokenId needed");
            }
        }

        const result = await getUri(token, hasTokenId, tokenId);
        console.log("result uri ",result)

        if(result.error){
            throw new TypeError(result.message);
        }

        handleResponse({res, statusCode: 201, result: result.message})

    } catch(err) {
        if (err instanceof TypeError) {
            handleError({ res, statusCode: 400, err: err.message });
        } else {// internal error
            handleError({ res, statusCode: 500, err: err.message });
        }
    }
}

const isApproveForAllController = async (req,res) => {
    try {
        const {account, operator, token} = req.body;

        if(!account || !operator || !token){
            throw new TypeError("require body values account, operator, token");
        }

        const result = await getIsApproveForAll(account, operator, token);

        if(result.error){
            throw new TypeError(result.message);
        }

        handleResponse({res, statusCode: 201, result: result.message})
    } catch(err) {
        if (err instanceof TypeError) {
            handleError({ res, statusCode: 400, err: err.message });
        } else {// internal error
            handleError({ res, statusCode: 500, err: err.message });
        }
    }
}

const setApprovalForAllController = async (req,res) => {
    try {
        const {account, operator, approved, token} = req.body;
        console.log(typeof(approved))

        if(!account || !operator || typeof(approved) != "boolean" || !token){
            throw new TypeError("require body values account, operator, approved, token");
        }

        const result = await getSetApprovedForAll(account, operator, approved,token);

        if(result.error){
            throw new TypeError(result.message);
        }

        handleResponse({res, statusCode: 201, result: result.message})
    } catch(err) {
        if (err instanceof TypeError) {
            handleError({ res, statusCode: 400, err: err.message });
        } else {// internal error
            handleError({ res, statusCode: 500, err: err.message });
        }
    }
}

module.exports = { balanceController, balanceBatchController, uriController, isApproveForAllController, setApprovalForAllController }