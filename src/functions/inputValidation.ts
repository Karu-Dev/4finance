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
