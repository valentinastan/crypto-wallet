import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from 'apexcharts'

const LineChart = (props) => {

  const [state, setState] = useState({
    chartData: [],
    chartOptions: {},
    selection: 'one_month'
  })


  useEffect(() => {
    setState({
      chartData: props.chartData,
      chartOptions: props.chartOptions,
      selection: 'one_month'
    });
  }, []) 

  // function updateData(timeline) {
  //   setState({
  //     selection: timeline
  //   })
  
  //   switch (timeline) {
  //     case 'one_month':
  //       ApexCharts.exec(
  //         'area-datetime',
  //         'zoomX',
  //         new Date('28 Jan 2013').getTime(),
  //         new Date('27 Feb 2013').getTime()
  //       )
  //       break
  //     case 'six_months':
  //       ApexCharts.exec(
  //         'area-datetime',
  //         'zoomX',
  //         new Date('27 Sep 2012').getTime(),
  //         new Date('27 Feb 2013').getTime()
  //       )
  //       break
  //     case 'one_year':
  //       ApexCharts.exec(
  //         'area-datetime',
  //         'zoomX',
  //         new Date('27 Feb 2012').getTime(),
  //         new Date('27 Feb 2013').getTime()
  //       )
  //       break
  //     case 'ytd':
  //       ApexCharts.exec(
  //         'area-datetime',
  //         'zoomX',
  //         new Date('01 Jan 2013').getTime(),
  //         new Date('27 Feb 2013').getTime()
  //       )
  //       break
  //     case 'all':
  //       ApexCharts.exec(
  //         'area-datetime',
  //         'zoomX',
  //         new Date('23 Jan 2012').getTime(),
  //         new Date('27 Feb 2013').getTime()
  //       )
  //       break
  //     default:
  //   }
  // }

    return (
      <React.Fragment>
        {/* <div id="chart">
        <div class="toolbar">
        <button id="one_month"
          
          onClick={()=>updateData('one_month')} className={ (state.selection==='one_month' ? 'active' : '')}>
        1M
        </button>
        &nbsp;
        <button id="six_months"
          
          onClick={()=>updateData('six_months')} className={ (state.selection==='six_months' ? 'active' : '')}>
        6M
        </button>
        &nbsp;
        <button id="one_year"
          
          
          onClick={()=>updateData('one_year')} className={ (state.selection==='one_year' ? 'active' : '')}>
        1Y
        </button>
        &nbsp;
        <button id="ytd"
          
          onClick={()=>updateData('ytd')} className={ (state.selection==='ytd' ? 'active' : '')}>
        YTD
        </button>
        &nbsp;
        <button id="all"
          
          onClick={()=>updateData('all')} className={ (state.selection==='all' ? 'active' : '')}>
        ALL
        </button>
        </div> */}

    <ReactApexChart
      options={state.chartOptions}
      series={state.chartData}
      type="area"
      width="100%"
      height="80%"
    />
  {/* </div> */}
    </React.Fragment>
  );
  
}


export default LineChart;
