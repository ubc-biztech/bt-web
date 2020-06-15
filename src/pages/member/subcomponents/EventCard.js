import React from 'react'
import Typography from '@material-ui/core/Typography'

const styles = {
    page: {
        width: '345px',
        background: 'rgb(174, 196, 244, 0.19',
        borderRadius: '20px',
        marginLeft: '34px',
        marginTop: '27px',
        overflow: 'hidden'
    },
    title: {
        color: '#96FF50',
        fontWeight: 'bold',
        fontSize: '36px',
        paddingLeft: '37px',
        paddingTop: '10px',
        paddingBottom: '15px'
    },
    eventName: {
        color: '#FFFFFF',
        fontSize: '23px',
        paddingLeft: '37px',
        fontWeight: 'bold'
    },
    eventDate: {
        color: '#FFFFFF',
        fontSize: '20px',
        paddingLeft: '37px',
        paddingBottom: '23px',
        fontWeight: 'normal'
    }
}

function EventCard(props) {
    let eventName = ''
    let eventDate = ''
    if (props.event) {
        eventName = props.event.ename
        if (props.event.startDate) {
            eventDate = new Date(props.event.startDate)
                .toLocaleDateString('en-US', { day: 'numeric', weekday: 'long', month: 'long', year: 'numeric' })
        }
    }

    return (
        <div style={styles.page}>
            <Typography style={styles.title}>{props.type}</Typography>
            <Typography style={styles.eventName}>{eventName}</Typography>
            <Typography style={styles.eventDate}>{eventDate}</Typography>
        </div>
    )
}

export default EventCard
