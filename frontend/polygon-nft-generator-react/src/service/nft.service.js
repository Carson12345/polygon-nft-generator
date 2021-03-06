import axios from "axios";

// const host = `https://polygon-nft-generator.herokuapp.com`;
// const host = `http://localhost:5000`;
const host = ``;

export const createContract = ({
    tokenName,
    tokenSymbol
}) => {
    return axios.get(`${host}/api/nft/contract/create?tokenName=${tokenName}&tokenSymbol=${tokenSymbol}`)
}

export const mintAndGive = ({
    contractAddress,
    receiverAddress,
    tokenURI,
    name,
    description,
    imageUrl,
    imageStorage
}) => {
    return axios.post(`${host}/api/nft/contract/mint`,{
        contractAddress,
        receiverAddress,
        tokenURI,
        name,
        description,
        imageUrl,
        imageStorage
    })
}

export const getTokenDetails = ({
    contractAddress,
    tokenId
}) => {
    return axios.post(`${host}/api/nft/contract/token-details`,{
        contractAddress,
        tokenId
    })
}