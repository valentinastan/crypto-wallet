import { stylingDecimals } from "../token/token-helpers";

export const getDonutChartOptions = (themeColor) => {
  return {
    colors: ["#00cdcd", "#009a9a", "#006767", "#004d4d", "#003434"],
    chart: {
      width: "100%"
    },
    states: {
      hover: {
        filter: {
          type: "none"
        }
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: true,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false
          }
        }
      }
    },
  
    fill: {
      colors: ["#00cdcd", "#009a9a", "#006767", "#004d4d", "#003434"]
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      y: {
        // formatter: (amount) => {
        //   console.log('amount', amount)
        //  // return calculateTokenPercentage(amount, walletAmount) + ' %%'
        // }
        formatter: function(val) {
          return val + " $"
        },
      },
    },
    plotOptions: {
      pie: {
        // expandOnClick: false,
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '30px',
              offsetY: -15
            },
            value: {
              show: true,
              fontSize: '30px',
              color: themeColor,
              offsetY: +15,
              formatter: function (val) {
                  return stylingDecimals(parseFloat(val)) + ' $'
              }
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '30px',
              color: '#F0B90B', //'#ffa500',
              formatter: function (w) {
                  const total = w.globals.seriesTotals.reduce((a, b) => {
                      return a + b
                  }, 0)
                  return stylingDecimals(total) + ' $'
              }
            }
          }
        }
      }
    }
  };
}