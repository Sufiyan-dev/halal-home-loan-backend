const { getReadFunction, getReadFunctionNoParams, getUnsignedTxn } = require("../utils/txnHelper");
const projectManagerAbi = require("../utils/abi/projectManager.json");

const getOwner = async (projectManager) => {
    try {

        const result = await getReadFunctionNoParams(projectManager,projectManagerAbi,"owner");
        // console.log("result set approved all", result)

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
    } catch(err){
        return {
            message: err.message,
            error: true
        }
    }
}

const getProjectToken = async (projectManager) => {
    try {

        const result = await getReadFunctionNoParams(projectManager,projectManagerAbi,"projectToken");
        // console.log("result set approved all", result)

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
    } catch(err){
        return {
            message: err.message,
            error: true
        }
    }
}

const getPaymentToken = async (projectManager) => {
    try {

        const result = await getReadFunctionNoParams(projectManager,projectManagerAbi,"paymentToken");
        // console.log("result set approved all", result)

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
    } catch(err){
        return {
            message: err.message,
            error: true
        }
    }
}

const getCurrentProjectId = async (projectManager) => {
    try {

        const result = await getReadFunctionNoParams(projectManager,projectManagerAbi,"currentProjectId");
        // console.log("result set approved all", result)

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
    } catch(err){
        return {
            message: err.message,
            error: true
        }
    }
}

const getProjectInfo = async (projectId, projectManager) => {
    try {
        const params = [projectId];

        const result = await getReadFunction(projectManager,projectManagerAbi,"projectInfo",params);
        // console.log("result set approved all", result)

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
    } catch(err){
        return {
            message: err.message,
            error: true
        }
    }
}

const getInvestInProject = async (projectId, amount, account, projectManager) => {
    try {
        const params = [projectId, amount];

        const result = await getUnsignedTxn(projectManager,projectManagerAbi,"investInProject",params,account);
        // console.log("result set approved all", result)

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
    } catch(err){
        return {
            message: err.message,
            error: true
        }
    }
}

const getDevestInProject = async (projectId, amountToSell, account, projectManager) => {
    try {
        const params = [projectId, amountToSell];

        const result = await getUnsignedTxn(projectManager,projectManagerAbi,"divestFromProject",params,account);
        // console.log("result set approved all", result)

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
    } catch(err){
        return {
            message: err.message,
            error: true
        }
    }
}


const getPurchaseResaleTokens = async (projectId, noOfTokensToBuy, account, projectManager) => {
    try {
        const params = [projectId, noOfTokensToBuy];

        const result = await getUnsignedTxn(projectManager,projectManagerAbi,"purchaseResaleTokens",params,account);
        // console.log("result set approved all", result)

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
    } catch(err){
        return {
            message: err.message,
            error: true
        }
    }
}


const getAddTenantPayment = async (projectId, account, projectManager) => {
    try {
        const params = [projectId];

        const result = await getUnsignedTxn(projectManager,projectManagerAbi,"addTenantPayment",params,account);
        // console.log("result set approved all", result)

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
    } catch(err){
        return {
            message: err.message,
            error: true
        }
    }
}


const getQuote = async (projectId, noOfTokens, account, projectManager) => {
    try {
        const params = [projectId, noOfTokens];

        const result = await getReadFunction(projectManager,projectManagerAbi,"quote",params);
        // console.log("result set approved all", result)

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
    } catch(err){
        return {
            message: err.message,
            error: true
        }
    }
}

const getAllActiveProject = async (projectManager) => {
    try {

        const currentProjectId = await getReadFunctionNoParams(projectManager, projectManagerAbi,"currentProjectId");

        if(currentProjectId.error){
            throw new TypeError(currentProjectId.msg);
        }

        console.log(currentProjectId);
        const projectInfoArray = [];

        for(let i = 0; i <= currentProjectId.msg; i++){
            const params = [i];
            const projectInfo = await getReadFunction(projectManager, projectManagerAbi,"projectInfo",params);

            console.log(projectInfo);

            if(projectInfo.error){
                throw new TypeError(projectInfo.msg);
            }

            if(projectInfo.msg[9] < 2){ // only project which are active will be filter with stage
                projectInfoArray.push(projectInfo.msg);
            }

        }

        return {
            message: projectInfoArray,
            error: false
        }

    } catch(err){
        return {
            message: err.message,
            error: true
        }
    }
}


module.exports = { getOwner, getProjectToken, getPaymentToken, getCurrentProjectId, getProjectInfo, getInvestInProject, getDevestInProject, getPurchaseResaleTokens, getAddTenantPayment, getQuote, getAllActiveProject };