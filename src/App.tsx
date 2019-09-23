import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { State } from "./state/types";
import { Inputs } from "./components/inputs";
import { DisplayLoans } from "./components/displayLoans";
import moment from "moment";
import { Grid } from "@material-ui/core";
function stateToProps(state: State) {
  return state;
}
function dispatchToProps(dispatch: any) {
  return {};
}
const tabOpenTs = new Date();
sessionStorage.setItem("tabOpen", tabOpenTs.getTime().toString());
const AppFC: React.FC<
  ReturnType<typeof stateToProps> & ReturnType<typeof dispatchToProps>
> = () => {
  return (
    <div>
      <img
        width="500"
        height="300"
        src="https://thumbs.gfycat.com/ConcreteLimitedCockerspaniel-size_restricted.gif"
      />
      <Grid container spacing={1}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <DisplayLoans></DisplayLoans>
          <Inputs></Inputs>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
};

export const App = connect(
  stateToProps,
  dispatchToProps
)(AppFC);
