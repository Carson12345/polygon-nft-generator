const hre = require("hardhat");
// only work in testnet and need remove artifacts from gitignore
// const ContractJSON = require("../../artifacts/contracts/NFTGenerator.sol/NFTGenerator.json");
const config = require("../../config");
const { ethers } = hre;
const privateKey = process.env.PRIVATE_KEY // seed phrase or private key for your Metamask account

const provider = new ethers.providers.WebSocketProvider(config.alchemyUrl + process.env.ALCHEMY_API_KEY);
const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);

async function deployNFTContract({
    tokenName,
    tokenSymbol
}) {
    console.log("Deploying Contract");
    // only work in testnet
    // const NFTContract = new ethers.Contract(contractAddress, ContractJSON.abi, signer);
    const NFTContract = await ethers.getContractFactory("NFTGenerator");
    const nft = await NFTContract.deploy(tokenName, tokenSymbol);
    await nft.deployed();
    console.log("NFT deployed to:", nft.address);

    return ({
        address: nft.address
    });
}

async function mintToAddressByContract({
    contractAddress,
    receiverAddress,
    tokenURI
}) {
    // only work in testnet
    // const NFTContract = new ethers.Contract(contractAddress, ContractJSON.abi, signer);
    const NFTContract = await ethers.getContractFactory("NFTGenerator");
    const NFTContractCallable = NFTContract.attach(contractAddress);
    console.log(`Minting TokenURI: ${tokenURI} to: ${receiverAddress}`);
    let txn = await NFTContractCallable.mint(receiverAddress, tokenURI).then();
    console.log("Minted");
    return ({
        txn
    });
}

async function getTokenURIByContractAndTokenId ({
    tokenId,
    contractAddress
}) {
    let tid = parseInt(tokenId);
    // only work in testnet
    // const NFTContract = new ethers.Contract(contractAddress, ContractJSON.abi, signer);
    const NFTContract = await ethers.getContractFactory("NFTGenerator");
    const NFTContractCallable = NFTContract.attach(contractAddress);
    console.log(`Finding TokenURI of: ${contractAddress} 's ${tokenId}`);

    const owner = await NFTContractCallable.ownerOf(tid);
    console.log(`Owner: ${owner}`);

    const uri = await NFTContractCallable.tokenURI(tid);

    console.log(`URI: ${uri}`);
    return {
        tokenOwner: owner,
        tokenId: tid,
        tokenURI: uri
    };
}

module.exports = {
    deployNFTContract: async (req, res) => {
        try {
            let {
                tokenName,
                tokenSymbol
            } = {
                ... req.body,
                ... req.query
            };

            let result = await deployNFTContract({
                tokenName,
                tokenSymbol
            });

            return res.json(result);
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: error.message
            })
        }
    },
    mintToAddressByContract: async (req, res) => {
        try {
            let {
                contractAddress,
                receiverAddress,
                tokenURI
            } = {
                ... req.query,
                ... req.body
            };

            let result = await mintToAddressByContract({
                contractAddress,
                receiverAddress,
                tokenURI
            });

            return res.json(result);
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: error.message
            })
        }
    },
    deployThenMintThenGive: async (req, res) => {
        try {
            let {
                tokenName,
                tokenSymbol,
                receiverAddress,
                tokenURI
            } = {
                ... req.body,
                ... req.query
            };

            let contract = await deployNFTContract({
                tokenName,
                tokenSymbol
            });

            let result = await mintToAddressByContract({
                contractAddress: contract.address,
                receiverAddress,
                tokenURI
            });

            return res.json({
                ... result,
                contractAddress: contract.address,
                tokenURI
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: error.message
            })
        }
    },
    getTokenURIByContractAndTokenId: async (req, res) => {
        try {
            let {
                contractAddress,
                tokenId
            } = {
                ... req.body,
                ... req.query
            };

            let result = await getTokenURIByContractAndTokenId({
                contractAddress,
                tokenId
            })

            return res.json({
                ... result,
                contractAddress
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: error.message
            })
        }
    }
};