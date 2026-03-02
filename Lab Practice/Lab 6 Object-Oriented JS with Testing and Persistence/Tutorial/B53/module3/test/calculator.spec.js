import Calculator from "../js/calculator.js";
import { expect } from "chai";

describe("Test Calculator", () => {

    it("Answer to be equal 1", () => {
        const calc = new Calculator()

        const answer = calc.add(2, 3)
        expect(answer).to.equal(5);
    })

});

