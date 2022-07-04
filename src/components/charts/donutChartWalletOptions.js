import { calculateTokenPercentage, stylingDecimals } from "../token/token-helpers";
import './donutChart.css'

export const getDonutChartOptions = (themeColor, walletAmount) => {
  return {
    colors: ["#00cdcd", "#009a9a", "#008181", "#006767", "#004d4d", "#003434"],
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
      show: true,
      fontSize: '13px',
      labels: {
        colors: 'white',//themeColor,
        useSeriesColors: false,
      },
      itemMargin: {
        horizontal: 0,
        vertical: 10,
      },
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      // width: 250,
      height: '50%',
      formatter: function(val, option) {
        const theme = localStorage.getItem('chakra-ui-color-mode')
        const lightModeLegend = theme === 'light' ? 'lightModeLegend' : ''
        const lightModeLegendValue = theme === 'light' ? 'lightModeLegendValue' : ''

        const amount = stylingDecimals(calculateTokenPercentage(option.w.globals.series[option.seriesIndex], walletAmount))
          return `<span class='donutChartLegend ${lightModeLegend}'> <span>${val}</span> <span class='donutChartLegendValue  ${lightModeLegendValue}'> ${amount} % </span></span>`
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function(val, option) {
        return option.w.globals.labels[option.seriesIndex]
      //  return `${option.w.globals.labels[option.seriesIndex]}\n${stylingDecimals(val)} %`
      },
    },
    hover: { mode: null },
    // plotOptions: {
    //   donut: {
    //     expandOnClick: false,
    //     donut: {
    //       labels: {
    //         show: true
    //       }
    //     }
    //   }
    // },
    fill: {
      colors: ["#00cdcd", "#009a9a", "#008181", "#006767", "#004d4d", "#003434"]
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      y: {
        formatter: (amount) => {
         return stylingDecimals(calculateTokenPercentage(amount, walletAmount)) + ' %'
        }
        // formatter: function(val) {
        //   return val + " $"
        // },
      },
    },
    plotOptions: {
      pie: {
        // expandOnClick: false,
        donut: {
          // height: '60%',
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
          },
        }
      }
    }
  };
}