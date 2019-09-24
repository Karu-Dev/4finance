import { reducer } from "./store";
import * as types from "./types";
import * as actions from "./actions";
import moment from "moment";
const initialState: types.State = {
  loans: [],
  inputs: {
    user: "",
    amount: 50,
    date: moment()
      .startOf("day")
      .add(7, "d")
  }
};
const initialTime = moment(new Date())
  .startOf("day")
  .add(7, "d");
const initialTime2 = moment(new Date())
  .startOf("day")
  .add(7, "d");

const stateWithALoan = {
  loans: [
    {
      date: initialTime,
      amount: 100,
      interest: 10,
      isExtended: false
    }
  ],
  inputs: {
    user: "",
    amount: 50,
    date: initialTime2
  }
};
describe("Redux reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {} as actions.ActionType)).toEqual(initialState);
  });
  it("should be able to add a loan", () => {
    const loan: types.Loan = {
      date: moment(),
      amount: 100,
      interest: 10,
      isExtended: false
    };
    expect(
      reducer(initialState, {
        type: "TAKELOAN",
        payload: loan
      })
    ).toEqual({
      loans: [loan],
      inputs: {
        user: "",
        amount: 50,
        date: moment()
          .startOf("day")
          .add(7, "d")
      }
    });
  });
  it("should be able to change the inputs", () => {
    expect(reducer(initialState, actions.setAmountInput(100))).toEqual({
      loans: [],
      inputs: {
        user: "",
        amount: 100,
        date: moment()
          .startOf("day")
          .add(7, "d")
      }
    });
    const date = moment(new Date());
    expect(reducer(initialState, actions.setDateInput(date))).toEqual({
      loans: [],
      inputs: {
        user: "",
        amount: 50,
        date
      }
    });
  });
  it("should be able to extend a loan", () => {
    const newTime = new Date(initialTime2.format());
    const itNewTime = new Date(initialTime.format());
    const itDate = moment(itNewTime);
    itDate.add(7, "d");
    expect(reducer(stateWithALoan, actions.extendLoan(0))).toEqual({
      loans: [
        {
          date: itDate,
          amount: 100,
          interest: 15,
          isExtended: true
        }
      ],
      inputs: {
        user: "",
        amount: 50,
        date: moment(newTime)
      }
    });
  });
});
