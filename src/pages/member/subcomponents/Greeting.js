import React from 'react'
import Typography from '@material-ui/core/Typography'
import House from '../images/house.svg'

const styles = {
    page: {
        width: '719px',
        background: 'rgb(174, 196, 244, 0.19',
        borderRadius: '20px',
        marginLeft: '85px',
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
        top: '103px'
    }
}

function Greeting(props) {
    return (
        <div style={styles.page}>
            <div>
                <Typography style={styles.title}>Hi {props.user.fname}!</Typography>
                <Typography style={styles.reward}>You are X events away from a reward!</Typography>
            </div>

            <img src={House} style={styles.house} alt='BizTech House' />
        </div>
    )
}

export default Greeting
