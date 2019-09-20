import { createStore } from "redux";
import { Loan, State } from "./types";
import { ActionType } from "./actions";
const initialState: State = {
  loans: [],
  inputs: { user: "", amount: 0, date: new Date() }
};
function reducer(state: any = initialState, action: ActionType) {
  if (action.type === "TAKELOAN") {
    const user = state.inputs.user;
    const amount = state.inputs.amount
    const returnDate = state.inputs.date
    return {
      ...state,
      loans: [...state.loans, { user, returnDate, amount, isExtended: false }]
    };
  }
  if (action.type === "SETUSERINPUT") {
    console.log("lol");
    return { ...state, inputs: { ...state.inputs, user: action.payload } };
  }
  if (action.type === "SETAMOUNTINPUT") {
    return { ...state, amount: action.payload };
  }
  if (action.type === "SETDATEINPUT") {
    return { ...state, returnDate: action.payload };
  }
  return state;
}

export const store = createStore(reducer);
