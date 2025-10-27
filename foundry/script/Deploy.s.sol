// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/DrugNFT.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("Deploying DrugNFT contract...");
        console.log("Deployer address:", deployer);
        console.log("---");
        
        vm.startBroadcast(deployerPrivateKey);
        
        DrugNFT drugNFT = new DrugNFT();
        console.log("DrugNFT deployed to:", address(drugNFT));
        console.log("Owner:", drugNFT.owner());
        console.log("---");
        
        console.log("Minting demo batch...");
        uint256 expiryDate = block.timestamp + 365 days; 
        
        uint256 tokenId = drugNFT.mintBatch(
            "BATCH-2025-PFZ-001",
            "Pfizer Inc",
            expiryDate,
            "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"
        );
        
        console.log("Demo batch minted!");
        console.log("Token ID:", tokenId);
        console.log("Batch ID: BATCH-2025-PFZ-001");
        console.log("Manufacturer: Pfizer Inc");
        console.log("Expiry Date (timestamp):", expiryDate);
        console.log("---");
        
        bool valid = drugNFT.isValid(tokenId);
        console.log("Batch is valid:", valid);
        
        vm.stopBroadcast();
        
        console.log("---");
        console.log("Deployment complete!");
        console.log("Save this contract address:", address(drugNFT));
        console.log("Use Token ID", tokenId, "for QR code testing");
    }
}
