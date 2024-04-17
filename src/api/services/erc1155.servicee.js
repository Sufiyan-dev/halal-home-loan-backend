const erc1155ABI = require("../utils/abi/erc1155.json");
const { getReadFunction, getReadFunctionNoParams, getUnsignedTxn } = require("../utils/txnHelper");

const getBalance = async (account, tokenId, token) => {
    try {
        const params = [account,tokenId];

        const result = await getReadFunction(token, erc1155ABI,"balanceOf",params);
        console.log("result balance service ", result)

        if(result.error){
            return {
                message: result.msg,
                error: true
            }
        }

        return {
            message: result.msg,
            error: false
        }
    } catch(err) {
        return {
            message: err.message,
            error: true
        }
    }
}

const getBalanceBatch = async (accounts, tokenIds, token) => {
    try {

        const params = [accounts,tokenIds];

        const result = await getReadFunction(token, erc1155ABI,"balanceOfBatch",params);

        if(result.error){
            return {
                message: result.msg,
                error: true
            }
        }

        return {
            message: result.msg,
            error: false
        }

    } catch(err) {
        return {
            message: err.message,
            error: true
        }
    }
}

const getUri = async (token, hasTokenId, tokenId) => {
    try {
        const params = [tokenId];

        let result;
        if(hasTokenId){
            console.log("has token")
            result = await getReadFunction(token, erc1155ABI,"uri",params);
            console.log("result1 ",result)
        } else {
            result = await getReadFunctionNoParams(token,erc1155ABI,"uri");
            console.log("result2 ",result)
        }

        console.log("result ",result)

        if(result.error){
            return {
                message: result.msg,
                error: true
            }
        }

        return {
            message: result.msg,
            error: false
        }
    } catch(err) {
        return {
            message: err.message,
            error: true
        }
    }
}

const getIsApproveForAll = async (account, operator, token) => {
    try {
        const params = [account,operator];

        const result = await getReadFunction(token, erc1155ABI,"isApprovedForAll",params);
        console.log("result approve all", result)

        if(result.error){
            return {
                message: result.msg,
                error: true
            }
        }

        return {
            message: result.msg,
            error: false
        }
    } catch(err) {
        return {
            message: err.message,
            error: true
        }
    }
}

const getSetApprovedForAll = async (account, operator, approved, token) => {
    try {
        const params = [operator,approved];

        const result = await getUnsignedTxn(token, erc1155ABI, "setApprovalForAll",params,account);
        console.log("result set approved all", result)

        if(result.error){
            return {
                message: result.msg,
                error: true
            }
        }

        return {
            message: result.msg,
            error: false
        }
    } catch(err) {
        return {
            message: err.message,
            error: true
        }
    }
}


module.exports = { getBalance, getBalanceBatch, getUri, getIsApproveForAll, getSetApprovedForAll };