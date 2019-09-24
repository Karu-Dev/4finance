import React, { SyntheticEvent } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { Loan, State } from "../../state/types";
import { takeLoan } from "../../state/actions";
import { connect } from "react-redux";
import {
  checkIfValid,
  checkTabOpenTime,
  checkLatestInputs
} from "../../functions/Validation";
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
  function spamValidator() {
    let browserStorage = localStorage.getItem("browserOpen");
    const timeNow = new Date().getTime();
    if (browserStorage) {
      const arr = browserStorage.split(",");
      arr.splice(-3, arr.length - 2);
      const newBrowserArr = [...arr, timeNow];
      localStorage.setItem("browserOpen", newBrowserArr.toString());
    } else {
      localStorage.setItem("browserOpen", [timeNow].toString());
    }
    return checkLatestInputs(localStorage.getItem("browserOpen") as string);
  }

  function buttonClick() {
    const validator = checkIfValid(inputs.amount, inputs.date);
    const sessionRiskHandler = checkTabOpenTime(sessionStorage.getItem(
      "tabOpen"
    ) as string);
    if (validator === "OK") {
      if (sessionRiskHandler) {
        const spamRiskHandler = spamValidator();
        if (spamRiskHandler) {
          takeLoan({
            ...inputs,
            amount: inputs.amount,
            interest: parseFloat((inputs.amount / 10).toFixed(2)),
            isExtended: false
          });
          handleClick(`Your loan of ${inputs.amount} Eur has been accepted!`)();
        } else {
          handleClick("Clicked the loan button too often")();
        }
      } else {
        handleClick("Clicked the loan button too quickly")();
      }
    } else {
      handleClick(validator)();
    }
  }
  return (
    <div>
      <Button
        style={{
          backgroundColor: "rgba(48, 32, 17, 0.7)",
          color: "white"
        }}
        variant="outlined"
        size="large"
        color="inherit"
        onClick={() => {
          buttonClick();
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
