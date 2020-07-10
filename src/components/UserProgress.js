import React from 'react'
import { COLOR } from '../constants/Constants'
import { XYPlot, XAxis, YAxis, LineSeries, MarkSeries } from 'react-vis'

const UserProgress = () => {
  const data = [
    {
      x: 0,
      y: 10
    },
    {
      x: 1,
      y: 10.072013291338404
    },
    {
      x: 2,
      y: 10.476716209667341
    },
    {
      x: 3,
      y: 10.130706353084655
    },
    {
      x: 4,
      y: 10.232280036351113
    },
    {
      x: 5,
      y: 10.74678738043552
    },
    {
      x: 6,
      y: 10.861081497362573
    },
    {
      x: 7,
      y: 11.437823054586296
    },
    {
      x: 8,
      y: 11.147686086560874
    },
    {
      x: 9,
      y: 11.207658627586277
    },
    {
      x: 10,
      y: 11.927949652106156
    },
    {
      x: 11,
      y: 11.642338971229641
    },
    {
      x: 12,
      y: 11.697858327735236
    },
    {
      x: 13,
      y: 11.59742274722172
    },
    {
      x: 14,
      y: 12.187990800176014
    },
    {
      x: 15,
      y: 12.394591085784526
    },
    {
      x: 16,
      y: 12.583035445080307
    },
    {
      x: 17,
      y: 12.667669918708176
    },
    {
      x: 18,
      y: 11.762705888983431
    },
    {
      x: 19,
      y: 11.058386943000006
    },
    {
      x: 20,
      y: 11.687339906635692
    }
  ]
  return (
    <XYPlot height={300} width={300}>
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
    </XYPlot>
  )
}

export default UserProgress
