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
            <textarea value={props.value} className='h-16 w-full border hover:border hover:outline-0 active:outline-0 focus:outline-0 rounded' onChange={(e)=>onChange(e.target.value)}></textarea>
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
  const [error, setError] = useState(null);

  const [createContractMode, setCreateContractMode] = useState(!contractAddress);

  useEffect(()=>{

    return () => {

    }
  },[]);

  return (
    <div className="h-screen w-full">
      {loading && <div className='absolute h-screen w-full flex bg-white opacity-80'>
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
                {
                  !!contractAddress && (
                    <InputRow title={'Contract Saved'} value={contractAddress} onChange={(v)=>setContractAddress(v)}/>                    
                  )
                }
                <InputRow title={'Token Name'} value={tokenName} onChange={(v)=>setTokenName(v)}/>
                <InputRow title={'Token Symbol'} value={tokenSymbol} postProcess={(t) => (t || "").toUpperCase()} onChange={(v)=>setTokenSymbol(v)}/>

                <button className='btn mt-2 bg-purple-700 text-white w-full rounded shadow p-2 font-bold' onClick={()=>{
                  if (tokenName && tokenSymbol) {
                    setLoading(true);
                    createContract({
                      tokenName,
                      tokenSymbol
                    }).then(({ data })=>{
                      setContractAddress(data.address);
                      window.localStorage.setItem('pg-contract-address', data.address)
                    }).catch((e)=>{
                      setError(e?.response?.data?.message);
                    }).finally(()=>{
                      setLoading(false);
                    })
                  }
                }}>
                  Create Polygon NFT Contract
                </button>
              </div>
          </div>
        </div>
        <div className='sm:w-4/12 p-2 w-full'>
          <div className='shadow-lg rounded relative'>
              {
                !contractAddress && (
                  <div className='absolute w-full top-0 left-0 h-full bg-white opacity-90 flex'>
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
                <InputRow title={'Recepient Address'} value={receiverAddress} onChange={(v)=>setReceiverAddress(v)}/>
                <InputRow title={'Content of the Token for recepient'} helpText={'e.g. A IPFS url containing the metadata'} value={tokenURI} type={"textarea"} onChange={(v)=>setTokenURI(v)}/>
                <button className='btn mt-2 bg-purple-700 text-white w-full rounded shadow p-2 font-bold' onClick={()=>{
                  setLoading(true);
                  mintAndGive({
                    receiverAddress,
                    tokenURI
                  }).then(({ data })=>{
                    console.log(data);
                  }).catch((e)=>{
                    setError(e?.response?.data?.message);
                  }).finally(()=>{
                    setLoading(false);
                  })
                }}>
                  Mint a NFT and give recipient
                </button>
              </div>
          </div>
        </div>
        <div className='sm:w-4/12 p-2 w-full'>
          <div className='shadow-lg rounded relative'>
              {
                !contractAddress && (
                  <div className='absolute w-full top-0 left-0 h-full bg-white opacity-90 flex'>
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
                   getTokenDetails({
                     tokenId,
                     contractAddress
                   }).then(({ data })=>{
                    console.log(data);
                   }).catch((e)=>{
                     setError(e?.response?.data?.message);
                   }).finally(()=>{
                     setLoading(false);
                   })
                }}>
                  Get Token Details
                </button>
              </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
