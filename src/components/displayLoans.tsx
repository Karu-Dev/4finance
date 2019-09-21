import React from "react";
import { State } from "../state/types";
import { connect } from "react-redux";
import { extendLoan } from "../state/actions";
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
    <table>
      {loans.map((it, id) => (
        <tr key={id}>
          <td>{it.user}</td>
          <td>{(it.amount + it.interest).toFixed(2)} Euro</td>
          <td>due to: {it.date.format("DD MM YYYY")}</td>
          <button
            onClick={e => {
              console.log(it.interest);
              extendLoan(id);
              e.preventDefault();
            }}
          >
            Extend
          </button>
        </tr>
      ))}
    </table>
  );
};
export const DisplayLoans = connect(
  stateToProps,
  dispatchToProps
)(DisplayLoansFC);
