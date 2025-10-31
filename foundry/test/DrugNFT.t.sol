// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test} from "lib/forge-std/src/Test.sol";
import {DrugNFT} from "../src/DrugNFT.sol";

contract DrugNFTTest is Test {
    DrugNFT public drugNFT;
    address public owner;
    
    function setUp() public {
        owner = address(this);
        drugNFT = new DrugNFT();
    }
    
    function testMintBatch() public {
        uint256 expiryDate = block.timestamp + 365 days;
        
        uint256 tokenId = drugNFT.mintBatch(
            "BATCH-001",
            "Pfizer",
            expiryDate,
            "QmHash123"
        );
        
        assertEq(tokenId, 1);
    }
    
    function testBatchIsValid() public {
        uint256 expiryDate = block.timestamp + 365 days;
        
        drugNFT.mintBatch(
            "BATCH-001",
            "Pfizer",
            expiryDate,
            "QmHash123"
        );
        
        assertTrue(drugNFT.isValid(1));
    }

    function testExpiredBatchIsInvalid() public {
    uint256 expiryDate = block.timestamp + 1 days;
    
     drugNFT.mintBatch(
          "BATCH-001",
          "Pfizer",
          expiryDate,
          "QmHash123"
        );
      
      vm.warp(block.timestamp + 2 days);
    
      assertFalse(drugNFT.isValid(1));
    }

    
    function testRecallBatch() public {
        uint256 expiryDate = block.timestamp + 365 days;
        
        drugNFT.mintBatch(
            "BATCH-001",
            "Pfizer",
            expiryDate,
            "QmHash123"
        );
        
        drugNFT.recallBatch(1);
        assertFalse(drugNFT.isValid(1));
    }
}
