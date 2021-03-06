import React, { useEffect, useState } from "react";
import { lineChartOptions, optionsLine } from "./lineChartTokenOptions";
import ReactApexChart from "react-apexcharts";
import { Button, Stack } from "@chakra-ui/react";
import { getHistoricalMarketDataRequest } from "../../requests/token";
import ethConstants from "../../constants/ethChain/const";
import bnbConstants from "../../constants/bnbChain/const";
import { useGlobalState } from "../../state-management/stores/store";
import Loader from "../loader";

const LineChartToken = (props) => {
  const [historicalPrices, setHistoricalPrices] = useState([
    {
      name: "",
      data: [],
    },
  ]);
  const [daysAgo, setDaysAgo] = useState("30");
  const networkId = useGlobalState().walletState.networkId;

  useEffect(() => {
    if (networkId) {
      getHistoricalMarketDataRequest({
        symbol:
          networkId === 1
            ? ethConstants[props.tokenSymbol].coingeckoId
            : bnbConstants[props.tokenSymbol].coingeckoId,
        days: daysAgo,
      }).then((tokensSnapshot) => {
        if (tokensSnapshot.empty) {
          console.log("No matching documents.");
          // return;
        } else {
          setHistoricalPrices([
            { name: `${props.tokenSymbol} price`, data: tokensSnapshot },
          ]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daysAgo, networkId]);

  return (
    <React.Fragment>
      {historicalPrices[0].data.length > 0 ? (
        <>
          <Stack direction="row" spacing={1} align="center" justify="end">
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={() => setDaysAgo("1")}
            >
              24h
            </Button>
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={() => setDaysAgo("7")}
            >
              7d
            </Button>
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={() => setDaysAgo("14")}
            >
              14d
            </Button>
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={() => setDaysAgo("30")}
            >
              30d
            </Button>
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={() => setDaysAgo("90")}
            >
              90d
            </Button>
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={() => setDaysAgo("180")}
            >
              180d
            </Button>
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={() => setDaysAgo("365")}
            >
              1y
            </Button>
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={() => setDaysAgo("max")}
            >
              Max
            </Button>
          </Stack>
          <ReactApexChart
            options={{
              ...lineChartOptions,
              // chart: {
              //   id: 'mainChart' + props.tokenSymbol,
              //   // type: "area"
              // },
              // group: props.tokenSymbol,
            }}
            series={historicalPrices}
            type="area"
            width="99%"
            height="500px"
            group={props.tokenSymbol}
          />
          <ReactApexChart
            options={{
              ...optionsLine,
              // chart: {
              //   id: 'selectionChart' + props.tokenSymbol,
              // },
              // group: props.tokenSymbol,
              // brush: {
              //   target: 'mainChart' + props.tokenSymbol,
              //   enabled: true
              // },
            }}
            series={historicalPrices}
            type="area"
            height="130px"
            group={props.tokenSymbol}
          />
        </>
      ) : (
        <Loader show={true}></Loader>
      )}
      {/* {historicalPrices[0].data.length > 0 && (
        <ReactApexChart
          options={lineChartOptions}
          series={historicalPrices}
          type="area"
          width="99%"
          height="500px"
        />
      )}
      {historicalPrices[0].data.length > 0 && (
        <ReactApexChart
          options={optionsLine}
          series={historicalPrices}
          type="area"
          height="130px"
        />
      )} */}
    </React.Fragment>
  );
};

export default LineChartToken;
