import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import House from '../images/house.svg'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const styles = {
    page: {
        width: '719px',
        marginLeft: '85px',
        marginTop: '27px',
    },
    title: {
        color: '#FFFFFF',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        paddingLeft: '76px',
        paddingTop: '45px'
    },
    reward: {
        color: '#FFFFFF',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '22px',
        paddingLeft: '76px',
        paddingTop: '15px',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    house: {
        position: 'absolute',
        left: '685px',
        top: '117px'
    }
}

function Greeting(props) {
    const { classes } = props
    return (
        <Card classes={{ root: classes.page }}>
            <CardContent>
                <Typography style={styles.title}>Hi {props.user.fname}!</Typography>
                <Typography style={styles.reward}>You are X events away from a reward!</Typography>
            </CardContent>
            <img src={House} style={styles.house} alt='BizTech House' />
        </Card>
    )
}

export default withStyles(styles)(Greeting)
