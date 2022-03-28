const { default: axios } = require('axios');
const { NFTStorage, File, Blob } = require('nft.storage');
const fetch = require('node-fetch');

// read the API key from an environment variable. You'll need to set this before running the example!
const API_KEY = process.env.NFT_STORAGE_API_KEY;

// For example's sake, we'll fetch an image from an HTTP URL.
// In most cases, you'll want to use files provided by a user instead.
async function getImageByUrl(imageOriginUrl) {
  const r = await axios.get(imageOriginUrl, {
      responseType: 'arraybuffer'
  })
  return new Blob(r.data);
}

async function storeMetaDataService({
    imageUrl,
    name,
    description,
    content
}) {
  const imgData = await getImageByUrl(imageUrl);

  const nft = {
    image: imgData,
    name,
    description,
    properties: {
          type: "identity-proof",
          content: {
            "text/plain": content
          }
    }
  }

  const client = new NFTStorage({ token: API_KEY })
  const metadata = await client.store(nft)

  console.log('NFT data stored!')
  console.log('Metadata URI: ', metadata.url);
  return metadata.url;
}

module.exports = {
    storeMetaDataService
};