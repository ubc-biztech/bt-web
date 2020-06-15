import React from 'react'
import Typography from '@material-ui/core/Typography'

const styles = {
    page: {
        width: '719px',
        background: 'rgb(174, 196, 244, 0.19',
        borderRadius: '20px',
        marginLeft: '34px',
        marginTop: '27px',
        display: 'inline-block',
        overflow: 'hidden',
        paddingBottom: '33px'
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

function Stickers() {
    return (
        <div style={styles.page}>
            <Typography style={styles.title}>Sticker Collection</Typography>
        </div>
    )
}

export default Stickers
