const assert = chai.assert
const expect = chai.expect

let contract_address = ""
let arrTickets, num;
const lengthInTicket = 6
let pp = 0
let result = 0

describe('Loterry', function () {
    let objAccount;

    describe('Init Account', function () {
        it('Create account', async function () {
            objAccount = await MainJS.initAccount();
        });
        
        it('Check balance', async function () {
            const minEth = 0.2;
            const minBet = 0.1;            
            
            let userEth, userBet
            await MainJS.getEthBalance().then(ETH => userEth = ETH);
            await MainJS.getBetBalance().then(BET => userBet = BET);
            console.log("Eth:", minEth, userEth, userEth >= minEth)
            console.log("Bet:", minBet, userBet, userBet >= minBet)

            expect(userEth).to.be.least(minEth);
            expect(userBet).to.be.least(minBet);
        });
    });

    describe('Approve Account', function () {
        it('Approve 0', async function () {
            const allowance        = 0
            contract_address = MainJS.returnAddressLottery()

            this.timeout(100000)
            await MainJS.ERC20approve(contract_address, allowance)
             .catch(error => {
                if(error)
                    console.error(error)
             })

            await MainJS.allowance()
             .then(res => {
                assert.equal(allowance, res, 'allowance error') 
             })
             .catch(error => {
                if(error)
                    console.error(error)
             })
        });
        it('Approve 4 bet', async function () {
            const allowance        = 40 * 10 ** 18
            contract_address = MainJS.returnAddressLottery()

            this.timeout(100000)
            await MainJS.ERC20approve(contract_address, allowance)
             .catch(error => {
                if(error)
                    console.error(error)
             })

            await MainJS.allowance()
             .then(res => {
                assert.equal(allowance/10**18, res, 'allowance error') 
             })
             .catch(error => {
                if(error)
                    console.error(error)
             })
             
        });
    });

    describe('Check tickets', async function () {

        before('generate tickets',function() {
            num = MainJS.select_rnd_tickets()
            arrTickets = MainJS.fill_tickets(num)
        })

        it('isArray', function () {
            assert(Array.isArray(arrTickets), 'is array');
        });

        it('length tickets array', function () {
            assert.equal(arrTickets.length, num * lengthInTicket, 'invalid length in tickets')
        });

        it('diapason nums', function () {
            for (let i = 0; i < arrTickets.length; i ++ ) {
                let bool = false
                if (i % 6 == 5) {
                    if(arrTickets[i] > 0 && arrTickets[i] <= 26)
                        bool = true
                } else {
                    if(arrTickets[i] > 0 && arrTickets[i] <= 69)
                        bool = true
                }
                assert.isOk(bool,'invalid num!')
            }
        });

        it('diapason powerplay', function () {
            let ppNum = pp
            let bool = false
            if(ppNum == 0 || ppNum == 1)
                bool = true
            assert.isOk(bool,'invalid pp num!')
        });            

        it('Buy tickets', async function () {
            this.timeout(100000)
            await MainJS.buy_tickets()
             .catch(error => {
                if(error)
                    console.error(error)
             })
        });
    });

    describe.skip('get reward', function () {
        it('check my tickets', async function () {
            await MainJS.checkMyTicket()
             .then(res => result = res)
             .catch(error => {
                if(error)
                    console.error(error)
             })
            console.log(result);
        });

        it('get reward', async function () {
            console.log("result:", result);
            if(result > 0) {
                this.timeout(100000)
                await MainJS.getReward()
                 .catch(error => {
                    if(error)
                        console.error(error)
                 })
            }
        });
    })
});