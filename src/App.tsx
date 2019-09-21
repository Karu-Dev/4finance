import React from "react";
import moment, { Moment } from "moment";
import "./App.css";
import { connect } from "react-redux";
import { Loan, State } from "./state/types";
import {
  takeLoan,
  setUserInput,
  setAmountInput,
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
      dispatch(setAmountInput(amount));
    },
    setDateInput(date: Moment) {
      dispatch(setDateInput(date));
    }
  };
}
function checkIfValid(user: string, amount: number, date: Moment) {
  let userOk = false;
  let amountOk = false;
  let dateOk = false;
  if (user.match(/[A-z]/g)) {
    userOk = true;
  }
  console.log(`if ${amount}<400 and >10`);
  if (amount <= 400 && amount > 10) {
    amountOk = true;
  }
  if (date.isBetween(moment(), moment().add(30, "d"))) {
    dateOk = true;
  }
  if (dateOk) {
    if (amountOk) {
      if (userOk) {
        return "OK";
      } else {
        return "USER";
      }
    } else {
      return "AMOUNT";
    }
  } else {
    return "DATE";
  }
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
      <table>
        {loans.map((it,id) => (
          <tr key={id}>
            <td>{it.user}</td>
            <td>{(it.amount * 1.1).toFixed(2)} Euro</td>
            <td>due to: {it.date.format("DD MM YYYY")}</td>
          </tr>
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
                alert("Please choose a date from tomorrow to 30 days from today");
                break;
              case "OK":
                takeLoan({ ...inputs, isExtended: false });
            }
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
