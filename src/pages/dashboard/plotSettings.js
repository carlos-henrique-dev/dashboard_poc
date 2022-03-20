import { PlotsData } from './data'

export const PlotSettings = {
  BasicColumnPlotSettings: {
    data: PlotsData.basicColumnPlot,
    xField: 'type',
    yField: 'value',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Conversas',
      },
      sales: {
        alias: 'Dia',
      },
    },
  },
  StackedColumnPlotSettings: {
    data: PlotsData.stackedColumnPlot,
    isStack: true,
    xField: 'type',
    yField: 'value',
    seriesField: 'group',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Conversas',
      },
      sales: {
        alias: 'Dia',
      },
    },
  },
  PiePlotConfig: {
    appendPadding: 10,
    data: PlotsData.PiePlot,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  },
  RingProgressSettings: {
    height: 250,
    width: 250,
    autoFit: false,
    percent: 0.6,
    color: ['#F4664A', '#E8EDF3'],
    innerRadius: 0.85,
    radius: 0.98,
    statistic: {
      title: {
        style: {
          color: '#363636',
          fontSize: '12px',
          lineHeight: '14px',
        },
        formatter: () => 'Uso',
      },
    },
  },
}
