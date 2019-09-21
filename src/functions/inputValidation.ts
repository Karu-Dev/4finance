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
        return "USER";
      }
    } else {
      return "AMOUNT";
    }
  } else {
    return "DATE";
  }
}
