import React from 'react'
// import Sheet from "./Sheet";
import CircularProgress from '@material-ui/core/CircularProgress'
import EventUserTable from './EventUserTable'

export default function Event(props) {
    const { event } = props

    return event ? (
        <div>
            <h1>
Event:{event.ename}</h1>
            <EventUserTable />
</div>
)
    ) : (
      <CircularProgress />
    )
}
