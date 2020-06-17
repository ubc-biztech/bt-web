import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
    page: {
        width: '719px',
        marginLeft: '34px',
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

function Prizes(props) {
    const { classes } = props
    return (
        <Card classes={{ root: classes.page }}>
            <Typography style={styles.title}>Prizes</Typography>
        </Card >
    )
}

export default withStyles(styles)(Prizes)
