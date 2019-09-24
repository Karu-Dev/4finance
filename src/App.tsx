import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { State } from "./state/types";
import { Inputs } from "./components/inputs";
import { DisplayLoans } from "./components/displayLoans";
import moment from "moment";
import { Grid, Typography } from "@material-ui/core";
import Navigation from "./components/materialComponents/Navigation";
import TabSelection from "./components/materialComponents/Tabs";
import WhyUs from "./components/materialComponents/InfoAccordion";
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
      <Navigation></Navigation>
      <Grid container spacing={1}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={5}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <WhyUs></WhyUs>
            </Grid>
            <Grid item xs={7}>
              <TabSelection></TabSelection>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
};

export const App = connect(
  stateToProps,
  dispatchToProps
)(AppFC);
