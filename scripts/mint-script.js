const hre = require("hardhat");
const config = require("../config.js");

const WALLET_ADDRESS = config.testReceiver;
const CONTRACT_ADDRESS = config.contractAddress;

async function main(_URI) {
    const NFT = await ethers.getContractFactory("NFTGenerator");

    const contract = NFT.attach(CONTRACT_ADDRESS);

    // console.log("1:", NFT);
    // console.log("2:", contract);

    await contract.mint(WALLET_ADDRESS, _URI).then((txn) => {
        // Log Txn
        console.log(txn.hash)
        return(txn)
    });

}

main('https://google.com').then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});