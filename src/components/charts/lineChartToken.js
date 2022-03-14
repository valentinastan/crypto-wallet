import React, { useEffect, useState } from "react";
import { lineChartOptions, optionsLine } from "./lineChartTokenOptions";
import ReactApexChart from "react-apexcharts";
import { Button, Stack } from "@chakra-ui/react";
import {getHistoricalMarketDataRequest} from '../../requests/token'
import constants from '../../constants/ethChain/const'

const Charts = (props) => {
  const [historicalPrices, setHistoricalPrices] = useState([{
    name: '',
    data: []
  }])

  const [daysAgo, setDaysAgo] = useState('30')

  useEffect(() => {
    getHistoricalMarketDataRequest({
      symbol: constants[props.tokenSymbol].coingeckoId,
      days: daysAgo,
    }).then((tokensSnapshot) => {
      if (tokensSnapshot.empty) {
        console.log("No matching documents.");
        // return;
      } else {
        setHistoricalPrices([{name: `${props.tokenSymbol} price`, data: tokensSnapshot}])
      }
    });
  }, [daysAgo]);

  return (
    <React.Fragment>
      <Stack direction='row' spacing={1} align='center' justify='end'>
      <Button colorScheme='teal' variant='ghost' onClick={() => setDaysAgo('1')}>
          24h
        </Button>
        <Button colorScheme='teal' variant='ghost' onClick={() => setDaysAgo('7')}>
          7d
        </Button>
        <Button colorScheme='teal' variant='ghost' onClick={() => setDaysAgo('14')}>
          14d
        </Button>
        <Button colorScheme='teal' variant='ghost' onClick={() => setDaysAgo('30')}>
          30d
        </Button>
        <Button colorScheme='teal' variant='ghost' onClick={() => setDaysAgo('90')}>
          90d
        </Button>  
        <Button colorScheme='teal' variant='ghost' onClick={() => setDaysAgo('180')}>
          180d
        </Button>
        <Button colorScheme='teal' variant='ghost' onClick={() => setDaysAgo('365')}>
          1y
        </Button>      
        <Button colorScheme='teal' variant='ghost' onClick={() => setDaysAgo('max')}>
          Max
        </Button>
      </Stack>
      {
        historicalPrices[0].data.length > 0 &&
          <ReactApexChart
            options={lineChartOptions}
            series={historicalPrices}
            type="area"
            width="99%"
            height="500px" 
          />
      }
      {
        historicalPrices[0].data.length > 0 &&
          <ReactApexChart
            options={optionsLine}
            series={historicalPrices} 
            type="area"
            height='130px'
          />
      }
    </React.Fragment>
  );
};

export default Charts;