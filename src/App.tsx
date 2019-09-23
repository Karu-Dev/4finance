import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { State } from "./state/types";
import { Inputs } from "./components/inputs";
import { DisplayLoans } from "./components/displayLoans";
import moment from "moment";
function stateToProps(state: State) {
  return state;
}
function dispatchToProps(dispatch: any) {
  return {}
}
const tabOpenTs = new Date()
sessionStorage.setItem("tabOpen", tabOpenTs.getTime().toString())
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
      <DisplayLoans></DisplayLoans>
      <Inputs></Inputs>
    </div>
  );
};

export const App = connect(
  stateToProps,
  dispatchToProps
)(AppFC);
