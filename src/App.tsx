import React, { Dispatch } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Loan, State } from "./state/types";
import {
  takeLoan,
  setUserInput,
  setAmmountInput,
  setDateInput
} from "./state/actions";
function stateToProps(state: State) {
  return state;
}
function dispatchToProps(dispatch: any) {
  return {
    takeLoan(loan: Loan) {
      dispatch(takeLoan(loan));
    },
    setUserInput(user: string) {
      dispatch(setUserInput(user));
    },
    setAmountInput(amount: number) {
      dispatch(setAmmountInput(amount));
    },
    setDateInput(date: Date) {
      dispatch(setDateInput(date));
    }
  };
}
const AppFC: React.FC<
  ReturnType<typeof stateToProps> & ReturnType<typeof dispatchToProps>
> = ({
  inputs,
  loans,
  takeLoan,
  setUserInput,
  setAmountInput,
  setDateInput
}) => {
  return (
    <div>
      <img
        width="500"
        height="300"
        src="https://thumbs.gfycat.com/ConcreteLimitedCockerspaniel-size_restricted.gif"
      />
      <table style={{ border: "1px black solid" }}>
        {loans.map(it => (
          <tr>{it.user}</tr>
        ))}
      </table>
      <form>
        <input
          type="text"
          value={inputs.user}
          onChange={target => {
            setUserInput(target.target.value);
          }}
        />
        <input
          type="date"
          onChange={target => {
            const lol = new Date(target.target.value);
            console.log(lol.getMonth());
          }}
        ></input>
        <button
          onClick={e => {
            e.preventDefault();
            takeLoan({ ...inputs, isExtended: false });
          }}
        >
          Take Loan
        </button>
      </form>
    </div>
  );
};

export const App = connect(
  stateToProps,
  dispatchToProps
)(AppFC);
