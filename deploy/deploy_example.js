/**
 * @type import('hardhat-deploy/types').DeployFunction
 */
const deployFunction = async (hre) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();

    await deploy('Example', {
        from: deployer,
        log: true,
    });
};

deployFunction.tags = ['Example'];

module.exports.default = deployFunction;
