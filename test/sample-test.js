const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function() {
  it("It should deploy the contract, mint a token, and resolve to the right URI", async function() {
    const NFT = await ethers.getContractFactory("NFTGenerator");
    const nft = await NFT.deploy("Carson Cert", "CST");

    const URI = "ipfs://QmWJBNeQAm9Rh4YaW8GFRnSgwa4dN889VKm9poc2DQPBkv";
    await nft.deployed();
    await nft.mint("0xc6169D5224558B97fD7cec848596b6cCfD84C596", URI);

    console.log(nft.address, await nft.tokenURI(1));

    expect(await nft.tokenURI(1)).to.equal(URI)
  });
});
