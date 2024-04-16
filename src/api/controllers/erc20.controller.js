import logger from "../logger/index.js";
import { getAllowance, getApproveTxn } from "../services/erc20.service.js";
import { handleError, handleResponse } from "../utils/responseHelper.js";

const approveController = async (req,res) => {
    try {
        
        const { approver, spender, token } = req.body;
    
        if(!approver || !spender || !token) {
            throw new TypeError("require body values approver, spender, token ");
        }

        const result = await getApproveTxn(approver, spender, token);

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

const allowanceController = async (req,res) => {
    try {
        const {approver, spender, token } = req.body;

        if(!approver || !spender || !token) {
            throw new TypeError("require body values approver, spender, token");
        }

        const result = await getAllowance(approver, spender, token);

        if(result.error){
            throw new TypeError(result.message);
        }

        handleResponse({res, statusCode: 201, result: result.message})


    } catch(err) {
        logger.debug("error allowance"+err.message)
        if (err instanceof TypeError) {
            handleError({ res, statusCode: 400, err: err.message });
        } else {// internal error
            handleError({ res, statusCode: 500, err: err.message });
        }
    }
}

export { approveController, allowanceController }