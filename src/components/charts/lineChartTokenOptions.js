let random =  Math.random()

export const lineChartOptions= {
  chart: {
    id: 'mainChart' + random,
    // group: 'token',
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
    },
    tickAmount: 4
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
  markers: {
    size: 0,
    colors: ["#b85384"],
    strokeColor: "#4FD1C5",
    strokeWidth: 3 
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

export const optionsLine = {
  chart: {
    id: 'selectionChart',
    // group: 'token',
    // height: 130,
    // type: 'bar', //bar
    foreColor: "#ccc",
    brush:{
      target: 'mainChart' + random,
      enabled: true
    },
    selection: {
      enabled: true,
      fill: {
        color: "#fff",
        opacity: 0.4
      },
      // xaxis: {
      //   min: new Date(minDate.getTime()),
      //   max: new Date(maxDate.getTime())
      // }
    },
  },
  colors: ['#b85384'],
  fill: {
    type: 'gradient',
    gradient: {
      type: "vertical",
      opacityFrom: 0.75,
      opacityTo: 0.1,
    }
  },
  stroke: {
    width: 2
  },
  grid: {
    borderColor: "#444"
  },
  markers: {
    size: 0
  },
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
  },
} 