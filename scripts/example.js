const { ethers, getNamedAccounts } = require("hardhat");
const { abi } = require('../artifacts/contracts/example.sol/Example.json');

const EXAMPLE_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const HARDHAT_PROVIDER_URL = 'http://127.0.0.1:8545/';


async function main() {
    const { deployer } = await getNamedAccounts();
    const provider = new ethers.providers.WebSocketProvider(HARDHAT_PROVIDER_URL);
    const deployerSigner = provider.getSigner(deployer);

    // const EX = await ethers.getContractFactory('Example', deployerSigner);
    // const ex = await EX.deploy();
    // await ex.deployed();
    // console.log('Example deployed to:', ex.address);

    try {
        const ex1 = await ethers.getContract('Example', deployerSigner);
        console.log('Example deployed to:', ex1.address);
    } catch (err) {
        // при старте локального блокчейна я вижу в логах, что
        // deploying "Example" (tx: ...)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 92307 gas
        // на строчке 19 я ожидаю подключиться к этому контракту, но получаю ошибку
        // No Contract deployed with name Example
        console.log(err.message);
    }

    const ex0 = await ethers.getContractAt(abi, EXAMPLE_ADDRESS, deployerSigner);
    console.log('ex0 deployed to:', ex0.address);

    const usefulDate = await ex0.USEFUL_DATA();
    console.log({ usefulDate: Number(usefulDate) });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
