import React, { useEffect, useState } from 'react'
import logo from './polygon-matic-logo.svg';
import axios from 'axios';
import './App.css';
import { mintAndGive, createContract, getTokenDetails } from './service/nft.service.js';

const InputRow = (props) => {

    const onChange = (v) => {
      props.onChange(props.postProcess ? props.postProcess(v) : v);
    }
    return (
      <div className='mb-2 py-2'>
        <h5 className='text-normal font-semibold mb-2'>{props.title}</h5>
        {
          props.helpText && (
            <p className='text-sm text-gray-600 mb-2'>
              {props.helpText}
            </p>
          )
        }
        {
          props.type !== "textarea" && (
            <input value={props.value} className='w-full border p-2 hover:border hover:outline-0 active:outline-0 focus:outline-0 rounded' onChange={(e)=>onChange(e.target.value)}/>
          )
        }
        {
          props.type === "textarea" && (
            <textarea value={props.value} className='p-2 h-16 w-full border hover:border hover:outline-0 active:outline-0 focus:outline-0 rounded' onChange={(e)=>onChange(e.target.value)}></textarea>
          )
        }
      </div>
    )
}

function App() {
  const [loading, setLoading] = useState(false);
  const [contractAddress, setContractAddress] = useState(window.localStorage.getItem('pg-contract-address') || null);
  const [receiverAddress, setReceiverAddress] = useState(null);
  const [tokenName, setTokenName] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [tokenURI, setTokenURI] = useState(null);
  const [foundTokenDetails, setFoundTokenDetails] = useState(null);
  const [txnHash, setTxnHash] = useState(null);
  const [error, setError] = useState(null);

  const [createContractMode, setCreateContractMode] = useState(!contractAddress);

  useEffect(()=>{

    return () => {

    }
  },[]);

  return (
    <div className="h-screen w-full">
      {loading && <div className='z-50 absolute h-screen w-full flex bg-white opacity-80'>
          <div className='m-auto'>
            <div className='text-center'>
              <img className='h-8 d-inline mx-auto animate-bounce' src={logo}/>
            </div>
            <h5 className='text-normal font-semibold text-center mt-4'>
              Processing ...
            </h5>
          </div>
      </div>}
      <div className='text-center p-4 border-b'>
        <div className='flex items-center justify-center'>
          <img className='h-8' src={logo}/>
          <h5 className='font-bold ml-4 text-gray-700'>Issue Your Own NFT on Polygon</h5>
        </div>
      </div>
      {
        !!error && (
          <div className='p-2 m-4 bg-red-100 rounded'>
            <h5 className='text-center font-semibold text-red-600 text-lg my-auto'>{error}</h5>
          </div>
        )
      }
      <div className='flex flex-wrap p-4'>
        <div className='sm:w-4/12 p-2 w-full'>
          <div className='shadow-lg rounded'>
              <div className='p-4 border-b'>
                <h5 className='font-bold'>Step 1. Launch Your NFT</h5>
              </div>
              <div className='p-4'>
                <InputRow title={'Token Name'} value={tokenName} onChange={(v)=>setTokenName(v)}/>
                <InputRow title={'Token Symbol'} value={tokenSymbol} postProcess={(t) => (t || "").toUpperCase()} onChange={(v)=>setTokenSymbol(v)}/>

                <button className='btn mt-2 bg-purple-700 text-white w-full rounded shadow p-2 font-bold' onClick={()=>{
                  if (tokenName && tokenSymbol) {
                    setLoading(true);
                    setError(null);
                    createContract({
                      tokenName,
                      tokenSymbol
                    }).then(({ data })=>{
                      setContractAddress(data.address);
                      window.localStorage.setItem('pg-contract-address', data.address);
                    }).catch((e)=>{
                      setError(e?.response?.data?.message);
                    }).finally(()=>{
                      setLoading(false);
                    })
                  }
                }}>
                  Create New Polygon NFT Contract
                </button>
              </div>
          </div>
        </div>
        <div className='sm:w-4/12 p-2 w-full'>
          <div className='shadow-lg rounded relative'>
              {
                !contractAddress && (
                  <div className='z-50 absolute w-full top-0 left-0 h-full bg-white opacity-90 flex'>
                    <div className='m-auto'>
                      <div className='text-center mb-4'>
                        <img className='h-8 d-inline mx-auto' src={logo}/>
                      </div>
                      <h5 className='font-bold text-normal'>Please create a contract first</h5>
                    </div>
                  </div>
                )
              }
              <div className='p-4 border-b'>
                <h5 className='font-bold'>Step 2. Mint and give someone</h5>
              </div>
              <div className='p-4'>
                {
                  !!contractAddress && (
                    <div className='break-words'>
                        <h5 className='text-normal font-semibold mb-1'>Your NFT Contract Deployed</h5>
                        <a className='text-sm text-blue-600 mb-2 block' target={'_blank'} href={`https://polygonscan.com/address/${contractAddress}`}>
                          https://polygonscan.com/address/{contractAddress}
                        </a>
                    </div>
                  )
                }
                <InputRow title={'Recepient Address'} value={receiverAddress} onChange={(v)=>setReceiverAddress(v)}/>
                <InputRow title={'Content of the Token for recepient'} helpText={'e.g. A IPFS url containing the metadata'} value={tokenURI} type={"textarea"} onChange={(v)=>setTokenURI(v)}/>
                <button className='btn mt-2 bg-purple-700 text-white w-full rounded shadow p-2 font-bold' onClick={()=>{
                  setLoading(true);
                  setError(null);
                  mintAndGive({
                    contractAddress,
                    receiverAddress,
                    tokenURI
                  }).then(({ data })=>{
                    setTxnHash(data.txn.hash);
                  }).catch((e)=>{
                    setError(e?.response?.data?.message);
                  }).finally(()=>{
                    setLoading(false);
                  })
                }}>
                  Mint a NFT and give recipient
                </button>
                {
                  txnHash && (
                    <div className='mt-4'>
                      <p className='break-words'>
                        <h5 className='text-sm font-semibold mb-2'>View Transaction on PolygonScan</h5>
                        <a className='text-sm text-blue-600 mb-2 block' target={'_blank'} href={`https://polygonscan.com/tx/${txnHash}`}>
                          https://polygonscan.com/tx/{txnHash}
                        </a>
                        <p className='text-sm mb-2 mt-4'>The receipient can go to Metamask and click "import token" and paste this NFT contract address: <strong className='text-purple-700'>{contractAddress}</strong></p>
                      </p>
                    </div>
                  )
                }
              </div>
          </div>
        </div>
        <div className='sm:w-4/12 p-2 w-full'>
          <div className='shadow-lg rounded relative'>
              {
                !contractAddress && (
                  <div className='z-50 absolute w-full top-0 left-0 h-full bg-white opacity-90 flex'>
                    <div className='m-auto'>
                      <div className='text-center mb-4'>
                        <img className='h-8 d-inline mx-auto' src={logo}/>
                      </div>
                      <h5 className='font-bold text-normal'>Please create a contract first</h5>
                    </div>
                  </div>
                )
              }
              <div className='p-4 border-b'>
                <h5 className='font-bold'>Step 3. View Token Details</h5>
              </div>
              <div className='p-4'>
                <InputRow title={'NFT Contract Address'} value={contractAddress} onChange={(v)=>setContractAddress(v)}/>                    
                <InputRow title={'Token ID'} value={tokenId} onChange={(v)=>setTokenId(v)}/>
                <button className='btn mt-2 bg-purple-700 text-white w-full rounded shadow p-2 font-bold' onClick={()=>{
                   setLoading(true);
                   setError(null);
                   getTokenDetails({
                     tokenId,
                     contractAddress
                   }).then(({ data })=>{
                    console.log(data);
                    setFoundTokenDetails(data);
                   }).catch((e)=>{
                     setError(e?.response?.data?.message);
                   }).finally(()=>{
                     setLoading(false);
                   })
                }}>
                  Get Token Details
                </button>
                {
                  !!foundTokenDetails && (
                    <div className='mt-4'>
                      <p className='break-words'>
                        <h5 className='text-sm font-semibold mb-2'>Token Details</h5>
                        <p className='text-sm text-gray-500 mb-2 font-semibold'>Token ID: {foundTokenDetails.tokenId}</p>
                        <p className='text-sm text-gray-500 font-semibold'>Token URI: {foundTokenDetails.tokenURI}</p>
                      </p>
                    </div>
                  )
                }
              </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
