import { Loan } from "./types";
import { Moment } from "moment";
export const takeLoan = (data: Loan): { type: "TAKELOAN"; payload: Loan } => ({
  type: "TAKELOAN",
  payload: data
});
export const setUserInput = (
  data: string
): { type: "SETUSERINPUT"; payload: string } => ({
  type: "SETUSERINPUT",
  payload: data
});
export const setAmountInput = (
  data: number
): { type: "SETAMOUNTINPUT"; payload: number } => ({
  type: "SETAMOUNTINPUT",
  payload: data
});
export const setDateInput = (
  data: Moment
): { type: "SETDATEINPUT"; payload: Moment } => ({
  type: "SETDATEINPUT",
  payload: data
});
export const extendLoan = (
    data: number
  ): { type: "EXTENDLOAN"; payload: number } => ({
    type: "EXTENDLOAN",
    payload: data
  });
export type ActionType =
  | ReturnType<typeof takeLoan>
  | ReturnType<typeof setUserInput>
  | ReturnType<typeof setAmountInput>
  | ReturnType<typeof setDateInput>
  | ReturnType<typeof extendLoan>;
