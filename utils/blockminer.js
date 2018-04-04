const BlockMiner = artifacts.require("BlockMiner")

/**
 * Run through blocks (e.g. so that block number will be greater than target block)
 * @param {address} addr, the address of the user who is transacting
 * @param {number}  numBlocksToMine - how far to move the block count
 * @return Function
 */
module.exports = function(addr, numBlocksToMine) {
  return new Promise(async function (resolve) {
    const blockMiner = await BlockMiner.deployed()
    let miners = [];
    for (let ii = 0; ii < numBlocksToMine; ii++) {
      miners.push(blockMiner.mine({from: addr}));
    }
    return Promise.all(miners).then(resolve);
  });
};;