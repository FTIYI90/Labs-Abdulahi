import Calculator from "..//js/practice.js";
import { expect } from "chai";

describe("Test the Calculator Class", () => {


    describe("Testing the Add Method", () => {
        it("Adding 2 and 3 should be 5", () => {
            const calc = new Calculator()
            const result = calc.add(2, 3)

            expect(result).to.be.equal(5)

        })
        it("Adding -2 and -3 should be -5", () => {
            const calc = new Calculator()
            const result = calc.add(-2, -3)

            expect(result).to.be.equal(-5)
        })
    })
    describe("Testing the Sub Method", () => {
        it("Sub 2 and 3 should be -1", () => {
            const calc = new Calculator()
            const result = calc.sub(2, 3)

            expect(result).to.be.equal(-1)

        })
        it("Sub -2 and -3 should be 1", () => {
            const calc = new Calculator()
            const result = calc.sub(-2, -3)

            expect(result).to.be.equal(1)
        })
    })
})