const pinataSDK = require('@pinata/sdk');
const config = require('../../config');
const pinata = pinataSDK(config.pinata.apiKey, config.pinata.apiSecret);
const { Readable } = require('stream');
const { default: axios } = require('axios');
const path = require('path');
const https = require('https');

function getStreamByUrl(url) {
    return https.get(url);
}

module.exports = {
    pinJSON: async ({
        json,
        name
    }) => {
        try {
            const body = json;
            const options = {
                pinataMetadata: {
                    name
                },
                pinataOptions: {
                    cidVersion: 0
                }
            };
            let result = await pinata.pinJSONToIPFS(body, options);

            return result;
        } catch (error) {
            console.log("Error: ", error);
            throw error.message;
        }
    },
    pinFileByUrl: async ({
        url
    }) => {
        try {

            const getPinResult = new Promise((rs,rj)=>{
                try {
                    https.get(url, async (stream) => {
                        const options = {
                            pinataMetadata: {
                                name: url
                            },
                            pinataOptions: {
                                cidVersion: 0
                            }
                        };
                        let result = await pinata.pinFileToIPFS(stream, options).then();
        
                        rs(result);   
                    });
                } catch (error) {
                    rj(error)
                }
            })

            // const fs = require('fs');
            // const readableStreamForFile = fs.createReadStream(path.resolve(__dirname, './fire.png'));

            let result = await getPinResult.then();

            return result;
        } catch (error) {
            console.log("Error: ", error);
            throw error.message;
        }
    }
}