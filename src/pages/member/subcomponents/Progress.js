import React from 'react'
import Typography from '@material-ui/core/Typography'

const styles = {
    page: {
        width: '719px',
        background: 'rgb(174, 196, 244, 0.19',
        borderRadius: '20px',
        marginLeft: '85px',
        marginTop: '27px',
        overflow: 'hidden'
    },
    title: {
        color: '#FFFFFF',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        paddingLeft: '76px',
        paddingTop: '45px'
    }
}

function Greeting() {
    return (
        <div style={styles.page}>
            <Typography style={styles.title}>Progress</Typography>
        </div>
    )
}

export default Greeting
