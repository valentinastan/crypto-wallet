import React, { useEffect, useState } from "react";
import { lineChartOptionsCharts2, optionsLine } from "./chartData";
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
        setHistoricalPrices([{name: 'Total', data: tokensSnapshot}])
        // console.log('historical prices', historicalPrices)
      }
    });
  }, [daysAgo]);

  // const getSelection = () => {
  //   const selection = {}
  //   if(historicalPrices[0].data.length > 0) {
  //     selection = {
  //       enabled: true,
  //       fill: {
  //         color: "#fff",
  //         opacity: 0.4
  //       },
  //       xaxis: {
  //         min: new Date(historicalPrices[0].data[0][0]).toLocaleString(),
  //         max: new Date().getTime()
  //       }
  //     }
  //   }

  //   return selection
  // }

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
            options={lineChartOptionsCharts2}
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
          // selection={{
          //   enabled: true,
          //   fill: {
          //     color: "#fff",
          //     opacity: 0.4
          //   },
          //   xaxis: {
          //     min: new Date(historicalPrices[0].data[0][0]).toLocaleString(),
          //     max: new Date().getTime()
          //   }
          // }}
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
