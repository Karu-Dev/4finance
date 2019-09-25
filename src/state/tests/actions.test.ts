import * as actions from "../actions";
import * as types from "../types";
import moment from "moment";
describe("actions", () => {
  it("should create an action to take a loan", () => {
    const loan: types.Loan = {
      date: moment(),
      amount: 100,
      interest: 10,
      isExtended: false
    };
    const expected = {
      type: "TAKELOAN",
      payload: loan
    };
    expect(actions.takeLoan(loan)).toEqual(expected);
  });
  it("should create an action to change amount input", () => {
    const amount = 100;
    const expected = {
      type: "SETAMOUNTINPUT",
      payload: 100
    };
    expect(actions.setAmountInput(amount)).toEqual(expected);
  });
  it("should create an action to change date", () => {
    const date = moment(new Date());
    const expected = {
      type: "SETDATEINPUT",
      payload: date
    };
    expect(actions.setDateInput(date)).toEqual(expected);
  });
  it("should create an action to extend loan", () => {
    const number = 10;
    const expected = {
      type: "EXTENDLOAN",
      payload: number
    };
    expect(actions.extendLoan(number)).toEqual(expected);
  });
});
