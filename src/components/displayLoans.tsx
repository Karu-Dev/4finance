import React from "react";
import { State } from "../state/types";
import { connect } from "react-redux";
import { extendLoan } from "../state/actions";
import { Typography, Paper, Button } from "@material-ui/core";
function stateToProps(state: State) {
  return state;
}
function dispatchToProps(dispatch: any) {
  return {
    extendLoan(id: number) {
      dispatch(extendLoan(id));
    }
  };
}
export const DisplayLoansFC: React.FC<
  ReturnType<typeof stateToProps> & ReturnType<typeof dispatchToProps>
> = ({ loans, extendLoan }) => {
  return (
    <div>
      {loans.map((it, id) => (
        <Paper
          style={{
            textAlign: "center",
            color: "white",
            backgroundColor: "rgba(48, 32, 17, 0.3)"
          }}
        >
          <Typography variant="h5" component="h3">
            {(it.amount + it.interest).toFixed(2)} Euro{" "}
            {it.isExtended ? (
              ""
            ) : (
              <Button
                color="secondary"
                variant="outlined"
                onClick={e => {
                  extendLoan(id);
                  e.preventDefault();
                }}
              >
                Extend
              </Button>
            )}
          </Typography>
          <Typography component="p">
            due to: {it.date.format("DD MM YYYY")}
          </Typography>
        </Paper>
      ))}
    </div>
  );
};
export const DisplayLoans = connect(
  stateToProps,
  dispatchToProps
)(DisplayLoansFC);
