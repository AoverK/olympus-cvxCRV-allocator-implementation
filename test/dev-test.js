const { expect } = require("chai");
const { ethers } = require("hardhat");
const cvxCRVAllocatorArtifact = require('../artifacts/contracts/CvxCRVAllocator.sol/CvxCRVAllocator.json');

describe("cvxCRV Allocator Implementation", function() {

    const abi = cvxCRVAllocatorArtifact.abi;
    const bytecode = cvxCRVAllocatorArtifact.bytecode

    //it("Should return test results for the public functions, private functions and emitted events", async function() {
    it("Deploy smart contract to Rinkeby network", async function() {
        // Get the ContractFactory and Signers here.
        const [owner] = await ethers.getSigners();

        const cvxCRVAllocatorImplementationContract = await ethers.getContractFactory(abi, bytecode, owner);
        // Deploy the contract
        const cvxCRVAllocatorImplementationToken = await cvxCRVAllocatorImplementationContract.deploy();
        await cvxCRVAllocatorImplementationToken.deployed();

        console.log("Contract Address: ", cvxCRVAllocatorImplementationToken.address);
        console.log("Contract Tx Hash: ", cvxCRVAllocatorImplementationToken.deployTransaction.hash);


    });
});