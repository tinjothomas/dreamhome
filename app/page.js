"use client";

import React, { useState } from "react";

export default function Hello() {
  const [mortgageData, setMortgageData] = useState([]);

  const calculateMortgage = () => {
    let formData = {
      loanAmount: 6500702,
      tenure: 182,
      principalPayBackAmount: 63407,
    };
    const { loanAmount, tenure, principalPayBackAmount } = formData;
    const monthlyInterestRate = 0.007; // 8.4% annual interest rate

    let balance = loanAmount;
    let monthlyPayment = principalPayBackAmount;
    const mortgageDetails = [];

    for (let i = 0; i < tenure; i++) {
      const interest = balance * monthlyInterestRate;
      const principal = monthlyPayment - interest;
      balance -= principal;

      mortgageDetails.push({
        month: i + 1,
        balance: balance.toFixed(2),
        interest: interest.toFixed(2),
        principal: principal.toFixed(2),
      });
    }

    setMortgageData(mortgageDetails);
    console.log(mortgageData);
  };

  return (
    <div className="flex flex-col px-8">
      <h1 className="text-lg font-bold">Calculate Mortgage</h1>
      <div className="flex flex-col">
        <button
          className="px-2 py-2 bg-indigo-400 rounded text-white"
          onClick={calculateMortgage}>
          Calculate
        </button>
      </div>
    </div>
  );
}
