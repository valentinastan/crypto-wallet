import React from "react";
import { getDonutChartOptions } from "./donutChartWalletOptions";
import ReactApexChart from "react-apexcharts";
import { Center, useColorModeValue } from "@chakra-ui/react";
import { calculateTokenAmount } from "../token/token-helpers";

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

  // let walletAmount = calculateWalletAmount(tokensAmount)
  // let tokensAmountPercentage = tokensAmount.map(amount => parseFloat(calculateTokenPercentage(amount, walletAmount).toFixed(3)))
  // const donutChartData = tokensAmountPercentage

  let donutChartData = tokensAmount
  const labels = tokensLabel

  const themeColor = useColorModeValue('#4A5568', 'white')

  return (
    <React.Fragment>
      {
        donutChartData.length === 0 &&
          <Center bg='' h='100px' color={themeColor}>
            Add tokens to view your wallet's balance.
          </Center>
      }
      {
        donutChartData.length > 0 &&
          <ReactApexChart
            options={{...getDonutChartOptions(themeColor), labels,
              // tooltip: {
              //   enabled: true,
              //   theme: "dark",
              //   y: {
              //     formatter: (amount) => {
              //       console.log('amount', amount)
              //       return stylingDecimals(calculateTokenPercentage(amount, walletAmount)) + ' %'
              //     }
              //   },
              // },
            }}
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
