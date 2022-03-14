import React from "react";
import { donutChartOptions } from "./donutChartWalletOptions";
import ReactApexChart from "react-apexcharts";
import { Center } from "@chakra-ui/react";
import { calculateTokenAmount, calculateTokenPercentage, calculateWalletAmount } from "../token/token-helpers";

const DonutChartWallet = (props) => {
  const tokensSymbol = Object.keys(props.tokens)
  let tokensLabel = []
  let tokensAmount = []

  tokensAmount = tokensSymbol
    .map(symbol => {
      let amount = parseFloat(calculateTokenAmount(props.tokens[symbol].balance, props.tokens[symbol].price))
      if(amount > 0) {
        tokensLabel.push(symbol)
        return amount
      } else return undefined
    })
    .filter(tokenAmount => tokenAmount !== undefined)

  let walletAmount = calculateWalletAmount(tokensAmount)
  let tokensAmountPercentage = tokensAmount.map(amount => parseFloat(calculateTokenPercentage(amount, walletAmount).toFixed(2)))

  console.log(tokensAmountPercentage)
  const donutChartData = tokensAmountPercentage
  const label = tokensLabel

  return (
    <React.Fragment>
      {
        donutChartData.length === 0 &&
          <Center bg='' h='100px' color='white'>
            Add tokens to view your wallet's balance.
          </Center>
      }
      {
        donutChartData.length > 0 &&
          <ReactApexChart
            options={{...donutChartOptions, labels: label}}
            series={donutChartData || []}
            type="donut"
            width="100%"
            height="60%"
          />
      }
    </React.Fragment>
  );
};

export default DonutChartWallet;
