
require('dotenv').config();
const {API_URL, PRIVATE_KEY} = process.env;
const {ethers} = require('ethers');
const { hashMessage } = require("@ethersproject/hash");

const verifySigner = async() =>{

    const provider = new ethers.providers.AlchemyProvider('goerli', API_URL);
    
    const message = "Lets verify and find out signer address and the signature of this message!";
    //create instance of the wallet address
    const wallet = new ethers.Wallet(PRIVATE_KEY,provider);
    const signTheMessage = wallet.signMessage(message);
    const getMessageSigner = signTheMessage.then((signature)=>{
        const verifySigner = ethers.utils.recoverAddress(hashMessage(message),signature);
        return verifySigner;
    });

    console.log(`The message : "${message}"`)
    console.log(`signature of the signed message : ${await signTheMessage}`)
    console.log(`message signer : ${await getMessageSigner}`)
}

verifySigner()