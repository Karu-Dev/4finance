import moment, { Moment } from "moment";
export function checkIfValid(user: string, amount: number, date: Moment) {
  let userOk = false;
  let amountOk = false;
  let dateOk = false;
  if (user.match(/[A-z]/g)) {
    userOk = true;
  }
  if (amount <= 400 && amount > 10) {
    amountOk = true;
  }
  if (date.isBetween(moment(), moment().add(30, "d"))) {
    dateOk = true;
  }
  if (dateOk) {
    if (amountOk) {
      if (userOk) {
        return "OK";
      } else {
        return "User not valid";
      }
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
  console.log(tsArrayAsStr);
  if (tsArrayAsStr) {
    const timeStamps = tsArrayAsStr.split(",");
    if (timeStamps.length < 3) {
      return true;
    } else {
      const firstClick = +timeStamps[0];
      const lastClick = +timeStamps[2];
      console.log(lastClick - firstClick);
      if (lastClick - firstClick > 60000) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true;
  }
}
