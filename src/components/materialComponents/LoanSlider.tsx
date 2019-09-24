import React from "react";
import { State } from "../../state/types";
import { setAmountInput } from "../../state/actions";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
const stateToProps = (state: State) => {
  return state;
}
const dispatchToProps = (dispatch: any) => {
  return {
    setAmountInput(amount: number) {
      dispatch(setAmountInput(amount));
    }
  };
}
const useStyles = makeStyles(theme => ({
  root: {
    width: 300
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const marks = [
  {
    value: 50,
    label: "50 Eur"
  },
  {
    value: 200,
    label: "200 Eur"
  },
  {
    value: 300,
    label: "300 Eur"
  },
  {
    value: 400,
    label: "400 Eur"
  }
];

export const DiscreteSliderFC: React.FC<
  ReturnType<typeof stateToProps> & ReturnType<typeof dispatchToProps>
> = ({ inputs, setAmountInput }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ display: "flex" }}>
        <Grid item xs={9}>
          <Typography id="discrete-slider" gutterBottom>
            Cik vēlies saņemt?
          </Typography>
          <Slider
            defaultValue={50}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={10}
            marks={marks}
            min={50}
            max={400}
            value={inputs.amount}
            onChange={(e, val) => {
              setAmountInput(+val);
            }}
          />
        </Grid>
        <Grid item xs={3} style={{ margin:"30px 0 0 0" }}>
          <input
            style={{ width: "30px" }}
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
        </Grid>
      </Grid>
    </div>
  );
};
export const DiscreteSlider = connect(
  stateToProps,
  dispatchToProps
)(DiscreteSliderFC);
