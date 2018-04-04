var lotteryLogic = function(){
	let dataPrize = [];
	let arWhiteBalls = [];
	let dataTickets = [];
	let dataWinners = [];
	let redBalls = 0;
	let totalTicket = 1000000;
	let priceTicket = 2;
	let pricePowerplay = 1;
	let gotMoney = 0;
	let paidMoney = 0;
	let bankStart = 0;
	let bankEnd = 0;
	let jackpot = 40000000;
	let idGame = 0;
	let countWinners = 0;
	let countGame = 10;
	let multiplier = 10;
	let prcntPrize = 48;
	let prctnJackpot = 80;
	let prcntPP = 50;
	let bankSave = true;
	var _self = this;

	function init() {
		console.log("totalTicket=" + totalTicket +
		", countGame=" + countGame + 
		", prcntPrize=" + prcntPrize + " %" + 
		", prcntPowerplay=" + prcntPP + " %" + 
		", multyplier="+multiplier);
		
		dataPrize["5_1"] = jackpot;
		dataPrize["5_0"] = 1000000;
		dataPrize["4_1"] = 50000;
		dataPrize["4_0"] = 100;
		dataPrize["3_1"] = 100;
		dataPrize["3_0"] = 7;
		dataPrize["2_1"] = 7;
		dataPrize["1_1"] = 4;
		dataPrize["0_1"] = 4;

		for (let i = 0; i < countGame; i ++) {
			game();
		}
	}

	init();

	function game() {
		idGame ++;
		arWhiteBalls = [];
		dataTickets = [];
		dataWinners = [];
		gotMoney = 0;
		paidMoney = 0;

		dataWinners["5_1"] = 0;
		dataWinners["5_0"] = 0;
		dataWinners["4_1"] = 0;
		dataWinners["4_0"] = 0;
		dataWinners["3_1"] = 0;
		dataWinners["3_0"] = 0;
		dataWinners["2_1"] = 0;
		dataWinners["1_1"] = 0;
		dataWinners["0_1"] = 0;

		if(!bankSave){
			bankStart = 0;
			bankEnd = 0;
		}
		countWinners = 0;
		redBalls = getBalls(arWhiteBalls);
		//console.log("casinoBalls:", arWhiteBalls, redBalls);
		setTicket(totalTicket);
		checkResult();
		showWinners();
		updateJackpot();
		return jackpot;
	}
	
	function getBalls(ar) {
		let rnd = 0;
		let count = 5;
		
		while (count > 0) {
			rnd = Math.ceil(Math.random()*69);
			if(ar.indexOf(rnd) == -1){
				ar.push(rnd);
				count --;
			}
		}
		
		return Math.ceil(Math.random()*26);
	}

	function setTicket(value) {
		for (let i = 0; i < value; i++) {
			let ar = []; // white balls
			let rb = 0; // red ball
			let pp = 0; //power play
			if(Math.round(Math.random()*100) < prcntPP){
				pp = pricePowerplay;
			}
			let price = priceTicket + pp;
			rb = getBalls(ar);
			dataTickets.push({ar:ar, rb:rb, pp:pp, white:0, red:0, res:""});
			// console.log("TicketUser:", i, ar, rb);
			gotMoney += price;
			bankStart += price*prcntPrize/100;
		}
	}

	function checkResult() {
		let count = 0;
		for (let i = 0; i < dataTickets.length; i++) {
			let obj = dataTickets[i];
			for (let j = 0; j < arWhiteBalls.length; j++) {
				if(obj.ar.indexOf(arWhiteBalls[j]) > -1){
					obj.white ++;
				}
			}
			if(obj.rb == redBalls){
				obj.red = 1;
			}
			obj.res = String(obj.white) + "_" + String(obj.red);
		}
	}

	function showWinners() {
		for (let i = 0; i < dataTickets.length; i++) {
			let obj = dataTickets[i];
			let prize = dataPrize[obj.res];
			if(prize){
				countWinners ++;
				if(obj.res == "5_1"){
					console.log("!!! JACKPOT !!!");
					jackpot = 0;
				} else if(obj.res == "5_0"){
					console.log("Match 5: powerplay = ", obj.pp);
					let coef = 1;
					if(obj.pp){
						coef = 2;
					}
					paidMoney += prize*coef;
				} else {
					let coef = 1;
					if(obj.pp){
						coef = multiplier;
					}
					paidMoney += prize*coef;
				}
				dataWinners[obj.res]++;
			}
		}
		//console.log("--------------------- idGame:", idGame);
		//console.log("countWinners:", String(countWinners)+"/"+String(totalTicket));
		//console.log("gotMoney:", gotMoney);
		//console.log("paidMoney:", paidMoney);
		//console.log("paidMoney:", ((paidMoney/gotMoney)*100).toFixed(2) + "%");
	}
	
	function updateJackpot() {
		let profit = bankStart - paidMoney;
		if(profit > 0){
			jackpot += Math.floor(prctnJackpot/100*profit); // 60% profit to jackpot
		}
		
		//console.log("jackpot:", (jackpot/1000000).toFixed(2) + " million");

		console.log("Game: " + idGame + 
		", gotMoney=" + (gotMoney/1000000).toFixed(2) + " mln" +
		", bank=" + (bankStart/1000000).toFixed(2) + " mln" +
		", paidMoney=" + (paidMoney/1000000).toFixed(2) + " mln" +
		", profit=" + (profit/1000000).toFixed(2) + " mln" +
		", winners=" + (countWinners/totalTicket*100).toFixed(2) + " %" +
		", paid=" + ((paidMoney/bankStart)*100).toFixed(2) + " %" + 
		", jackpot=" + (jackpot/1000000).toFixed(2) + " mln");
		for(var value in dataWinners) {
			console.log("winners:", value, dataWinners[value]);
		}
		if(profit < 0){
			console.log("!!!Profit < 0!!! wrong mathematics");
		}
		if(bankSave){
			bankStart = profit;
		}
	}
}