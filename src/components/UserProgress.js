import React from 'react'
import { COLOR } from '../constants/Constants'
import { makeWidthFlexible, XYPlot, XAxis, YAxis, LineSeries, MarkSeries } from 'react-vis'

const FlexibleXYPlot = makeWidthFlexible(XYPlot)

const UserProgress = () => {
  const data = [
    {
      x: 1580515199000,
      y: 1
    },
    {
      x: 1581525199000,
      y: 4
    },
    {
      x: 1585699200000,
      y: 3
    },
    {
      x: 1587513600000,
      y: 1
    },
    {
      x: 1593561600000,
      y: 2
    }
  ]
  return (
    <FlexibleXYPlot
      xType='time'
      height={300}
    >
      <XAxis/>
      <YAxis/>
      <LineSeries
        data={data}
        stroke={COLOR.FONT_COLOR}
        color={COLOR.BIZTECH_GREEN}
        style={{}}
      />
      <MarkSeries
        data={data}
        color={COLOR.BIZTECH_GREEN}
      />
    </FlexibleXYPlot>
  )
}

export default UserProgress
