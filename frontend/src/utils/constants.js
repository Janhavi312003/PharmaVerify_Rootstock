export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xF680d3C59f6C3a2bEe6eCcd1884cB19CA663Ce20';
export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '31');
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://public-node.testnet.rsk.co';

export const ROOTSTOCK_TESTNET = {
  id: CHAIN_ID,
  name: 'Rootstock Testnet',
  network: 'rootstock-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Test RSK Bitcoin',
    symbol: 'tRBTC',
  },
  rpcUrls: {
    default: { http: [RPC_URL] },
    public: { http: [RPC_URL] },
  },
  blockExplorers: {
    default: { 
      name: 'Rootstock Explorer', 
      url: 'https://explorer.testnet.rootstock.io' 
    },
  },
  testnet: true,
};

// Debug: Log values
console.log('Contract Config:', {
  address: CONTRACT_ADDRESS,
  chainId: CHAIN_ID,
  rpc: RPC_URL
});
