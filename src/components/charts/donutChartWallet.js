import React, { useEffect, useState } from "react";
import { donutChartOptions } from "./donutChartWalletOptions";
import ReactApexChart from "react-apexcharts";
import { Center } from "@chakra-ui/react";

const DonutChartWallet = (props) => {
  console.log('donut', props)
  const tokensSymbol = Object.keys(props.tokens)


  const getAmounts = () => {
    let amounts = []
    amounts = tokensSymbol.map(symbol => props.tokens[symbol]?.amount).filter(el => el !== undefined)
    return amounts
  }

const donutChartData = getAmounts()
const label = tokensSymbol

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
