import { createStore } from "redux";
import { State, Loan } from "./types";
import { ActionType } from "./actions";
import moment from "moment";
const initialState: State = {
  loans: [],
  inputs: { user: "", amount: 0, date: moment() }
};
function reducer(state: any = initialState, action: ActionType) {
  if (action.type === "TAKELOAN") {
    const user = action.payload.user;
    const amount = action.payload.amount;
    const date = action.payload.date;
    const interest = action.payload.interest;
    return {
      ...state,
      loans: [
        ...state.loans,
        { user, date, amount, isExtended: false, interest }
      ]
    };
  }
  if (action.type === "SETUSERINPUT") {
    return { ...state, inputs: { ...state.inputs, user: action.payload } };
  }
  if (action.type === "SETAMOUNTINPUT") {
    return { ...state, inputs: { ...state.inputs, amount: action.payload } };
  }
  if (action.type === "SETDATEINPUT") {
    return { ...state, inputs: { ...state.inputs, date: action.payload } };
  }
  if (action.type === "EXTENDLOAN") {
    state.loans.map((it: Loan, id: number) => {
      if (id === action.payload && !it.isExtended) {
        it.interest = parseFloat((it.interest * 1.5).toFixed(2));
        it.date.add(7, "d");
        it.isExtended = true;
      }
    });
    return { ...state, loans: [...state.loans] };
  }
  return state;
}

export const store = createStore(reducer);
