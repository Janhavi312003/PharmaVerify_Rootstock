import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, RPC_URL } from './constants';
import DrugNFTABI from '../../public/abi/DrugNFT.json';

// Get provider
export function getProvider() {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return new ethers.JsonRpcProvider(RPC_URL);
}

// Get contract instance
export async function getContract(withSigner = false) {
  const provider = getProvider();
  
  if (withSigner && typeof window !== 'undefined' && window.ethereum) {
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, DrugNFTABI.abi, signer);
  }
  
  return new ethers.Contract(CONTRACT_ADDRESS, DrugNFTABI.abi, provider);
}

// Verify drug by token ID
export async function verifyDrug(tokenId) {
  try {
    const contract = await getContract();
    
    const [batchId, manufacturer, expiryDate, ipfsHash, isRecalled] = 
      await contract.getBatchDetails(tokenId);
    
    const isValid = await contract.isValid(tokenId);
    
    return {
      tokenId,
      batchId,
      manufacturer,
      expiryDate: new Date(Number(expiryDate) * 1000),
      ipfsHash,
      isRecalled,
      isValid,
      status: isValid ? 'valid' : (isRecalled ? 'recalled' : 'expired')
    };
  } catch (error) {
    console.error('Verification error:', error);
    if (error.message.includes('does not exist')) {
      throw new Error('Token does not exist. This may be a counterfeit drug.');
    }
    throw new Error('Failed to verify drug. Please try again.');
  }
}

// Mint new batch - SIMPLIFIED & WORKING
export async function mintBatch(batchId, manufacturer, expiryDate, ipfsHash) {
  try {
    const contract = await getContract(true);
    
    const timestamp = Math.floor(new Date(expiryDate).getTime() / 1000);
    
    console.log('Minting with params:', {
      batchId,
      manufacturer,
      timestamp,
      ipfsHash: ipfsHash || 'QmDefault'
    });
    
    // Call mintBatch
    const tx = await contract.mintBatch(
      batchId,
      manufacturer,
      timestamp,
      ipfsHash || 'QmDefault'
    );
    
    console.log('Transaction sent:', tx.hash);
    const receipt = await tx.wait();
    console.log('Transaction confirmed');
    
    // Parse Transfer event (ERC721 standard)
    const transferTopic = ethers.id('Transfer(address,address,uint256)');
    
    let tokenId = null;
    for (const log of receipt.logs) {
      if (log.topics[0] === transferTopic) {
        tokenId = parseInt(log.topics[3], 16);
        console.log('Found token ID:', tokenId);
        break;
      }
    }
    
    if (!tokenId) {
      // Fallback: try BatchMinted event
      const batchMintedTopic = ethers.id('BatchMinted(uint256,string,string)');
      for (const log of receipt.logs) {
        if (log.topics[0] === batchMintedTopic) {
          tokenId = parseInt(log.topics[1], 16);
          console.log('Found token ID from BatchMinted:', tokenId);
          break;
        }
      }
    }
    
    if (!tokenId) {
      return {
        tokenId: 'Check Explorer',
        txHash: receipt.hash,
        explorerUrl: `https://explorer.testnet.rootstock.io/tx/${receipt.hash}`
      };
    }
    
    return { tokenId, txHash: receipt.hash };
    
  } catch (error) {
    console.error('Minting error:', error);
    
    if (error.message.includes('user rejected')) {
      throw new Error('Transaction cancelled by user');
    }
    if (error.message.includes('insufficient funds')) {
      throw new Error('Insufficient tRBTC balance for gas fees');
    }
    
    throw new Error(error.shortMessage || error.message || 'Failed to mint batch');
  }
}

// Connect wallet
export async function connectWallet() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Please install MetaMask!');
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    return { address, provider, signer };
  } catch (error) {
    console.error('Wallet connection error:', error);
    if (error.code === 4001) {
      throw new Error('Connection rejected by user');
    }
    throw error;
  }
}
