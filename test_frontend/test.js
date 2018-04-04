const assert = chai.assert
const expect = chai.expect
//const should = chai.should()

class Person {
    createAccount() {
        return {
            address: "0x6f980C54C32f700EF7a897196dAdd86F81b1C375", 
            privateKey: "0xc24f81749e7e5de7646a0462847ab01cc498546a3165f5f540478a3eae652ce0", 
            balance: {
                bet: 5, 
                eth: 1
            }, 
            link: "https://ropsten.etherscan.io/address/0x6f980C54C32f700EF7a897196dAdd86F81b1C375"
        };
    }
}

const person = new Person()

describe('Loterry', function () {
    let objAccount;
    describe('Init Account', function () {
        it('Create account', function () {
            // Act
            objAccount = person.createAccount();

            // Act

            // Assert
            assert.isObject(objAccount);
        });

        it('Check balance', function () {
            // Arrange
            const minEth = 0.2;
            const minBet = 0.1;
            const userEth = objAccount.balance.eth;
            const userBet = objAccount.balance.bet;
      
            // Assert
            expect(userEth).to.be.least(minEth);
            expect(userBet).to.be.least(minBet);
        });
    });

    describe('Approve Account', function () {
        it('Approve', function () {
            // todo approve
        });
    });

    describe('Buy Ticket', function () {
        it('Select tickets', function () {
           // Выбрать количество билетов
        });
        it('Fill out tickets', function () {
            // Зполнить билеты числами
        });
        it('Check tickets', function () {
            // Проверить что билеты заполнены нужным количествои чисел 
            // в нужном диапозоне
        });
    });
    describe('Check Tickets', function () {
        it('Ticket is win', function () {
            // Проверить билеты на выигрыш
        });
    });
    describe('Get Reward', function () {
        it('My rewards', function () {
            // Забрать награду за выигрышные билеты
        });
    });
});