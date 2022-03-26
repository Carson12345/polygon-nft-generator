const express = require("express");
const nft = require("./api/nft.api.js");
const router = express.Router();


// Get all posts
router.get("/nft/contract/create", nft.deployNFTContract);
router.post("/nft/contract/create", nft.deployNFTContract);
router.get("/nft/contract/mint", nft.mintToAddressByContract);
router.post("/nft/contract/mint", nft.mintToAddressByContract);
router.get("/nft/contract/deploy-and-mint-and-give", nft.deployThenMintThenGive);
router.post("/nft/contract/deploy-and-mint-and-give", nft.deployThenMintThenGive);
router.get("/nft/contract/token-details", nft.getTokenURIByContractAndTokenId);
router.post("/nft/contract/token-details", nft.getTokenURIByContractAndTokenId);

module.exports = router;