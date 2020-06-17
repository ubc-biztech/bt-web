import React from 'react'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'

const styles = {
    page: {
        width: '719px',
        marginLeft: '34px',
        marginTop: '27px',
        paddingBottom: '33px'
    },
    title: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        paddingLeft: '76px',
        paddingTop: '45px'
    }
}

function Stickers(props) {
    const { classes } = props
    return (
        <Card classes={{ root: classes.page }}>
            <Typography style={styles.title}>Sticker Collection</Typography>
        </Card>

    )
}

export default withStyles(styles)(Stickers)
