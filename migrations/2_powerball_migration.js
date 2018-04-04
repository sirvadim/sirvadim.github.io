const Token = artifacts.require("ERC20")
const Referrer = artifacts.require("Referrer")
const LotteryFactory = artifacts.require("LotteryFactory")
const Lottery = artifacts.require("Lottery")
const BlockMiner = artifacts.require("BlockMiner")

module.exports = function(deployer, network) {
    if (network == "develop") {
        deployer.deploy(Token).then(()=>{
            return deployer.deploy(Referrer)
        }).then(()=>{
            return deployer.deploy(LotteryFactory, Token.address, Referrer.address)
        }).then(()=>{
            return deployer.deploy(BlockMiner)
        }).then(()=>{
            console.log('Migrate success!')
        })
    } else if (network == "ropsten") {
        var adrERC20 = "0x5D1E47F703729fc87FdB9bA5C20fE4c1b7c7bf57";
        var adrRef = "0x674ff87adfe928b8b0ffbbddf7faeb5ae7a1f9d6";
        var tokenContract = Token.at(adrERC20);
        var refContract = Token.at(adrRef);
		deployer.deploy(LotteryFactory, tokenContract.address, refContract.address).then(()=>{
            console.log('Migrate success!')
        })
    }
};