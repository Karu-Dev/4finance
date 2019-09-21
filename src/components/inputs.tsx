import React from "react";
import { State } from "../state/types";
import moment, { Moment } from "moment";
import { connect } from "react-redux";
import { setUserInput, setAmountInput, setDateInput } from "../state/actions";
import { DiscreteSlider } from "./materialComponents/LoanSlider";
import { LoanButton } from "./materialComponents/LoanButton";
import { DatePicker } from "./materialComponents/DatePicker";
function stateToProps(state: State) {
  return state;
}
function dispatchToProps(dispatch: any) {
  return {
    setUserInput(user: string) {
      console.log("lol");
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

export const InputsFC: React.FC<
  ReturnType<typeof stateToProps> & ReturnType<typeof dispatchToProps>
> = ({ inputs, setUserInput }) => {
  return (
    <form>
      <DiscreteSlider></DiscreteSlider>
      <input
        type="text"
        value={inputs.user}
        onChange={target => {
          setUserInput(target.target.value);
        }}
      />
      <DatePicker></DatePicker>
      <span>
        You will have to pay back {(inputs.amount * 1.1).toFixed(2)}Eur{" "}
        {moment().isAfter(inputs.date) ? "" : moment().to(inputs.date)}
      </span>
      <LoanButton></LoanButton>
    </form>
  );
};
export const Inputs = connect(
  stateToProps,
  dispatchToProps
)(InputsFC);
