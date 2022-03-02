// export const lineChartDataCharts2 = [
//   {
//     name: "set1",
//     data:  
//     [
//       [
//         1645488000000,
//         319.9144052527248
//       ],
//       [
//         1645574400000,
//         322.803630891756
//       ],
//     ]
//   },
//   // {
//   //   name: "set2",
//   //   data: []
//   // }
// ];


export const lineChartOptionsCharts2 = {
  chart: {
    id: 'mainChart',
    toolbar: { //incons +/-
     show: true,
     autoSelected: 'pan',
    },
    zoom: {
      autoScaleYaxis: true
    }
  },
  tooltip: {
    theme: "dark"
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  xaxis: {
    type: "datetime",
    labels: {
      show: true,
      formatter: (val) => {return new Date(val).toLocaleString();},
      style: {
        colors: "#c8cfca",
        fontSize: "12px"
      }
    }
  },
  yaxis: {
    labels: {
      formatter: (val) => {return parseFloat(val).toFixed(2);},
      style: {
        colors: "#c8cfca",
        fontSize: "12px"
      }
    }
  },
  legend: {
    show: false
  },
  grid: {
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: false,
      }
    },
    xaxis: {
      lines: {
        show: true
      }
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: []
    },
    colors: ["#4FD1C5", "#2D3748"]
  },
  colors: ["#4FD1C5", "#2D3748"]
};

// var date = new Date()
// const yesterday = new Date(date)
// yesterday.setDate(yesterday.getDate() - 1)
let maxDate = new Date(8640000000000000);
let minDate = new Date(-8640000000000000);

export const optionsLine = {
  chart: {
    id: 'selectionChart',
    type: 'bar', //bar
    foreColor: "#ccc",
    brush:{
      target: 'mainChart',
      enabled: true
    },
    selection: {
      enabled: true,
      fill: {
        color: "#fff",
        opacity: 0.4
      },
      xaxis: {
        min: new Date(minDate.getTime()),
        max: new Date(maxDate.getTime())
      }
    },
  },
  colors: ['#FF0080'],
  stroke: {
    width: 2
  },
  grid: {
    borderColor: "#444"
  },
  markers: {
    size: 0
  },
  // fill: {
  //   type: 'pink'
  //   // type: 'gradient',
  //   // gradient: {
  //   //   opacityFrom: 0.91,
  //   //   opacityTo: 0.1,
  //   // }
  // },
  xaxis: {
    type: 'datetime',
    tooltip: {
      enabled: false
    }
  },
  yaxis: {
    labels: {
      formatter: (val) => {return parseFloat(val).toFixed(2);},
    },
    tickAmount: 2
  }
} 