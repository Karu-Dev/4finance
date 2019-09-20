export interface Loan {
  user: string;
  date: Date;
  amount: number;
  isExtended: boolean;
}
export interface Inputs {
  user: string;
  amount: number;
  date: Date;
}
export interface State {
  loans: Loan[];
  inputs: Inputs;
}
