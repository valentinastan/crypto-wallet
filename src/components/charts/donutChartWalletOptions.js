export const donutChartOptions = {
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
    enabled: false
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
    theme: "dark"
  }
};