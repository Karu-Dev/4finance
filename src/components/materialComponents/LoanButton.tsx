import React, { SyntheticEvent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { Loan, State } from "../../state/types";
import { takeLoan } from "../../state/actions";
import { connect } from "react-redux";
import { checkIfValid } from "../../functions/inputValidation";
function stateToProps(state: State) {
  return state;
}
function dispatchToProps(dispatch: any) {
  return {
    takeLoan(loan: Loan) {
      dispatch(takeLoan(loan));
    }
  };
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5)
    }
  })
);

export interface SnackbarMessage {
  message: string;
  key: number;
}

export interface State {
  open: boolean;
  messageInfo?: SnackbarMessage;
}

const LoanButtonFC: React.FC<
  ReturnType<typeof stateToProps> & ReturnType<typeof dispatchToProps>
> = ({ inputs, takeLoan }) => {
  const queueRef = React.useRef<SnackbarMessage[]>([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState<
    SnackbarMessage | undefined
  >(undefined);

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setOpen(true);
    }
  };

  const handleClick = (message: string) => () => {
    queueRef.current.push({
      message,
      key: new Date().getTime()
    });

    if (open) {
      // immediately begin dismissing current message
      // to start showing new one
      setOpen(false);
    } else {
      processQueue();
    }
  };

  const handleClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    processQueue();
  };

  const classes = useStyles();
  return (
    <div>
      <Button
        variant="outlined"
        size="large"
        color="inherit"
        onClick={() => {
          const validator = checkIfValid(
            inputs.user,
            inputs.amount,
            inputs.date
          );
          if (validator === "OK") {
            takeLoan({
              ...inputs,
              amount: inputs.amount,
              interest: parseFloat((inputs.amount / 10).toFixed(2)),
              isExtended: false
            });
          } else {
            handleClick(validator)();
          }
        }}
      >
        Saņemt{" "}
        {inputs.amount > 400 ? 400 : inputs.amount < 50 ? 50 : inputs.amount}{" "}
        Eur jau tulīt!
      </Button>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        onExited={handleExited}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span id="message-id">
            {messageInfo ? messageInfo.message : undefined}
          </span>
        }
      />
    </div>
  );
};
export const LoanButton = connect(
  stateToProps,
  dispatchToProps
)(LoanButtonFC);
