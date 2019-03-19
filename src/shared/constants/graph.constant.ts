export const memoryUsageProcess = {
  series: [{
      type: 'treemap',
      layoutAlgorithm: 'stripes',
        levels: [{
          level: 1,
          layoutAlgorithm: 'strip',
          dataLabels: {
              enabled: true,
              align: 'left',
              verticalAlign: 'top',
              style: {
                  fontSize: '15px',
                  fontWeight: 'bold'
              }
          }
      }],
      data: []
   }],
   title:  {
     text: 'Memory consumption in mb'
   }
}

export const memoryAndCpu = {
  chart: {
    type: 'column',
    styledMode: true
  },
  title: {
    text: 'memory and cpu usage',
  },
  yAxis: [{
    title: {
      text: 'memory usage (in mb)'
    }
  }, {
    opposite: true,
    title: {
      text: 'CPU core used'
     }
  }],
    plotOptions: {
      column: {
         borderRadius: 5
      }
    },
    series: []
};

export const memoryUsed = {
    chart: {
        zoomType: 'x'
    },
    title: {
        text: 'Memory usage over time (in GB)'
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: 'Memory'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                   [0, '#7cb5ec'],
                   [1, '#7cb5ec']
               ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
    },
    series: [{
        type: 'area',
        name: 'Memory consumption',
        data: []
    }]
}

export const averageLoad = {
  chart: {
      type: 'spline'
  },
  title: {
      text: 'Average load on the server'
  },
  subtitle: {
      text: 'One minute ago, five minutes ago and fifteen minutes ago'
  },
  xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
          month: '%e. %b',
          year: '%b'
      },
      title: {
          text: 'Date'
      }
  },
  yAxis: {
      title: {
          text: 'Server load'
      },
      min: 0
  },
  tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
  },

  plotOptions: {
      spline: {
          marker: {
              enabled: true
          }
      },
      threshold: 100
  },

  colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
  series: []
}
