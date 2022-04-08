module.exports = {
    testReceiver: '0x09a9D2c3D9ad1A7784C23Bd50f46Ba92468A6F5a',
    contractAddress: '0x528C76d4e070B8046C25a382e6094Cd4027D1911',
    // alchemyUrl: "wss://polygon-mumbai.g.alchemy.com/v2/"
    alchemyUrl: "wss://polygon-mainnet.g.alchemy.com/v2/",
    pinata: {
        apiKey: process.env.PINATA_API_KEY,
        apiSecret: process.env.PINATA_API_SECRET
    }
}