
import { expect } from "chai";
import { Transaction, Account, SavingsAccount } from "../js/transaction.js";
describe("Transaction", () => {

    it("should set all properties from constructor", () => {
        const t = new Transaction("Salary", 8000, "income", "Salary");
        expect(t.description).to.equal("Salary");
        expect(t.amount).to.equal(8000);
        expect(t.type).to.equal("income");
        expect(t.category).to.equal("Salary");
    });

    it("should format income with + sign", () => {
        const t = new Transaction("Salary", 8000, "income", "Salary");
        expect(t.format()).to.equal("+8,000 QAR");
    });

    it("should format expense with - sign", () => {
        const t = new Transaction("Rent", 3500, "expense", "Housing");
        expect(t.format()).to.equal("-3,500 QAR");
    });

    it("should correctly identify transaction type", () => {
        const income = new Transaction("Salary", 8000, "income", "Salary");
        const expense = new Transaction("Rent", 3500, "expense", "Housing");
        expect(income.isIncome()).to.equal(true);
        expect(income.isExpense()).to.equal(false);
        expect(expense.isExpense()).to.equal(true);
        expect(expense.isIncome()).to.equal(false);
    });
});


describe("Account", () => {

    it("should increase balance after deposit", () => {
        const acc = new Account("Test", "checking", 1000);
        acc.deposit(500);
        expect(acc.balance).to.equal(1500);
    });

    it("should decrease balance after withdraw", () => {
        const acc = new Account("Test", "checking", 1000);
        acc.withdraw(300);
        expect(acc.balance).to.equal(700);
    });

    it("should return false when withdrawing more than balance", () => {
        const acc = new Account("Test", "checking", 1000);
        const result = acc.withdraw(5000);
        expect(result).to.equal(false);
        expect(acc.balance).to.equal(1000);
    });

    it("should return formatted balance string", () => {
        const acc = new Account("Test", "checking", 15000);
        expect(acc.getBalance()).to.equal("15,000 QAR");
    });
});


describe("SavingsAccount", () => {

    it("should have type set to savings", () => {
        const sa = new SavingsAccount("Fund", 10000, 0.05);
        expect(sa.type).to.equal("savings");
    });

    it("should inherit deposit from Account", () => {
        const sa = new SavingsAccount("Fund", 10000, 0.05);
        sa.deposit(5000);
        expect(sa.balance).to.equal(15000);
    });

    it("should calculate and add profit correctly", () => {
        const sa = new SavingsAccount("Fund", 10000, 0.05);
        const profit = sa.applyProfit();
        expect(profit).to.equal(500);
        expect(sa.balance).to.equal(10500);
    });
});
