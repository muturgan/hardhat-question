const { assert } = require('./chai');
const { deployments } = require('hardhat');

describe('Example', () => {
  it('Should return a correct value', async () => {
    await deployments.fixture('Example');

    const ex = await ethers.getContract('Example');

    const usefulDate = await ex.USEFUL_DATA();

    assert.strictEqual(Number(usefulDate), 100500);
  });
});
