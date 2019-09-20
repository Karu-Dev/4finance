import { Loan } from "./types"
export const takeLoan = (data:Loan):{type:"TAKELOAN", payload:Loan} => ({
    type:"TAKELOAN",
    payload:data
})
export const setUserInput = (data:string):{type:"SETUSERINPUT", payload:string}=>({
    type:"SETUSERINPUT",
    payload:data,
})
export const setAmmountInput = (data:number):{type:"SETAMOUNTINPUT", payload:number}=>({
    type:"SETAMOUNTINPUT",
    payload:data,
})
export const setDateInput = (data:Date):{type:"SETDATEINPUT", payload:Date}=>({
    type:"SETDATEINPUT",
    payload:data,
})
export type ActionType = ReturnType<typeof takeLoan>