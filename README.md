# 🏥 PharmaVerify - Blockchain Drug Authentication System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-0.8.19-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black.svg)
![Rootstock](https://img.shields.io/badge/Blockchain-Rootstock-orange.svg)

**Combat counterfeit medicine with Bitcoin-secured blockchain verification**

PharmaVerify is a decentralized application (dApp) that enables pharmaceutical companies to mint drug batch NFTs and allows distributors, pharmacies, and consumers to verify drug authenticity instantly using QR codes on the Rootstock blockchain.

---

## ✨ Features

- 🔒 **Bitcoin-Secured** - Built on Rootstock, inheriting Bitcoin's security through merge mining
- ⚡ **Instant Verification** - Scan QR codes to verify drug authenticity in seconds
- 🌐 **Decentralized** - No single point of failure, tamper-proof records
- 🏭 **Manufacturer Portal** - Mint drug batch NFTs with expiry dates and metadata
- 📱 **QR Code Scanner** - Mobile-friendly verification interface with camera integration
- 🚨 **Batch Recall System** - Instant recall notifications across the entire supply chain
- 🔍 **Public Verification** - Anyone can verify, only authorized manufacturers can mint
- 💾 **IPFS Integration** - Optional metadata storage for certificates and documentation

---

## 🛠️ Tech Stack

### **Blockchain**
- **Rootstock (RSK) Testnet** - Bitcoin-secured EVM-compatible blockchain
- **Solidity 0.8.19** - Smart contract language
- **Foundry** - Smart contract development framework
- **OpenZeppelin** - Secure contract standards (ERC-721)

### **Frontend**
- **Next.js 16** - React framework with App Router
- **Ethers.js v6** - Ethereum JavaScript library
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5-QRCode** - QR code scanner library
- **React-QR-Code** - QR code generator

### **Tools**
- **MetaMask** - Web3 wallet
- **Vercel** - Frontend deployment platform
- **Git** - Version control

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** ([Download](https://nodejs.org/))
- **Foundry** ([Install](https://book.getfoundry.sh/getting-started/installation))
- **MetaMask** wallet ([Install](https://metamask.io/))
- **Git** ([Download](https://git-scm.com/))

---

## 📦 Installation

### 1. Clone Repository

git clone https://github.com/Janhavi312003/PharmaVerify_Rootstock
cd pharma-verify


### 2. Setup Smart Contracts

cd foundry

Install dependencies
forge install foundry-rs/forge-std

Compile contracts
forge build

Run tests
forge test -vvv


### 3. Get Test Tokens

1. Visit [Rootstock Faucet](https://faucet.rootstock.io/)
2. Enter your MetaMask address
3. Receive tRBTC (test tokens)

### 4. Deploy to Rootstock Testnet

**Create `.env` file in foundry directory:**

PRIVATE_KEY=your_metamask_private_key_here


**Deploy contract:**
cd foundry

Load environment variables
source .env

Deploy to Rootstock testnet

forge script script/Deploy.s.sol

--rpc-url https://public-node.testnet.rsk.co

--broadcast

--legacy

-vvv


**Save the contract address from output:**
DrugNFT deployed to: 0xYourContractAddress


### 5. Setup Frontend

cd ../frontend

Install dependencies

npm install


**Create `.env.local` file:**

NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress

NEXT_PUBLIC_CHAIN_ID=31

NEXT_PUBLIC_RPC_URL=https://public-node.testnet.rsk.co


**Copy Contract ABI:**
mkdir -p public/abi

cp ../foundry/out/DrugNFT.sol/DrugNFT.json public/abi/


**Run development server:**
npm run dev


Visit `http://localhost:3000`

---

### Add Rootstock Testnet

1. Open MetaMask
2. Click network dropdown
3. Click "Add Network"
4. Enter details:

Network Name: Rootstock Testnet
RPC URL: https://public-node.testnet.rsk.co
Chain ID: 31
Currency Symbol: tRBTC
Block Explorer: https://explorer.testnet.rootstock.io

5. Click "Save"

