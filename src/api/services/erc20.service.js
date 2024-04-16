import logger from "../logger/index.js";
import erc20Abi from "../utils/abi/erc20.json" assert { type: "json" };
import { getContractInstance, getReadFunction, getUnsignedTxn } from "../utils/txnHelper.js";

const getApproveTxn = async (approver, spender, token) => {
    try {
        const params = [spender, amount];
        const result = await getUnsignedTxn(token,erc20Abi,"approve",params,approver);

        if(result.error){
            return {
                msg: result.msg,
                error: true
            }
        }

        return {
            msg: result.msg,
            error: false
        }

    } catch(err){
        return {
            msg: err.message,
            error: true
        }
    }
}

const getAllowance = async (approver, spender, token) => {
    try {
        const paramsArray = [approver, spender];

        const result = await getReadFunction(token, erc20Abi,"allowance",paramsArray);
        console.log(result)
        logger.debug("read value service "+result)

        if(result.error){
            return {
                msg: result.msg,
                error: true
            }
        }

        return {
            msg: result.msg,
            error: false
        }

    } catch(err) {
        return {
            msg: err.message,
            error: true
        }
    }
}


export { getApproveTxn, getAllowance };