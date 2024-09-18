const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('RevertContract', function () {
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
  });

  it('should revert when deploying', async function () {
    const RevertContract = await ethers.getContractFactory('RevertContract');
    await expect(RevertContract.deploy()).to.be.revertedWithCustomError(RevertContract, 'RevertingConstructor');  
  });
});
