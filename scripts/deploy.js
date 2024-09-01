const { ethers } = require("hardhat");

async function main() {
  const Crowdfunding = await ethers.getContractFactory("Genesis");
  const crowdfunding = await Crowdfunding.deploy(1000); // Example projectTax: 1000
  await crowdfunding.deployed();
  console.log("Crowdfunding contract deployed to:", crowdfunding.address);
}

main().then(() => process.exit(0)).catch(error => {

  console.error(error);
  process.exit(1);
});

//0x5FbDB2315678afecb367f032d93F642f64180aa3