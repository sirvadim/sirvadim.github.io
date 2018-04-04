import WEB3 from 'web3'
import configJS from './config.js'
// const fs = require('fs');
// import solc from 'solc'
// var solc = require('solc')
const web3 = new WEB3(new WEB3.providers.HttpProvider("https://ropsten.infura.io/JCnK5ifEPH9qcQkX0Ahl"))
$(document).ready(function() {
    let openkey, privatekey, curTX, addressManager;
    let addressFactory, ownerFactory, addressLottery, addressAnylottery;
    let activeLottery, winTicketChoosen;
    let tokenAddress, jackpotFactory, bankFactory, countLotteries, jackpotLottery, bankLottery, multiplier, numberOfTickets,
    lengthLotteries, adrRef;
    let currentBlock, sellOverBlock, blockForRandom, stopLotteryBlock, closeLotteryBlock;
    let winTicket;
    let contractLotteryFactory, contractLottery;
    let abiLotteryFactory = configJS.abiLotteryFactory;
    let abiLottery = configJS.abiLottery;
    let bytecodeFactory = configJS.bytecodeFactory;
    let debug = false;

    $('button#openAccount').click(function() {
        privatekey = $('input#privatekey').val()

        if (privatekey.length == 64) {
            privatekey = '0x'+privatekey;
        }
        if ((privatekey.length == 66 || debug) && privatekey.match(/0x[0-9A-Fa-f]{64}/)) {
            unlockAccount();
        } else {
            $('#invalidPrivateKey').show()
        }
    })

    $('button#createFactory').click(function() {
        createFactory();
    })

    $('button#openFactory').click(async function() {
        changeText("loading", true)
        let invalid = false;
        addressFactory = $('input#addressFactory').val();
        
        if (debug) {
            addressFactory = "0xd1012b56b65b9dd0cc44b1652f21b13848be8789";
            ownerFactory = openkey;
        }

        //if (addressFactory.length != 42 || addressFactory.match(/0x[0-9A-Fa-f]{40}/) == null)
        if(!web3.utils.isAddress(addressFactory))
            invalid = true;
        else {
            contractLotteryFactory = new web3.eth.Contract(abiLotteryFactory, addressFactory);
            ownerFactory = await contractLotteryFactory.methods.owner().call();
            if (openkey != ownerFactory)
                invalid = true;
        }

        if (invalid && !debug) {
            $('#invalidFactory').show()
            changeText("invalid", true)
        } else {
            initFactory();
        }
    })

    $('button#сreateLottery').click(function() {
        createLottery();
    })

    $('button#getLottery').click(function() {
        getLottery();
    })
    $('button#copyLottery').click(function() {
        copyLottery();
    })
    $('button#getCurrentBlock').click(function() {
        getCreateBlocks();
    })
    $('button#btnChooseWinTicket').click(function() {
        chooseWinTicket();
    })
    $('button#btnCloseLottery').click(function() {
        closeLottery();
    })
    $('button#btnNumberOfTickets').click(function() {
        getNumberOfTickets();
    })
    $('button#btnWinTicketChoosen').click(function() {
        getWinTicketChoosen();
    })
    $('button#btnWinTicket').click(function() {
        getWinTicket();
    })
    $('button#btnSetManager').click(function() {
        setManager();
    })
    $('button#btnOpenActiveLottery').click(function() {
        openLottery();
    })
    $('button#openLottery').click(function() {
        openLottery(Number($('input#idLottery').val()));
    })
    $('button#back').click(async function() {
        await back();
    })
    $('button#btnUserTickets').click(async function() {
        await btnUserTickets();
    })
    $('button#copyAddressFactory').click(function() {
        copyAddress(addressFactory);
    })
    $('button#ropstenAddressFactory').click(function() {
        ropstenAddress(addressFactory, true);
    })
    $('button#copyAddressToken').click(function() {
        copyAddress(tokenAddress);
    })
    $('button#ropstenAddressToken').click(function() {
        ropstenAddress(tokenAddress, true);
    })
    $('button#copyAddressRef').click(function() {
        copyAddress(adrRef);
    })
    $('button#ropstenAddressRef').click(function() {
        ropstenAddress(adrRef, true);
    })
    $('button#copyAddressLottery').click(function() {
        copyAddress(addressLottery);
    })
    $('button#ropstenAddressLottery').click(function() {
        ropstenAddress(addressLottery, true);
    })
    $('button#openLink').click(function() {
        ropstenAddress(curTX, false);
    })

    function copyAddress(adr) {
        var dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute("id", "dummy_id");
        document.getElementById("dummy_id").value=adr;
        dummy.select();
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        document.body.removeChild(dummy);
        changeText("copied!", true)
    }

    function ropstenAddress(adr, flag) {
        if(flag == true)
            window.open('https://ropsten.etherscan.io/address/'+adr, '_blank');
        else
            window.open('https://ropsten.etherscan.io/tx/'+adr, '_blank');
    }

    async function setManager() {
        addressManager = ($('input#idManager').val());
        if(!web3.utils.isAddress(addressManager))
            return;
        async function setmngtx() {
            const receipt = await contractLottery.methods.setManager(addressManager).send({
                from: openkey,
                gas: 4700000,
                gasPrice: 40 * 1000000000
            }).on('transactionHash', transactionHash => {
                curTX = transactionHash;
                console.log('# setManager TX pending', transactionHash)
                console.log('https://ropsten.etherscan.io/tx/' + transactionHash)
                changeText("transaction set manager", false)
            }).on('error', err => {
                if (err) {
                    console.error(err)
                    reject(err, true)
                }
            });
            console.log('📌 contract.setManager receipt:')
        }
        await setmngtx()
    }

    function unlockAccount() {
        if (debug) {
            openkey = "0x03c6eAc074F9132feF8A6f1Aeb7Df8Deac507D4D";
            privatekey = ""
        }
        web3.eth.accounts.wallet.add(privatekey)
        if (!debug){
            let wallet = web3.eth.accounts.wallet;
            openkey = wallet[0].address
        }
        
        $('#scrLogin').hide();
        $('#Panel').show();
        $('#scrFactory').show();
        document.getElementById("openkeyUser").value = openkey;
    }

    function changeText(argument, flag) {
        document.getElementById("condition").value = argument
        openLink.disabled = flag
    }

    async function createFactory() {
        changeText("create factory", true)
        $('#createFactory').hide();
        $('#openFactory').hide();

        let contract = new web3.eth.Contract(abiLotteryFactory);
        let adrERC20 = "0x5D1E47F703729fc87FdB9bA5C20fE4c1b7c7bf57";
        let adrRef = "0x674ff87adfe928b8b0ffbbddf7faeb5ae7a1f9d6";

        contract.deploy({
            data: bytecodeFactory,
            arguments: [adrERC20, adrRef]
        })
        .send({
            from: openkey,
            gas: 4700000,
            gasPrice: '22000000000'
        })
        .on('error', function(error){
            console.log("error:", error);
        })
        .on('transactionHash', function(transactionHash){
            curTX = transactionHash;
            console.log("transactionHash:", transactionHash);
            changeText("transaction create factory", false)
        })
        .then(function(newContractInstance){
            addressFactory = newContractInstance.options.address;
            initFactory();
        });
    }

    async function initFactory() {
        if(contractLotteryFactory == undefined){
            contractLotteryFactory = new web3.eth.Contract(abiLotteryFactory, addressFactory);
        }
        await getActiveLottery();
        await getAdrRef();
        await refreshTokenAddress();
        await refreshBankFactory();
        await refreshJackpotFactory();
        await refreshCountLotteries();

        if(debug){
            addressLottery = "0x00d273eabf1b18b366672d10f4f46c106c3a6c45";
            activeLottery = true;
        }

        if(activeLottery){
            $('#descriptCreateLottery').hide();
            $('#inputCreateLottery').hide();
        } else {
            await getCreateBlocks();
            $('#btnOpenActiveLottery').hide();
        }
        
        $('p.h5#addressFactory').html("Address: " + addressFactory);

        $('#scrFactory').hide();
        $('#panelFactory').show();
        
        changeText("panelFactory", true)
    }

    async function back() {
        $('#panelLottery').hide();
        $('#panelFactory').show();

        await getActiveLottery();
        if(activeLottery == true) {
            $('#descriptCreateLottery').hide();
            $('#inputCreateLottery').hide();
            $('#btnOpenActiveLottery').show();
        } else {
            $('#descriptCreateLottery').show();
            $('#inputCreateLottery').show();
            $('#btnOpenActiveLottery').hide();
        }
    }

    async function createLottery() {
        sellOverBlock = Number($('input#idSell').val());
        stopLotteryBlock = Number($('input#idStop').val());
        closeLotteryBlock = Number($('input#idClose').val());
        if (sellOverBlock > currentBlock &&
            stopLotteryBlock > sellOverBlock &&
            closeLotteryBlock > stopLotteryBlock) {
            async function lotterytx() {
                const receipt = await contractLotteryFactory.methods.createLottery(sellOverBlock, stopLotteryBlock, closeLotteryBlock).send({
                    from: openkey,
                    gas: 4700000,
                    gasPrice: 40 * 1000000000
                }).on('transactionHash', transactionHash => {
                    curTX = transactionHash;
                    console.log('# createLottery TX pending', transactionHash)
                    console.log('https://ropsten.etherscan.io/tx/' + transactionHash)
                    changeText("transaction create lottery", false)
                }).on('error', err => {
                    if (err) {
                        console.error(err)
                        reject(err, true)
                    }
                }).then(function(){
                    console.log('📌 contract lottery created')
                    openLottery();
                });
            }
            await lotterytx();
        } else {
            $('#invalidBlocks').show()
        }
    }

    async function openLottery(numLottery){
        changeText("loading", true)
        if(numLottery == undefined){
            await refreshCountLotteries();
            numLottery = countLotteries-1;
        }
        addressLottery = await contractLotteryFactory.methods.lotteries(numLottery).call();
        await initLottery();
    }

    async function initLottery() {
        contractLottery = new web3.eth.Contract(abiLottery, addressLottery);

        refreshBankLottery();
        refreshJackpotLottery();
        refreshMultiplier();
        refreshBlockForRandom();
        await getSellOverBlock();
        await getStopLotteryBlock();
        await getCloseLotteryBlock();
        refreshSellOverBlock();
        refreshStopLotteryBlock();
        refreshCloseLotteryBlock();
        $('p.h5#addressLottery').html("Address: " + addressLottery);

        $('#panelFactory').hide();

        let _thisActive = await contractLotteryFactory.methods.activeLotteries(addressLottery).call()

        if(_thisActive == false)
            $('#panelActiveLottery').hide();
        else
            $('#panelActiveLottery').show();
        $('#panelLottery').show();
        changeText("panelLottery", true)
    }

    async function chooseWinTicket() {
        if (currentBlock > blockForRandom) {
            async function choosetx() {
                const receipt = await contractLottery.methods.chooseWinTicket().send({
                    from: openkey,
                    gas: 4700000,
                    gasPrice: 40 * 1000000000
                }).on('transactionHash', transactionHash => {
                    curTX = transactionHash;
                    console.log('# choose TX pending', transactionHash)
                    console.log('https://ropsten.etherscan.io/tx/' + transactionHash)
                    changeText("transaction choose win ticket", false)
                }).on('error', err => {
                    if (err) {
                        console.error(err)
                        reject(err, true)
                    }
                });
                console.log('📌 contract.choose receipt:')
            }
            await choosetx()
        }
    }

    async function closeLottery() {
        await getStopLotteryBlock();
        await getCloseLotteryBlock();
        if (currentBlock > closeLotteryBlock) {
            await closetx()
            
            await getActiveLottery();

            if(activeLottery == false){
                await refreshTokenAddress();
                await refreshBankFactory();
                await refreshJackpotFactory();
                await refreshCountLotteries();
                
                $('p.h5#addressFactory').html("Address: " + addressFactory);

                $('#panelLottery').hide();
                $('#panelFactory').show();
                $('#btnOpenActiveLottery').hide();
                $('#descriptCreateLottery').show();
                $('#inputCreateLottery').show();
            }
        }
    }

    function closetx() {
        return new Promise(async (resolve, reject) => {
            const receipt = await contractLottery.methods.closeLottery().send({
                from: openkey,
                gas: 4700000,
                gasPrice: 40 * 1000000000
            }).on('transactionHash', transactionHash => {
                curTX = transactionHash;
                console.log('# close TX pending', transactionHash)
                console.log('https://ropsten.etherscan.io/tx/' + transactionHash)
                changeText("transaction close lottery", false)
            }).on('error', err => {
                if (err) {
                    console.error(err)
                    reject(err, true)
                }
            });
            console.log('📌 contract.close receipt:')
            resolve()
        })
    }

    async function getLottery() {
        let _numOfLottery = Number(document.getElementById("idLottery").value);
        if(_numOfLottery < 0 || _numOfLottery > countLotteries-1){
            return;
        }
        let _addressOfLottery = await contractLotteryFactory.methods.lotteries(_numOfLottery).call();

        document.getElementById("addressLottery").value = _addressOfLottery;
        document.getElementById("openLottery").disabled = false;
        
    }

    async function btnUserTickets() {
        let adr = String(document.getElementById("userTickets1").value)
        let val = document.getElementById("userTickets2").value

        if(!web3.utils.isAddress(adr))
            return;

        let numTicketsPlayer = await getLengthTicketsPlayer(adr);

        if(val >= numTicketsPlayer || val < 0)
            return;

        await contractLottery.methods.usersTickets(adr, val).call().then(res => {
            let curTicket = [res[0],res[1],res[2],res[3],res[4],res[5],res[6]]
            document.getElementById("userTicketsRes").value = curTicket;
            console.log(res)
        })
    }

    function copyLottery() {
        var copyText = $('input#addressLottery');
        copyText.select();
        document.execCommand("Copy");

        window.getSelection().removeAllRanges();
        changeText("copied", true)
    }

    async function getCreateBlocks() {
        await web3.eth.getBlockNumber(async function(error, res) {
            document.getElementById("idSell").value = currentBlock + 100;
            document.getElementById("idStop").value = currentBlock + 180;
            document.getElementById("idClose").value = currentBlock + 280;
        })
    }

    async function getCurrentBlock() {
        await web3.eth.getBlockNumber(function(error, res) {
            currentBlock = Number(res);
            document.getElementById("currentBlock").value = currentBlock;
        })
        // await getCurrentBlock();
        window.setTimeout(getCurrentBlock, 10000);
    }
    getCurrentBlock()

    async function getSellOverBlock() {
        await contractLottery.methods.sellOverBlock().call().then(res => {
            sellOverBlock = res;
        })
    }

    async function getCloseLotteryBlock() {
        await contractLottery.methods.closeLotteryBlock().call().then(res => {
            closeLotteryBlock = res;
        })
    }

    async function getStopLotteryBlock() {
        await contractLottery.methods.stopLotteryBlock().call().then(res => {
            stopLotteryBlock = res;
        })
    }

    async function getNumberOfTickets() {
        await contractLottery.methods.numberOfTickets().call().then(res => {
            numberOfTickets = res;
            document.getElementById("numberOfTickets").value = numberOfTickets;
        })
    }

    async function getActiveLottery(){
        activeLottery = await contractLotteryFactory.methods.activeLottery().call();
    }

    async function getLengthLotteries(){
        lengthLotteries = await contractLotteryFactory.methods.getLengthLotteries().call();
    }

    async function getLengthTicketsPlayer(adr){
        let numTicketsPlayer = await contractLottery.methods.getLengthTickets(adr).call();
        return numTicketsPlayer
    }

    async function getWinTicketChoosen() {
        await contractLottery.methods.winTicketChoosen().call().then(res => {
            winTicketChoosen = res;
            document.getElementById("winTicketChoosen").value = winTicketChoosen;
        })
    }

    async function getWinTicket() {
        await getWinTicketChoosen()
        contractLottery.methods.winTicket().call().then(res => {
            if(winTicketChoosen == false)
                res = "not choosen"
            winTicket = res;
            document.getElementById("winTicket").value = winTicket;
        })
    }

    var before,now,fps;
    before=Date.now();
    fps=0;
    requestAnimationFrame(
        function loop(){
            now=Date.now();
            fps=Math.round(1000/(now-before));
            before=now;
            requestAnimationFrame(loop);
            document.getElementById("FPS").value = "fps: "+fps;
        }
     );

    async function refreshTokenAddress() {
        tokenAddress = await contractLotteryFactory.methods.token().call();
        $('p.h5#addressToken').html("Token: " + tokenAddress);
    }

    async function refreshBankFactory() {
        bankFactory = await contractLotteryFactory.methods.bank().call();
        bankFactory = parseInt(bankFactory) / 10 ** 18;
        $('p.h5#bankFactory').html("Bank: " + bankFactory);
    }

    async function refreshJackpotFactory() {
        jackpotFactory = await contractLotteryFactory.methods.jackpot().call();
        jackpotFactory = parseInt(jackpotFactory) / 10 ** 18;
        $('p.h5#jackpotFactory').html("Jackpot: " + jackpotFactory);
    }

    async function refreshCountLotteries() {
        countLotteries = await contractLotteryFactory.methods.getLengthLotteries().call();
        $('p.h5#countLotteries').html("Count lotteries: " + countLotteries);
    }

    async function refreshBankLottery() {
        bankLottery = await contractLottery.methods.bank().call();
        bankLottery = parseInt(bankLottery) / 10 ** 18;
        $('p.h5#bankLottery').html("Bank: " + bankLottery);
    }

    async function refreshJackpotLottery() {
        jackpotLottery = await contractLottery.methods.jackpot().call();
        jackpotLottery = parseInt(jackpotLottery) / 10 ** 18;
        $('p.h5#jackpotLottery').html("Jackpot: " + jackpotLottery);
    }

    async function refreshMultiplier() {
        multiplier = await contractLottery.methods.multiplier().call();
        $('p.h5#multiplier').html("Multiplier: " + multiplier);
    }

    function refreshSellOverBlock() {
        $('p.h5#sellOverBlock').html("sellOverBlock: " + sellOverBlock);
    }

    async function getAdrRef() {
        adrRef = await contractLotteryFactory.methods.adrRef().call();
        $('p.h5#addressRef').html("Ref: " + adrRef);
    }

    async function refreshBlockForRandom() {
        blockForRandom = await contractLottery.methods.blockForRandom().call();
        $('p.h5#blockForRandom').html("blockForRandom: " + blockForRandom);
    }

    function refreshStopLotteryBlock() {
        $('p.h5#stopLotteryBlock').html("stopLotteryBlock: " + stopLotteryBlock);
    }

    function refreshCloseLotteryBlock() {
        $('p.h5#closeLotteryBlock').html("closeLotteryBlock: " + closeLotteryBlock);
    }
})