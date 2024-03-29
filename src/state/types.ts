import {Moment} from "moment"
export interface Loan {
  date: Moment;
  amount: number;
  interest:number;
  isExtended: boolean;
}
export interface Inputs {
  user: string;
  amount: number;
  date: Moment;
}
export interface State {
  loans: Loan[];
  inputs: Inputs;
}
