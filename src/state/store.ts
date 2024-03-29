import { createStore } from "redux";
import { State, Loan } from "./types";
import { ActionType } from "./actions";
import moment from "moment";
const initialState: State = {
  loans: [],
  inputs: { user: "", amount: 50, date: moment().startOf("day").add(7, "d") }
};
export function reducer(state: any = initialState, action: ActionType) {
  if (action.type === "TAKELOAN") {
    const amount = action.payload.amount;
    const date = action.payload.date;
    const interest = action.payload.interest;
    return {
      ...state,
      loans: [...state.loans, { date, amount, isExtended: false, interest }]
    };
  }
  if (action.type === "SETAMOUNTINPUT") {
    return { ...state, inputs: { ...state.inputs, amount: action.payload } };
  }
  if (action.type === "SETDATEINPUT") {
    return { ...state, inputs: { ...state.inputs, date: action.payload } };
  }
  if (action.type === "EXTENDLOAN") {
    state.loans.map((it: Loan, id: number) => {
      const newTime = new Date(state.inputs.date.format());
      if (id === action.payload && !it.isExtended) {
        it.interest = parseFloat((it.interest * 1.5).toFixed(2));
        const itNewTime = new Date(it.date.format());
        it.date = moment(itNewTime);
        it.date.add(7, "d");
        it.isExtended = true;
        state.inputs.date = moment(newTime);
        return { ...state };
      }
      return { ...state };
    });
    return { ...state, loans: [...state.loans] };
  }
  return state;
}

export const store = createStore(reducer);
