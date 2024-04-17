const ethers = require("ethers");
const erc20Abi = require("./abi/erc20.json");
const dotenv = require("dotenv");
const logger = require("../logger/index.js");
dotenv.config();

/**
 * @function getContractInstance
 * @description Asynchronously creates and returns an instance of a smart contract based on its address and ABI.
 * @param {string} contractAddress - The Ethereum address of the smart contract.
 * @param {object} contractAbi - The ABI (Application Binary Interface) of the smart contract.
 * @param {object} provider - An Ethereum provider instance connected to the Polygon network.
 * @returns {object} - An instance of the smart contract.
 */
const getContractInstance = async (contractAddress, contractAbi, provider) => {
    // Create a new instance of the smart contract using ethers.Contract
    const Contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
    );

    // Return the instance of the smart contract
    return Contract;
}


// const getcontractSymbol = async (contractAddress) => {
//     const provider = await getProvider();
//     const erc20Contract = new ethers.Contract(
//         contractAddress,
//         erc20,
//         provider
//     );

//     const symbol = await erc20Contract.symbol();
//     console.log( symbol);
//     return symbol;
// };

// const contractsymbolAdder = async (arrayOfTokensInfo) => {
//     for(let i = 0; i < arrayOfTokensInfo.length; i++){
//         const symbol = await getcontractSymbol(arrayOfTokensInfo[i].token);
//         arrayOfTokensInfo[i].symbol = symbol;
//     }
//     console.log("arrray final ", arrayOfTokensInfo);
//     return arrayOfTokensInfo;
// }

// const testTxn = async () => {
//     const sender = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
//     const testToken = "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582";
//     const array = ["0x9921b1AE0c2bd557A5352EDddbBf9723f1e56Fdf","0xa5d661d968F947D7573C84d36124876fE4212F47"]
//     // const provider = await getProvider();
//     // const erc20IInstance = getContractInstance(testToken,erc20Abi,provider,array);

//     // const unsingedTxn = await (await erc20IInstance).getFunction("approve").populateTransaction(...array);
//     // console.log("unsigned ", unsingedTxn);
//     // unsingedTxn.from = sender
//     // const voidSigner = new ethers.VoidSigner(sender, provider);
//     // const txnInfo = await voidSigner.populateTransaction(unsingedTxn);
//     // console.log("full txn ",txnInfo)

//     // const result = await getUnsignedTxn(testToken,erc20Abi,"approve",array,sender);
//     // console.log("result ",result

    
//     const result = await getReadFunction(testToken,erc20Abi,"allowance",array);
//     console.log(result);
    
//     console.log("hey")
//     return result;
// }

/**
 * @function getProvider
 * @description Asynchronously creates and returns an Ethereum provider instance connected to the Polygon network.
 * @returns {object} - An Ethereum provider instance connected to the Polygon network.
 */
const getProvider = async () => {
    // Construct the URL for the Polygon network using Infura API key
    const ethereumNodeURL = `https://polygon-amoy.infura.io/v3/${process.env.INFURA_API_KEY}`;
    
    // Create a JsonRpcProvider instance with the constructed URL
    const provider = new ethers.JsonRpcProvider(ethereumNodeURL);
    
    // Return the Ethereum provider instance
    return provider;
}


// const getUnsignedTxn = async (contractAddress, contractAbi, functionName, paramsArray, from,) => {
//     try {
//         const provider = await getProvider();
//         const contractInstance = await getContractInstance(contractAddress, contractAbi, provider);

//         const unsignedTxn = await contractInstance.getFunction(functionName).populateTransaction(...paramsArray);
        
//         const voidSigner = new ethers.VoidSigner(from, provider);

//         const fullTxn = await voidSigner.populateTransaction(unsignedTxn);

//         return { msg: fullTxn, error: false};
//     } catch(err) {
//         return { msg: err.message, error: true};
//     }
// }

/**
 * @function getUnsignedTxn
 * @description Asynchronously generates an unsigned Ethereum transaction for a specific function of a smart contract.
 * @param {string} contractAddress - The Ethereum address of the smart contract.
 * @param {object} contractAbi - The ABI (Application Binary Interface) of the smart contract.
 * @param {string} functionName - The name of the function for which the transaction is being generated.
 * @param {array} paramsArray - An array containing the parameters required for the function call.
 * @param {string} from - The Ethereum address initiating the transaction.
 * @returns {object} - An object containing the unsigned transaction data or an error message.
 */
const getUnsignedTxn = async (contractAddress, contractAbi, functionName, paramsArray, from) => {
    try {
        // Get Ethereum provider instance
        const provider = await getProvider();

        // Get contract instance
        const contractInstance = await getContractInstance(contractAddress, contractAbi, provider);

        // Populate unsigned transaction data
        const unsignedTxn = await contractInstance.getFunction(functionName).populateTransaction(...paramsArray);
        logger.debug("unsigned txn "+unsignedTxn);
        
        // Create a VoidSigner instance with sender's Ethereum address
        const voidSigner = new ethers.VoidSigner(from, provider);

        // Populate full transaction data
        const fullTxn = await voidSigner.populateTransaction(unsignedTxn);
        logger.debug("full unsigned txn "+fullTxn);
        console.log("full unsigned txn ",fullTxn);

        let txnInfoStringify = JSON.stringify(fullTxn, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
        );
        console.log("to string value ",txnInfoStringify)

        // Return unsigned transaction data
        return { msg: txnInfoStringify, error: false };
    } catch(err) {
        // Return error message if transaction generation fails
        return { msg: err.message, error: true };
    }
}

const getReadFunction = async (contractAddress, contractAbi, functionName, paramsArray) => {
    try {
        // Get Ethereum provider instance
        const provider = await getProvider();
        
        // Get contract instance
        const contractInstance = await getContractInstance(contractAddress, contractAbi, provider);
        console.log("funciton name ", functionName, "paramsArray", paramsArray)

        let returnValue = await contractInstance[functionName](...paramsArray);
        logger.debug("return value "+returnValue);

        if(Array.isArray(returnValue)){
            returnValue = returnValue.map(element => typeof element === 'bigint' ? Number(element) : element);
        }

        return { msg: Array.isArray(returnValue) ? returnValue : typeof(returnValue) === 'bigint' ? Number(returnValue) : returnValue, error: false};

    } catch(err){
        return { msg: err.message, error: true};
    }
}

const getReadFunctionNoParams = async (contractAddress, contractAbi, functionName) => {
    try {
        const provider = await getProvider();

        const contractInstance = await getContractInstance(contractAddress, contractAbi, provider);
        console.log("funciton name ", functionName)
        const returnValue = await contractInstance[functionName]();

        logger.debug("return value "+returnValue);

        return { msg: typeof(returnValue) === 'bigint' ? Number(returnValue) : returnValue, error: false};

    } catch(err) {
        return { msg: err.message, error: true};
    }
}

function convertInput(input) {
    if (typeof input === 'bigint') {
        return Number(input);
    } else if (Array.isArray(input)) {
        for (let i = 0; i < input.length; i++) {
            if (typeof input[i] === 'bigint') {
                input[i] = Number(input[i]);
            }
        }
    }
    return input;
}



module.exports = { getContractInstance, getUnsignedTxn, getReadFunction, getReadFunctionNoParams };