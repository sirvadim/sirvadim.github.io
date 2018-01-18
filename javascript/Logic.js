export default class Logic {
	constructor(){
		let dataPrize = [];
		let dataPowerPlay = [];
		let arWhiteBalls = [];
		let dataTickets = [];
		let redBalls = 0;
		let totalTicket = 1000;
		let priceTicket = 2;
		let gotMoney = 0;
		let paidMoney = 0;

		function init() {
			console.log("init");
			
			dataPrize["5_1"] = "jackpot"; // 1/292,201,338.00
			dataPrize["5_0"] = 1000000; // 1/11,688,053.52
			dataPrize["4_1"] = 50000; // 1/913,129.18
			dataPrize["4_0"] = 100; // 1/36,525.17
			dataPrize["3_1"] = 100; // 1/14,494.11
			dataPrize["3_0"] = 7; // 1/579.76
			dataPrize["2_1"] = 7; // 1/701.33
			dataPrize["1_1"] = 4; // 1/91.98
			dataPrize["0_1"] = 4; // 1/38.32
			dataPowerPlay[0] = 1;
			dataPowerPlay[1] = 2;
			dataPowerPlay[2] = 3;
			dataPowerPlay[3] = 4;
			dataPowerPlay[4] = 5;
			dataPowerPlay[5] = 10;
			
			redBalls = getBalls(arWhiteBalls);
			console.log("casinoBalls:", arWhiteBalls, redBalls);
			setTicket(totalTicket);
			checkResult();
			showWinners();
		}

		init();

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
				let pp = Math.round(Math.random()*5); //power play
				let price = priceTicket + pp;
				rb = getBalls(ar);
				dataTickets.push({ar:ar, rb:rb, pp:pp, white:0, red:0, res:""});
				gotMoney += price;
				// console.log("ticketBalls:", ar, rb);
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
				// if(obj.white == 4 && obj.red == 1){
					// count++;
				// }
			}
			// console.log("count 4:", count);
		}

		function showWinners() {
			let countWinners = 0;
			for (let i = 0; i < dataTickets.length; i++) {
				let obj = dataTickets[i];
				let prize = dataPrize[obj.res];
				if(prize){
					countWinners ++;
					if(prize == "jackpot"){
						console.log("jackpot");
					} else {
						let coef = dataPowerPlay[obj.pp];
						paidMoney += prize*coef;
					}
				}
			}
			
			console.log("countWinners:", String(countWinners)+"/"+String(totalTicket));
			console.log("gotMoney:", gotMoney);
			console.log("paidMoney:", paidMoney);
		}

	}
}