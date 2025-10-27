// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Minimal, self-contained ERC721 and Ownable implementations to avoid external imports.
// These are intentionally simplified and only implement the functionality used in this contract.

abstract contract ERC721 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    mapping(uint256 => address) internal _owners;

    constructor(string memory, string memory) {}

    function _ownerOf(uint256 tokenId) internal view virtual returns (address) {
        return _owners[tokenId];
    }

    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(_owners[tokenId] == address(0), "ERC721: token already minted");
        _owners[tokenId] = to;
        emit Transfer(address(0), to, tokenId);
    }
}

contract Ownable {
    address private _owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor(address initialOwner) {
        _owner = initialOwner;
        emit OwnershipTransferred(address(0), initialOwner);
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Ownable: caller is not the owner");
        _;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract DrugNFT is ERC721, Ownable {
    uint256 private _tokenIds;
    
    struct DrugBatch {
        string batchId;
        string manufacturer;
        uint256 expiryDate;
        string ipfsHash;
        bool isRecalled;
    }
    
    mapping(uint256 => DrugBatch) public batches;
    
    event BatchMinted(
        uint256 indexed tokenId, 
        string batchId, 
        string manufacturer
    );
    event BatchRecalled(uint256 indexed tokenId);
    
    constructor() ERC721("PharmaVerify", "DRUG") Ownable(msg.sender) {}
    
    function mintBatch(
        string memory _batchId,
        string memory _manufacturer,
        uint256 _expiryDate,
        string memory _ipfsHash
    ) public onlyOwner returns (uint256) {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;
        
        _mint(msg.sender, newTokenId);
        
        batches[newTokenId] = DrugBatch({
            batchId: _batchId,
            manufacturer: _manufacturer,
            expiryDate: _expiryDate,
            ipfsHash: _ipfsHash,
            isRecalled: false
        });
        
        emit BatchMinted(newTokenId, _batchId, _manufacturer);
        return newTokenId;
    }
    
    function getBatchDetails(uint256 tokenId) 
        public 
        view 
        returns (
            string memory batchId,
            string memory manufacturer,
            uint256 expiryDate,
            string memory ipfsHash,
            bool isRecalled
        ) 
    {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        DrugBatch memory batch = batches[tokenId];
        return (
            batch.batchId,
            batch.manufacturer,
            batch.expiryDate,
            batch.ipfsHash,
            batch.isRecalled
        );
    }
    
    function isValid(uint256 tokenId) public view returns (bool) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        DrugBatch memory batch = batches[tokenId];
        return !batch.isRecalled && block.timestamp < batch.expiryDate;
    }
    
    function recallBatch(uint256 tokenId) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        batches[tokenId].isRecalled = true;
        emit BatchRecalled(tokenId);
    }
}
