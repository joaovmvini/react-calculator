import React from "react";
import "./Calculator.css";
import Display from "../basics/Display";
import Button from "../basics/Button";

const initialState = {
  displayValue: "0",
  isResult: null,
  values: new Array(2).fill(0),
  operator: null,
  isNewNumber: false,
};

export default class Calculator extends React.Component {
  state = {
    ...initialState,
  };

  handleButtonClick = (content) => {
    if (content === "AC") {
      this.clearDisplay();
    } else if (content === "=") {
      try {
        this.calculate(this.state.values, this.state.operator);
        this.setState({ isResult: true });
      } catch (e) {
        throw new Error("Some error ocurred in your calc");
      }
    } else {
      this.setDigit(content);
    }
  };
  setDigit = (current) => {
    this.setState({ displayValue: this.validator(current) });
  };

  clearDisplay = () => {
    this.setInitialState("0");
  };

  validator = (current) => {
    let exp = this.state.displayValue;
    const lastCharacter = exp[exp.length - 1];
    let concat = exp + current;
    const symbols = ["+", "-", "/", "x", "."];
    const isSpecial = (character, includePoint = true) => {
      if (includePoint) return symbols.includes(character);
      return symbols.slice(0, symbols.length - 1).includes(character);
    };
    const dotValidation = (v1) => v1.includes(".") && current === ".";

    if (!isSpecial(current, false)) {
      if (dotValidation(exp)) {
        return exp;
      }
      if (exp === "0" && current !== ".") {
        concat = current;
      } else if (current === ".") current = "0.";

      if (this.state.isResult) {
        this.setInitialState(current);
        return current;
      }
      let hasOperator = this.state.operator ? 1 : 0;
      this.setValues(
        this.state.isNewNumber ? (concat = current) : concat,
        hasOperator
      );
      this.setState({ isNewNumber: false, isResult: false });
      return concat;
    } else {
      if (!this.state.operator) {
        concat = exp = "0";
        this.setOperator(current);
      } else {
        if (!(isSpecial(lastCharacter) && isSpecial(current))) {
          const result = (concat = exp = this.calculate(
            this.state.values,
            this.state.operator
          ));
          this.setValues(result, 0);
        }
        this.setOperator(current);
      }
    }
    return exp;
  };

  setOperator = (operator) => {
    this.setState({ operator: operator, isNewNumber: true, isResult: false });
  };
  setInitialState = (initialDisplayValue) => {
    const newState = { ...initialState };
    newState.displayValue = initialDisplayValue;
    newState.values = [0, 0];
    if (this.state.isResult) newState.values[0] = initialDisplayValue || "0";
    this.setState({ ...newState });
    return { newState: newState, state: this.state };
  };
  setValues = (number, currentIndex) => {
    const arr = this.state.values;
    arr[currentIndex] = number;
    this.setState({
      values: arr,
    });
  };

  calculate = (values, operator) => {
    try {
      let result = eval(values[0] + operator.replace("x", "*") + values[1]);

      if (isNaN(result)) {
        throw new Error("error");
      }

      const formatted = Number.isInteger(result)
        ? String(result)
        : String(result.toFixed(2));

      this.setState({
        displayValue: formatted,
      });
      return formatted;
    } catch (e) {
      return "0";
    }
  };

  render() {
    return (
      <div className="Calculator">
        <Display content={this.state.displayValue}></Display>
        <div className="Button-area">
          <Button button="AC" setContent={this.handleButtonClick} />
          <Button
            button="/"
            special={true}
            setContent={this.handleButtonClick}
          />
          <Button button="7" setContent={this.handleButtonClick} />
          <Button button="8" setContent={this.handleButtonClick} />
          <Button button="9" setContent={this.handleButtonClick} />
          <Button
            button="x"
            special={true}
            setContent={this.handleButtonClick}
          />
          <Button button="4" setContent={this.handleButtonClick} />
          <Button button="5" setContent={this.handleButtonClick} />
          <Button button="6" setContent={this.handleButtonClick} />
          <Button
            button="-"
            special={true}
            setContent={this.handleButtonClick}
          />
          <Button button="1" setContent={this.handleButtonClick} />
          <Button button="2" setContent={this.handleButtonClick} />
          <Button button="3" setContent={this.handleButtonClick} />
          <Button
            button="+"
            special={true}
            setContent={this.handleButtonClick}
          />
          <Button button="0" setContent={this.handleButtonClick} />
          <Button button="." setContent={this.handleButtonClick} />
          <Button
            button="="
            special={true}
            setContent={this.handleButtonClick}
          />
        </div>
      </div>
    );
  }
}
