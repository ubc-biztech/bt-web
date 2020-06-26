import React from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
    card: {
        width: '719px',
        marginTop: '27px'
    },
    header: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        paddingLeft: '76px',
        paddingTop: '45px'
    }
}


function SubComponent(props) {
    const { classes } = props

    console.log(classes.card)
    return (
        <Card classes={{ root: classes.card }}>
            <Typography style={styles.header}>{props.header}</Typography>
            {props.content}
        </Card>
    )
}

export default withStyles(styles)(SubComponent)