// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers, upgrades } = require("hardhat");
const { getImplementationAddress } = require('@openzeppelin/upgrades-core');

const cvxCRVAllocatorArtifact = require('../artifacts/contracts/CvxCRVAllocator.sol/CvxCRVAllocator.json');
//const cvxCRVProxyArtifact = require('../artifacts/contracts/AdminUpgradeabilityProxy.sol/AdminUpgradeabilityProxy.json');

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    const abi = cvxCRVAllocatorArtifact.abi;
    const bytecode = cvxCRVAllocatorArtifact.bytecode

    const [owner] = await ethers.getSigners();
    const olympusTreasuryAddress = "0xBB0c4c8eeB9abB4C82122D26675B0DdCF99c6302";
    const cvxCRVAddress = "0xBB0c4c8eeB9abB4C82122D26675B0DdCF99c6302";
    const cvxCRVRewardDistributorAddress = "0xBB0c4c8eeB9abB4C82122D26675B0DdCF99c6302";
    //console.log(bytecode);

    // We get the contract to deploy
    const cvxCRVAllocatorLogicContract = await ethers.getContractFactory(abi, bytecode, owner); // Proxy contract
    const cvxCRVLocicProxyContract = await upgrades.deployProxy(cvxCRVAllocatorLogicContract, [olympusTreasuryAddress, cvxCRVAddress, cvxCRVRewardDistributorAddress]);
    await cvxCRVLocicProxyContract.deployed();
    console.log("cvxCRV deployed to: ", cvxCRVLocicProxyContract.address)
        //const cvxCRVProxyContract = await hre.ethers.getContractFactory("cvxCRV Allocator Proxy"); //Proxy contract

    // Upgrading
    //const BoxV2 = await ethers.getContractFactory("BoxV2");
    //const upgraded = await upgrades.upgradeProxy(instance.address, BoxV2);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });