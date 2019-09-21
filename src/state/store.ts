import { createStore } from "redux";
import { State } from "./types";
import { ActionType } from "./actions";
import moment from "moment";
const initialState: State = {
  loans: [],
  inputs: { user: "", amount: 0, date: moment() }
};
function reducer(state: any = initialState, action: ActionType) {
  if (action.type === "TAKELOAN") {
    const user = state.inputs.user;
    const amount = state.inputs.amount;
    const date = state.inputs.date;
    return {
      ...state,
      loans: [...state.loans, { user, date, amount, isExtended: false }]
    };
  }
  if (action.type === "SETUSERINPUT") {
    return { ...state, inputs: { ...state.inputs, user: action.payload } };
  }
  if (action.type === "SETAMOUNTINPUT") {
    return { ...state, inputs: { ...state.inputs, amount: action.payload } };
  }
  if (action.type === "SETDATEINPUT") {
    console.log(state.inputs.date);
    return { ...state, inputs: { ...state.inputs, date: action.payload } };
  }
  return state;
}

export const store = createStore(reducer);
