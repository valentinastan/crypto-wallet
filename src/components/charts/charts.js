import React, { useEffect, useState } from "react";
import { lineChartOptionsCharts2 } from "./chartData";
import ReactApexChart from "react-apexcharts";
import { Button, Stack } from "@chakra-ui/react";
import {getHistoricalMarketDataRequest} from '../../requests/token'

const Charts = () => {
  const [historicalPrices, setHistoricalPrices] = useState([{
    name: '',
    data: []
  }])

  const [daysAgo, setDaysAgo] = useState('30')

  useEffect(() => {
    getHistoricalMarketDataRequest({
      symbol: 'gnosis',
      days: daysAgo,
    }).then((tokensSnapshot) => {
      if (tokensSnapshot.empty) {
        console.log("No matching documents.");
        // return;
      } else {
        setHistoricalPrices([{name: 'Prices', data: tokensSnapshot}])
        // console.log('historical prices', historicalPrices)
      }
    });
  }, [daysAgo]);


  return (
    <React.Fragment>
      <Stack direction='row' spacing={4} align='center' justify='end'>
        <Button colorScheme='teal' variant='ghost' onClick={() => setDaysAgo('1')}>
          1 D
        </Button>
        <Button colorScheme='teal' variant='ghost' onClick={() => setDaysAgo('7')}>
          1 W
        </Button>
        <Button colorScheme='teal' variant='ghost' onClick={() => setDaysAgo('30')}>
          1 M
        </Button>        
        <Button colorScheme='teal' variant='ghost' onClick={() => setDaysAgo('max')}>
          ALL
        </Button>
      </Stack>
      {
        historicalPrices[0].data.length > 0 &&
        <ReactApexChart
          options={lineChartOptionsCharts2}
          series={historicalPrices}
          type="area"
          width="99%"
          height="80%"
        />
      }
      {/* <LineChart
        // chartData={historicalPrices}
        // chartOptions={lineChartOptionsCharts2}
        // /> */}
    </React.Fragment>
  );
};

export default Charts;
