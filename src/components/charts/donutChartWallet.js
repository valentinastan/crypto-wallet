import React from "react";
import { getDonutChartOptions } from "./donutChartWalletOptions";
import ReactApexChart from "react-apexcharts";
import { Center, useColorModeValue } from "@chakra-ui/react";
import {
  calculateWalletAmount,
} from "../token/token-helpers";

const DonutChartWallet = (props) => {
  const tokensSymbol = Object.keys(props.tokens);
  const themeColor = useColorModeValue("#4A5568", "white");
  let unsortedAmounts = [];

  const tokensAmount = tokensSymbol
    .map((symbol) => {
      // let amount = parseFloat(
      //   calculateTokenAmount(
      //     props.tokens[symbol].balance,
      //     props.tokens[symbol].price
      //   )
      // );
      let amount = parseFloat(props.tokens[symbol].amount)
   
      if (amount !== undefined && amount > 0) {
        unsortedAmounts.push({ amount, symbol });
        return amount;
      } else return undefined;
    })
    .filter((tokenAmount) => tokenAmount !== undefined);

  let walletAmount = calculateWalletAmount(tokensAmount);
  let sortedAmounts = unsortedAmounts.sort((a, b) => b.amount - a.amount);

  let series = sortedAmounts.map((token) => token.amount);
  const labels = sortedAmounts.map((token) => token.symbol);

  return (
    <React.Fragment>
      {series.length === 0 && (
        <Center bg="" h="100px" color={themeColor}>
          Add tokens to view your wallet's balance.
        </Center>
      )}
      {series.length > 0 && (
        // <div className="apex-donut">
        <ReactApexChart
          options={{
            ...getDonutChartOptions(themeColor, walletAmount),
            labels,
          }}
          series={series}
          type="donut"
          width="100%"
          height="50%"
        />
        // </div>
      )}
    </React.Fragment>
  );
};

export default DonutChartWallet;
