const assert = chai.assert
const expect = chai.expect
// const should = chai.should()

class Person {
    c(a, b) {
        return a + b
    }
}

const person = new Person()

describe('1', function () {
    
    describe('block1', () => {
        let sandbox

        beforeEach(function () {
            sandbox = sinon.sandbox.create()
        })
    
        afterEach(function () {
            sandbox.restore()
        })

        it('2', function () {
            // Arrange
            const a = 1
            const b = 2
            const x = sandbox.stub(person, 'c')

            // Act
            x.withArgs(4, 5).returns(3)

            // Assert
            expect(x(4,5)).to.be.equal(3)
        })
    })
})