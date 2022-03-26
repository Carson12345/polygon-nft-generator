const hre = require("hardhat");
const config = require("../config.js");

const WALLET_ADDRESS = config.testReceiver;
const CONTRACT_ADDRESS = config.contractAddress;

async function main(_URI) {
    const NFT = await hre.ethers.getContractFactory("MyToken");

    const contract = NFT.attach(CONTRACT_ADDRESS);

    // console.log("1:", NFT);
    // console.log("2:", contract);

    await contract.tokenURI(0).then((result) => {
        // Log Result
        console.log("result", result)
        return(result)
    });

}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});