$(document).ready(function () {
    let openkey, privatekey;
    let addressFactory, ownerFactory, addressLottery, addressAnylottery;
    let activeLottery, winTicketChoosen;
    let jackpotFactory, bankFactory, countLotteries, jackpotLottery, bankLottery, multiplier, numberOfTickets;
    let currentBlock, sellOverBlock, blockForRandom, stopLotteryBlock, closeLotteryBlock;
    let winTicket;
    let debug = true;

    $('button#openAccount').click(function () {
        privatekey = $('input#privatekey').val()
        if(privatekey.length == 64 || debug){
            unlockAccount();
        } else {
            $('#invalidPrivateKey').show()
        }
    })

    $('button#createFactory').click(function () {
        createFactory();
    })

    $('button#openFactory').click(function () {
        let invalid = false;
        addressFactory = $('input#addressFactory').val();

        if(debug){
            addressFactory = "0x7664a7823bb398ccaeaec8a6b9664e04bf92856c"; 
        }

        if(addressFactory.length == 42){
            // TODO: get ownerFactory
        } else {
            invalid = true;
        }
        if(openkey != ownerFactory){
            invalid = true;
        }

        if(invalid && !debug){
            $('#invalidFactory').show()
        } else {
            initFactory();
        }
    })

    $('button#сreateLottery').click(function () {
        createLottery();
    })
    
    $('button#getLottery').click(function () {
        getLottery();
    })
    $('button#copyLottery').click(function () {
        copyLottery();
    })
    $('button#getCurrentBlock').click(function () {
        getCurrentBlock();
    })
    $('button#btnChooseWinTicket').click(function () {
        chooseWinTicket();
    })
    $('button#btnCloseLottery').click(function () {
        closeLottery();
    })
    $('button#btnNumberOfTickets').click(function () {
        getNumberOfTickets();
    })
    $('button#btnWinTicketChoosen').click(function () {
        getWinTicketChoosen();
    })
    $('button#btnWinTicket').click(function () {
        getWinTicket();
    })
    
    function unlockAccount() {
        if(debug){
            openkey = "0x03c6eAc074F9132feF8A6f1Aeb7Df8Deac507D4D";
        }
        $('#scrLogin').hide()
        $('#scrFactory').show()
    }

    function createFactory() {
        // TODO: deploy factory, callback initFactory
    }

    function initFactory() {
        refreshBankFactory();
        refreshJackpotFactory();
        refreshCountLotteries();
        getCurrentBlock();
        $('p.h5#addressFactory').html("Address: " + addressFactory);
        
        $('#scrFactory').hide();
        $('#panelFactory').show();
    }

    function createLottery() {
        sellOverBlock = Number($('input#idSell').val());
        stopLotteryBlock = Number($('input#idStop').val());
        closeLotteryBlock = Number($('input#idClose').val());
        console.log("currentBlock", currentBlock)
        if(sellOverBlock > currentBlock && 
        stopLotteryBlock > sellOverBlock && 
        closeLotteryBlock > stopLotteryBlock){
            // TODO createLottery(sellOverBlock, stopLotteryBlock, closeLotteryBlock)
            initLottery(); // callback
        } else {
            $('#invalidBlocks').show()
        }
    }

    function initLottery(){
        addressLottery = "0x"; // TODO get address
        refreshBankLottery();
        refreshJackpotLottery();
        refreshMultiplier();
        refreshSellOverBlock();
        refreshBlockForRandom();
        refreshStopLotteryBlock();
        refreshCloseLotteryBlock();
        $('p.h5#addressLottery').html("Address: " + addressLottery);

        $('#panelFactory').hide();
        $('#panelLottery').show();
    }

    function chooseWinTicket(){
        getCurrentBlock(); // async
        if(currentBlock > blockForRandom){
            // TODO chooseWinTicket ropsten
        }
    }

    function closeLottery(){
        getCurrentBlock(); // async
        if(currentBlock > closeLotteryBlock){
            // TODO closeLottery ropsten
        }
    }

    function getLottery() {
        addressAnylottery = "0x"// TODO get addressAnylottery and show
        $('input#addressLottery').html(addressAnylottery);
    }

    function copyLottery(){
        /* Get the text field */
        var copyText = $('input#addressLottery');
        /* Select the text field */
        copyText.select();
        /* Copy the text inside the text field */
        document.execCommand("Copy");
    }

    function getCurrentBlock(){
        currentBlock = 0;// TODO currentBlock
    }
    function getNumberOfTickets(){
        numberOfTickets = 0; // TODO
    }
    function getWinTicketChoosen(){
        winTicketChoosen = false; // TODO
    }
    function getWinTicket(){
        winTicket = []; // TODO
    }

    function refreshBankFactory(){
        bankFactory = 0; // TODO get from ropsten
        $('p.h5#bankFactory').html("Bank: " + bankFactory);
    }
    function refreshJackpotFactory(){
        jackpotFactory = 0; // TODO get from ropsten
        $('p.h5#jackpotFactory').html("Jackpot: " + jackpotFactory);
    }
    function refreshCountLotteries(){
        countLotteries = 0; // TODO get from ropsten
        $('p.h5#countLotteries').html("Count lotteries: " + countLotteries);
    }
    function refreshBankLottery(){
        bankLottery = 0; // TODO get from ropsten
        $('p.h5#bankLottery').html("Bank: " + bankLottery);
    }
    function refreshJackpotLottery(){
        jackpotLottery = 0; // TODO get from ropsten
        $('p.h5#jackpotLottery').html("Jackpot: " + jackpotLottery);
    }
    function refreshMultiplier(){
        multiplier = 0; // TODO get from ropsten
        $('p.h5#multiplier').html("Multiplier: " + multiplier);
    }
    function refreshSellOverBlock(){
        //sellOverBlock = 0; // TODO get from ropsten
        $('p.h5#sellOverBlock').html("sellOverBlock: " + sellOverBlock);
    }
    function refreshBlockForRandom(){
        blockForRandom = 0; // TODO get from ropsten
        $('p.h5#blockForRandom').html("blockForRandom: " + blockForRandom);
    }
    function refreshStopLotteryBlock(){
        //stopLotteryBlock = 0; // TODO get from ropsten
        $('p.h5#stopLotteryBlock').html("stopLotteryBlock: " + stopLotteryBlock);
    }
    function refreshCloseLotteryBlock(){
        //closeLotteryBlock = 0; // TODO get from ropsten
        $('p.h5#closeLotteryBlock').html("closeLotteryBlock: " + closeLotteryBlock);
    }
})