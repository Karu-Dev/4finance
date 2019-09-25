import React from "react";
import { State } from "../state/types";
import moment, { Moment } from "moment";
import { connect } from "react-redux";
import {setAmountInput, setDateInput } from "../state/actions";
import { DiscreteSlider } from "./materialComponents/LoanSlider";
import { LoanButton } from "./materialComponents/LoanButton";
import { DatePicker } from "./materialComponents/DatePicker";
import { Grid } from "@material-ui/core";
const stateToProps = (state: State) => {
  return state;
}
const dispatchToProps = (dispatch: any) => {
  return {
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
> = ({ inputs }) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid
          item
          xs={7}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <DiscreteSlider></DiscreteSlider>
        </Grid>
        <Grid item xs={3}>
          <DatePicker></DatePicker>
        </Grid>
        <Grid
          item
          xs={11}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <p>
            You will have to pay back {(inputs.amount * 1.1).toFixed(2)}Eur{" "}
            {moment().isAfter(inputs.date) ? "" : moment().to(inputs.date)}
          </p>
        </Grid>
        <Grid
          item
          xs={11}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <LoanButton></LoanButton>
        </Grid>
      </Grid>
    </div>
  );
};
export const Inputs = connect(
  stateToProps,
  dispatchToProps
)(InputsFC);
