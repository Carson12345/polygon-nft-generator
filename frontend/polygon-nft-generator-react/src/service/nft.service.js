import axios from "axios";

const host = `https://polygon-nft-generator.herokuapp.com`;

export const createContract = ({
    tokenName,
    tokenSymbol
}) => {
    return axios.get(`${host}/api/nft/contract/create?tokenName=${tokenName}&tokenSymbol=${tokenSymbol}`)
}

export const mintAndGive = ({
    contractAddress,
    receiverAddress,
    tokenURI
}) => {
    return axios.post(`${host}/api/nft/contract/mint`,{
        contractAddress,
        receiverAddress,
        tokenURI
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