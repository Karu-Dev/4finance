import React from "react";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import moment,{ Moment } from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { State } from "../../state/types";
import { setDateInput } from "../../state/actions";
import { connect } from "react-redux";
function stateToProps(state: State) {
  return state;
}
function dispatchToProps(dispatch: any) {
  return {
    setDateInput(date: Moment) {
      dispatch(setDateInput(date));
    }
  };
}
const DatePickerFC: React.FC<
  ReturnType<typeof stateToProps> & ReturnType<typeof dispatchToProps>
> = ({ inputs, setDateInput }) => {
  // The first commit of Material-UI
  function handleDateChange(date: Moment | null) {
    if (date) {
        const newTime = new Date(date.format())
      setDateInput(moment(newTime));
    }
  }

  return (
   <div className="DatePicker">
      <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container justify="flex-start">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="DD/MM/YYYY"
          margin="none"
          id="date-picker-inline"
          label="Select a return date"
          value={inputs.date}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
   </div>
  );
};
export const DatePicker = connect(
  stateToProps,
  dispatchToProps
)(DatePickerFC);
