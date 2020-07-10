import React from 'react'
import { COLOR } from '../constants/Constants'
import { connect } from 'react-redux'
import { makeWidthFlexible, XYPlot, XAxis, YAxis, LineSeries, MarkSeries } from 'react-vis'

const FlexibleXYPlot = makeWidthFlexible(XYPlot)

// Create the past 6 months in the format:
//   year: {
//       month: 1
//   }
const getYears = () => {
  const date = new Date()
  const currentMonth = date.getMonth()
  const is6monthsAgoLastYear = currentMonth - 5 < 0
  if (is6monthsAgoLastYear) {
    const minMonth = 11 - (5 - currentMonth)
    const years = { [date.getFullYear() - 1]: {}, [date.getFullYear()]: {} }
    for (let i = 0; i < currentMonth; i++) {
      years[date.getFullYear()][i] = 0
    }
    for (let i = minMonth; i < 11; i++) {
      years[date.getFullYear() - 1][i] = 0
    }
    return years
  } else {
    const minMonth = currentMonth - 5
    const years = { [date.getFullYear()]: {} }
    for (let i = minMonth; i < currentMonth; i++) {
      years[date.getFullYear()][i] = 0
    }
    return years
  }
}

const UserProgress = ({ registeredEvents, events }) => {
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
  const eventList = registeredEvents && registeredEvents.map(event => {
    return event.eventID
  })
  // Only include events that are newer than 6 months old and user is registered for
  const filteredEvents = events && events.filter(event => {
    const isNewerThanSixMonths = Date.now() - Date.parse(event.startDate) < 15552000
    return eventList.includes(event.id) && isNewerThanSixMonths
  })
  const years = getYears()
  filteredEvents && filteredEvents.forEach(event => {
    const parsedDate = new Date(event.startDate)
    // years[parsedDate.getFullYear()][parsedDate.getMonth()] += 1
    years[parsedDate.getFullYear()] = years[parsedDate.getFullYear()] || {}
    years[parsedDate.getFullYear()][parsedDate.getMonth()] = years[parsedDate.getFullYear()][parsedDate.getMonth()] + 1 || 1
  })
  console.log(years)
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

const mapStateToProps = state => {
  return {
    events: state.pageState.events
  }
}

export default connect(mapStateToProps, {})(UserProgress)
