var GameLogic = function(){
    var _self = this;

    var _balance = 10, _curbet = 1;
    var _player = true, _bankroller = false

    var _arMyCards = [], _arBankCards = [], _arCards = [];
    var _arSplitCards = [];
    var _insurance = false;

    var BLACKJACK = 21;
    
    var DEAL = 0;
    var HIT = 1;
    var STAND = 2;
    
    
    var COUNT_DECKS = 4;
    var COUNT_CARDS = 52;

    var secondHandStand = false, secondHand = false;

    var _objGame = {
        result       : false,
        profitGame   : 0,
        betGame      : 0,
        score        : 0,
        player       : _arMyCards,
        arSplit      : _arSplitCards,
        bankroller   : _arBankCards,
        secondHand        : false,
        secondHandStand   : false
    };

    _self.setBet = function(_bet){
        _objGame = {result:false,
                    profitGame:0,
                    betGame:_bet,
                    betMain:_bet,
                    betSplit:0,
                    score:0,
                    player       : _arMyCards,
                    arSplit      : _arSplitCards,
                    bankroller   : _arBankCards,
                    secondHand        : false,
                    secondHandStand   : false};

        _curbet = _bet;
        _objGame.profitGame -= _curbet;
        _balance -= _curbet;
        return {
            bet : _bet
        }
    };

    _self.runGame = function() {
        _self.setBet(_curbet)
        console.log("╔╗─╔╦═══╦╗╔╗╔╗─╔═══╦══╦╗──╔╦═══╗\n║╚═╝║╔══╣║║║║║─║╔══╣╔╗║║──║║╔══╝\n║╔╗─║╚══╣║║║║║─║║╔═╣╚╝║╚╗╔╝║╚══╗\n║║╚╗║╔══╣║║║║║─║║╚╗║╔╗║╔╗╔╗║╔══╝\n║║─║║╚══╣╚╝╚╝║─║╚═╝║║║║║╚╝║║╚══╗\n╚╝─╚╩═══╩═╝╚═╝─╚═══╩╝╚╩╝──╚╩═══╝");
        if(_arCards.length < Math.floor(COUNT_DECKS*COUNT_CARDS*0.75))
            _self.mixDeck();
        
        _self.newGame();

        _self.dealCard(_player);
        _self.dealCard(_bankroller);
        _self.dealCard(_player);

        _objGame.player = _arMyCards;
        _objGame.bankroller = _arBankCards;

        console.log(_self.solveSum(_arMyCards),_self.solveSum(_arBankCards));

        //_self.checkSplit();
        //_self.checkDouble();
        _self.checkBlackJack();
    }

    _self.hit = function(){
        _self.dealCard(_player);
    }

    _self.stand = function(){
        if (_objGame.secondHandStand == true){
            _objGame.secondHandStand = false;
            console.log("stand split");
            return;
        }
        console.log("stand main");
        _self.checkResult();
    }

    _self.checkInsurance = function() {
        if(getNameCard(_arBankCards[0])._cardSymbol == "A"){
            console.log("show insurance");
            //show btns
        }
    }

    _self.insurance = function() {
        //-bal
        _insurance = true;
    }

    //страховка, вычет баланса при сплите/дабле

    _self.newGame = function(){
        _arMyCards = [], _arBankCards = [], _arSplitCards = [];
    }

    _self.checkSplit = function() {
        console.log("check split");
        if (_arMyCards.length == 2 && _self.getNameCard(_arMyCards[0])._cardPoint == _self.getNameCard(_arMyCards[1])._cardPoint){
            console.log("can split")
            return true;
        }
        return false;
    }

    _self.checkDouble = function() {
        console.log("check double")
        if(_objGame.secondHand == true) {
            var newsum = _self.solveSum(_arSplitCards);
            if (_arSplitCards.length == 2 && newsum > 8 && newsum < 12){
                console.log("can double")
                return true;
            }
        } else {
            var newsum = _self.solveSum(_arMyCards);
            if (_arMyCards.length == 2 && newsum > 8 && newsum < 12){
                console.log("can double")
                return true;
            }
        }
        return false;
    }

    _self.split = function() {
        console.log("split...");
        var id = _arMyCards[1];
        _arSplitCards.push(id);
        _objGame.arSplit.push(id);
        _arMyCards.splice(1, 1);
        console.log("main: ", _self.getNameCard(_arMyCards[0]), "\nsplit:", _self.getNameCard(_arSplitCards[0]));
        _objGame.profitGame -= _curbet;
        _balance -= _curbet;
        _objGame.secondHandStand = true
        _objGame.secondHand = true

        _self.dealCard(_player);
        _objGame.secondHandStand = false;
        _self.dealCard(_player);
        _objGame.secondHandStand = true
        _objGame.secondHand = true

        _self.checkBlackJack();
    }

    _self.double = function() {
        _objGame.profitGame -= _curbet;
        _balance -= _curbet;
        //наверно не на 2
        _objGame.betGame *= 2;
        _self.dealCard(_player);
        _self.stand();
    }

    _self.solveSum = function(playerMas) {
        var sum = 0;
        for(var i = 0; i < playerMas.length; i++){
            var curCard = Number(_self.getNameCard(playerMas[i])._cardPoint)
            sum += curCard;
        }
        
        for (var i = 0; i < playerMas.length; i++){
            var curCard = Number(_self.getNameCard(playerMas[i])._cardPoint)
            if(sum > 21 && curCard == 11){
                sum -= 10;
            }
        }
        //console.log(sum);
        return sum;
    }

    _self.checkResult = function() {
        if(_objGame.secondHand == true && _objGame.secondHandStand == false){
            var scorePlayer = _self.solveSum(_arSplitCards);
            var myArrLen = _arSplitCards.length;
        } else if (_objGame.secondHand == true) return;
        else{
            var scorePlayer = _self.solveSum(_arMyCards);
            var myArrLen = _arMyCards.length;
        }

        var scoreBankroller = _self.solveSum(_arBankCards);

        console.log(scorePlayer, scoreBankroller);

        if(scoreBankroller == BLACKJACK && _arBankCards.length == 2)
            console.log("bankroller BLACKJACK");

        if(scorePlayer > 21){
            console.log("PLAYER bust") //проиграл
        } else if (scoreBankroller < 17){
            _self.dealCard(_bankroller);
            _self.checkResult();
            return;
        } else if (scoreBankroller > 21) {
            console.log("BANKROLLER BUST") //выиграл
            console.log("PLAYER WIN")
            _objGame.profitGame += _objGame.betGame;
        } else if(scorePlayer == BLACKJACK && myArrLen == 2){
            _objGame.profitGame += _objGame.betGame * 2.5;
            console.log("BLACKJACK") //выиграл
        }
        else if (scorePlayer == scoreBankroller){
            _objGame.profitGame += _objGame.betGame;
            console.log("PUSH")
        }
        else if (scorePlayer > scoreBankroller){
            _objGame.profitGame += _objGame.betGame * 2;
            console.log("WIN") //выиграл
        }else if (scorePlayer < scoreBankroller)
            console.log("LOSE") //проиграл


        if(_objGame.secondHand == true){
            _objGame.secondHand = false;
            _self.checkResult();
        } else
            _self.solveProfit();
    }

    _self.checkBlackJack = function() {
        if(_objGame.secondHand == true){
            var scorePlayer = _self.solveSum(_arSplitCards);
            var myArrLen = _arSplitCards.length;
            if(scorePlayer == BLACKJACK && myArrLen == 2)
                _self.checkResult();
        }
        var scorePlayer2 = _self.solveSum(_arMyCards);
        var myArrLen2 = _arMyCards.length;
        if(scorePlayer2 == BLACKJACK && myArrLen2 == 2)
            _self.checkResult();
    }

    _self.solveProfit = function() {
        // _objGame.betGame = 0;
        console.log(_balance, _curbet, _objGame.profitGame);
        _balance += _curbet;
        _balance += _objGame.profitGame;
        console.log(_balance)
        _objGame.profitGame = 0;
    }

    _self.mixDeck = function(){
        console.log("mix deck");
        _arCards = [];
        // _objResult.mixing = true;
        var count = COUNT_CARDS*COUNT_DECKS;
        var id = 0;
        
        for(var i = 0; i<count; i++){
            _arCards.push(id);
            id ++;
            if(id > COUNT_CARDS-1){
                id = 0;
            }
        }
    }

    _self.dealCard = function(player) {
        var newCard = _self.createNewCard(player);
        
        if(player == _player){
            if (_objGame.secondHand == true && _objGame.secondHandStand == false){
                _arSplitCards.push(newCard);
                _objGame.arSplit.push(newCard);

                if(_self.solveSum(_arSplitCards)>=BLACKJACK && _arSplitCards.length != 2)
                    _self.stand();
                else
                    console.log(_self.solveSum(_arSplitCards), _self.solveSum(_arMyCards),_self.solveSum(_arBankCards));
            } else{
                _arMyCards.push(newCard);
                if(_self.solveSum(_arMyCards)>=BLACKJACK && _arMyCards.length != 2)
                    _self.stand();
                else
                    console.log(_self.solveSum(_arMyCards),_self.solveSum(_arBankCards));
            }
            _self.checkDouble();
        } else 
            _arBankCards.push(newCard); 
    }


    _self.getNameCard = function(cardIndex) {
        var cardType = Math.floor(cardIndex / 4);
        var cardSymbol = String(cardType);
        var cardPoint = cardSymbol;
        var s = cardIndex % 4 + 1;
        var suit = "";
        switch (cardType) {
            case 0:
                cardSymbol = "K";
                cardPoint = 10;
                break;
            case 1:
                cardSymbol = "A";
                cardPoint = 11;
                break;
            case 11:
                cardSymbol = "J";
                cardPoint = 10;
                break;
            case 12:
                cardSymbol = "Q";
                cardPoint = 10;
                break;
        }
        switch (s) {
            case 1:
                suit = "Hearts";
                break;
            case 2:
                suit = "Diamonds";
                break;
            case 3:
                suit = "Spades";
                break;
            case 4:
                suit = "Clubs";
                break;
        }
        
        return {
            _suit:suit,
            _cardSymbol:cardSymbol,
            _cardPoint:cardPoint
        };
    }

    _self.createNewCard = function(player){
        //console.log(_arCards.length, "length cards");

        var rand = _self.getRandomInt(0, _arCards.length);
        var id = _arCards[rand];
        _arCards.splice(rand, 1);
        //console.log(_arCards.length, "length cards");
        
        console.log("new card", _self.getNameCard(id)._suit,_self.getNameCard(id)._cardSymbol, player);
        return id;
    }

    _self.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max)) + min;
    }
    
    _self.closeGame = function(){
        /*
        console.log("count ", _objGame.betGame)
        _objGame.profitGame = _objGame.betGame * 2;
        _balance += _objGame.profitGame;
        _objGame.betGame = 0;
        _objGame.score = 0;
        return {
            objGame     : _objGame,
            balance     : _balance
        }*/
    }

    _self.getGame = function(){
        return _objGame;
    };
    
    _self.balance = function(){
        return _balance;
    };
    
    return _self;
};