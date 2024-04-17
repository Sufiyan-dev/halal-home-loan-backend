const { getOwner, getProjectToken, getPaymentToken, getProjectInfo, getCurrentProjectId, getInvestInProject, getQuote, getDevestInProject, getPurchaseResaleTokens, getAddTenantPayment } = require("../services/projectManager.service");
const { handleError, handleResponse } = require("../utils/responseHelper");

const ownerController = async (req,res) => {
    try {
        const {projectManager} = req.body;

        if(!projectManager){
            throw new TypeError("require body values project manager address");
        }

        const result = await getOwner(projectManager);

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

const projectTokenController = async (req,res) => {
    try {
        const {projectManager} = req.body;

        if(!projectManager){
            throw new TypeError("require body values project manager address");
        }

        const result = await getProjectToken(projectManager);

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

const paymentTokenController = async (req,res) => {
    try {
        const {projectManager} = req.body;

        if(!projectManager){
            throw new TypeError("require body values project manager address");
        }

        const result = await getPaymentToken(projectManager);

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

const currentProjectIdController = async (req,res) => {
    try {
        const {projectManager} = req.body;

        if(!projectManager){
            throw new TypeError("require body values project manager address");
        }

        const result = await getCurrentProjectId(projectManager);

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

const projectInfoController = async (req,res) => {
    try {
        const {projectManager, projectId} = req.body;

        if(!projectManager || !projectId){
            throw new TypeError("require body values project manager address, project id");
        }

        const result = await getProjectInfo(projectId, projectManager);

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

const investInProjectController = async (req,res) => {
    try {
        const {projectManager, projectId, amount, account} = req.body;

        if(!projectManager || !projectId || !amount || !account){
            throw new TypeError("require body values project manager address, project id, amount, account");
        }

        const result = await getInvestInProject(projectId, amount, account, projectManager);

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

const devestFromProjectController = async (req,res) => {
    try {
        const {projectManager, projectId, amountToSell, account} = req.body;

        if(!projectManager || !projectId || !amountToSell || !account){
            throw new TypeError("require body values project manager address, project id, amountToSell, account");
        }

        const result = await getDevestInProject(projectId, amountToSell, account, projectManager);

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

const purchaseResaleTokensController = async (req,res) => {
    try {
        const {projectManager, projectId, noOfTokensToBuy, account} = req.body;

        if(!projectManager || !projectId || !noOfTokensToBuy || !account){
            throw new TypeError("require body values project manager address, project id, noOfTokensToBuy, account");
        }

        const result = await getPurchaseResaleTokens(projectId, noOfTokensToBuy, account, projectManager);

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


const addTenantPaymentController = async (req,res) => {
    try {
        const {projectManager, projectId, account} = req.body;

        if(!projectManager || !projectId || !account){
            throw new TypeError("require body values project manager address, project id, account");
        }

        const result = await getAddTenantPayment(projectId, account, projectManager);

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

const quoteController = async (req,res) => {
    try {
        const {projectManager, projectId, noOfTokens, account} = req.body;

        if(!projectManager || !projectId || !noOfTokens || !account){
            throw new TypeError("require body values project manager address, project id, noOfTokens, account");
        }

        const result = await getQuote(projectId, noOfTokens, account, projectManager);

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



module.exports = { ownerController, projectTokenController, paymentTokenController, currentProjectIdController, projectInfoController, investInProjectController, devestFromProjectController, purchaseResaleTokensController, addTenantPaymentController, quoteController };