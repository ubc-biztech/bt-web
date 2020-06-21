import React from 'react'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'

const styles = {
    page: {
        width: '719px',
        marginLeft: '85px',
        marginTop: '27px',
    },
    title: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        paddingLeft: '76px',
        paddingTop: '45px'
    }
}

function Greeting(props) {
    const { classes } = props
    return (
        <Card classes={{ root: classes.page }}>
            <Typography style={styles.title}>Progress</Typography>
        </Card>
    )
}

export default withStyles(styles)(Greeting)
