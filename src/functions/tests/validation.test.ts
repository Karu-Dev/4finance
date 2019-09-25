import * as validations from "../Validation";
import moment from "moment";

describe("Validation function tests", () => {
  it("should be able to validate user input", () => {
    let validDays = [];
    const invalidDay = moment(new Date()).subtract(10, "d");
    for (let i = 1; i <= 30; i++) {
      const day = moment(new Date()).add(i, "d");
      validDays.push(day);
    }
    validDays.forEach(day => {
      for (let i = 50; i <= 400; i++) {
        expect(validations.checkIfValid(i, day)).toBe("OK");
      }
    });
    expect(validations.checkIfValid(10, validDays[4])).toBe(
      "Please choose an amount greater than 10 Eur and not greater than 400 Eur"
    );
    expect(validations.checkIfValid(401, validDays[4])).toBe(
      "Please choose an amount greater than 10 Eur and not greater than 400 Eur"
    );
    //Both inputs are wrong, but date validation comes first for the test below
    expect(validations.checkIfValid(10, invalidDay.subtract(10, "d"))).toBe(
      "Please choose a date from tomorrow to 30 days from today"
    );
    expect(validations.checkIfValid(400, invalidDay)).toBe(
      "Please choose a date from tomorrow to 30 days from today"
    );
  });
  it("Should be able to tell if 30 sec has passed since opening the tab", () => {
    const timeNow = new Date().getTime();
    const timeBeforeThirtySec = timeNow - 31000;
    //removing 31 second instead due to time passing as the test initializes to when it executes the test function
    const timeBeforeTwentySec = timeNow - 20000;
    expect(validations.checkTabOpenTime(timeNow.toString())).toBeFalsy();
    expect(
      validations.checkTabOpenTime(timeBeforeTwentySec.toString())
    ).toBeFalsy();
    expect(
      validations.checkTabOpenTime(timeBeforeThirtySec.toString())
    ).toBeTruthy();
  });
  it("Should be able to tell if 60 seconds have passed since your last 3 button presses",()=>{
      const passingInput = "0,4141,61000"
      const failingInput = "0,4141,59000"
      expect(validations.checkLatestInputs(passingInput)).toBeTruthy()
      expect(validations.checkLatestInputs(failingInput)).toBeFalsy()
  })
});
