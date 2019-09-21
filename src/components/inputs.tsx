import React from "react";
import { State, Loan } from "../state/types";
import moment, {Moment} from "moment"
import { connect } from "react-redux";
import {checkIfValid} from "../functions/inputValidation"
import {takeLoan,setUserInput,setAmountInput,setDateInput} from "../state/actions"
function stateToProps(state: State) {
  return state;
}
function dispatchToProps(dispatch: any) {
  return {
    takeLoan(loan: Loan) {
      dispatch(takeLoan(loan));
    },
    setUserInput(user: string) {
      console.log("lol");
      dispatch(setUserInput(user));
    },
    setAmountInput(amount: number) {
      dispatch(setAmountInput(amount));
    },
    setDateInput(date: Moment) {
      dispatch(setDateInput(date));
    },
  };
}

export const InputsFC: React.FC<ReturnType<typeof stateToProps>&ReturnType<typeof dispatchToProps>> = ({inputs, loans, takeLoan, setUserInput,setAmountInput,setDateInput}) => {
  return (
    <form>
        <input
          type="text"
          value={inputs.user}
          onChange={target => {
            setUserInput(target.target.value);
          }}
        />
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          required
          value={inputs.amount}
          onChange={target => {
            if (!isNaN(+target.target.value)) {
              setAmountInput(+target.target.value);
            }
          }}
        ></input>
        <input
          type="date"
          onChange={target => {
            const time = moment(target.target.value, "YYYY-MM-DD");
            setDateInput(time);
          }}
        ></input>
        <span>
          You will have to pay back {(inputs.amount * 1.1).toFixed(2)}Eur{" "}
          {moment().isAfter(inputs.date) ? "" : moment().to(inputs.date)}
        </span>
        <button
          onClick={e => {
            e.preventDefault();
            switch (checkIfValid(inputs.user, inputs.amount, inputs.date)) {
              case "USER":
                alert("User not valid");
                break;
              case "AMOUNT":
                alert(
                  "Please choose an amount greater than 10 Eur and not greater than 400 Eur"
                );
                break;
              case "DATE":
                alert(
                  "Please choose a date from tomorrow to 30 days from today"
                );
                break;
              case "OK":
                takeLoan({
                  ...inputs,
                  amount: inputs.amount,
                  interest: parseFloat((inputs.amount / 10).toFixed(2)),
                  isExtended: false
                });
            }
          }}
        >
          Take Loan
        </button>
      </form>
  );
}
export const Inputs = connect(
  stateToProps,
  dispatchToProps
)(InputsFC);
