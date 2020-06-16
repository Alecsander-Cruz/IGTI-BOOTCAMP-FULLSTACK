import React, { Component } from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import Value from './Value';
import Steps from './Steps';

export default class Counter extends Component {
  constructor() {
    super();
    this.state = {
      currentCounter: 2,
      steps: 0,
    };
  }

  handleClick = (typeButton) => {
    const { currentCounter, steps } = this.state;
    this.setState({
      currentCounter:
        typeButton === '+'
          ? currentCounter + 1
          : typeButton === '-'
          ? currentCounter - 1
          : currentCounter,
      steps: steps + 1,
    });
  };

  render() {
    const { currentCounter, steps } = this.state;
    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleClick} />
        <Value value={currentCounter} />
        <IncrementButton onIncrement={this.handleClick} />
        <Steps currentSteps={steps} />
      </div>
    );
  }
}
