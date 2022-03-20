import React from 'react'
import { Row, Col, Divider, Typography } from 'antd'
import { Column as ColumnPlot, Pie as PiePlot, RingProgress } from '@ant-design/plots'

import { PlotSettings } from './plotSettings'

const { Title } = Typography

function Dashboard() {
  return (
    <section>
      <Row gutter={[16, 16]}>
        <Col className="dashboard-metrics" span={12}>
          <Title level={4}>Métrica 1</Title>
          <ColumnPlot {...PlotSettings.BasicColumnPlotSettings} />
        </Col>
        <Col className="dashboard-metrics" span={12}>
          <Title level={4}>Métrica 2</Title>
          <ColumnPlot {...PlotSettings.StackedColumnPlotSettings} />
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]}>
        <Col className="dashboard-metrics" span={12}>
          <Title level={4}>Métrica 3</Title>
          <PiePlot {...PlotSettings.PiePlotConfig} />
        </Col>
        <Col className="dashboard-metrics" span={12}>
          <Title level={4}>Métrica 4</Title>
          <div className='small-plot'>
            <RingProgress {...PlotSettings.RingProgressSettings} />
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default Dashboard
