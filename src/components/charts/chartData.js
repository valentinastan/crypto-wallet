export const lineChartDataCharts2 = [
  {
    name: "Mobile apps",
    data:  
    [
      [
        1645488000000,
        319.9144052527248
      ],
      [
        1645574400000,
        322.803630891756
      ],
      [
        1645660800000,
        319.953995761761
      ],
      [
        1645747200000,
        318.8140655219259
      ],
      [
        1645833600000,
        340.8071783045407
      ],
      [
        1645920000000,
        340.7409390590354
      ],
      [
        1646006400000,
        320.76537045757277
      ],
      [
        1646070001000,
        338.1332523121792
      ]
    ]
   
  },
  // {
  //   name: "Websites",
  //   data: [400, 500, 40, 140, 290, 290, 340, 230, 400]
  // }
];


export const lineChartOptionsCharts2 = {
  chart: {
    toolbar: {
      show: true
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
    curve: "smooth"
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
        show: false
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