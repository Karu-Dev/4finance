import moment, { Moment } from "moment";
export function checkIfValid(amount: number, date: Moment) {
  let amountOk = false;
  let dateOk = false;
  if (amount <= 400 && amount > 10) {
    amountOk = true;
  }
  if (date.isBetween(moment(), moment().add(30, "d"))) {
    dateOk = true;
  }
  if (dateOk) {
    if (amountOk) {
      return "OK";
    } else {
      return "Please choose an amount greater than 10 Eur and not greater than 400 Eur";
    }
  } else {
    return "Please choose a date from tomorrow to 30 days from today";
  }
}
export function checkTabOpenTime(ts: string) {
  const timeNow = new Date().getTime();
  const thirtySeconds = 3000;
  if (timeNow > +ts + thirtySeconds) {
    return true;
  } else {
    return false;
  }
}
export function checkLatestInputs(tsArrayAsStr: string) {
  if (tsArrayAsStr) {
    const timeStamps = tsArrayAsStr.split(",");
    if (timeStamps.length < 3) {
      return true;
    } else {
      const firstClick = +timeStamps[0];
      const lastClick = +timeStamps[2];
      if (lastClick - firstClick > 6000) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true;
  }
}
