import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { setUser } from "../../actions/UserActions";
import { connect } from "react-redux"
import Typography from '@material-ui/core/Typography';
import {ReactComponent as House} from './house.svg';
import TextField from '@material-ui/core/TextField';
import { QRCode } from "react-qr-svg"; 
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'; 
import OutlinedPencil from '@material-ui/icons/CreateOutlined';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { fetchBackend } from '../../utils'




const useStyles = makeStyles(theme => ({
    profilePageContainer: {
        maxWidth: '1200px', 
        display: 'flex',
        flexWrap: 'wrap',
        margin: 'auto',
        padding: '14px'
    },
    column: {
        flex: 1,
    },
    profileCard: {
        height: 680,
    }, 
    header: {
        width: '100%',
        fontSize: 36, 
        fill: 'solid', 
        fontStyle: 'bold',
        paddingBottom: 20,
    }, 
    house: {
        paddingTop: 60,
        marginLeft: 135,
    }, 
    houseLine:{
        width: "70%"
    }, 
    memberName: {
        fontStyle: 'normal',
        fontSize: 48, 
        fill: 'solid', 
        textAlign: 'center'
    }, 
    label: {
        fontStyle: 'normal', 
        fontSize: 36,
        fill: 'solid', 
        fontWeight: 'bold'
    },
    profileInformationContainer: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
    }, 
    infoBox: {
        paddingLeft: 70,
        paddingBottom: 10,
        display: 'flex', 
        flexdirection: 'row', 
    }, 
    infoLabel: {
        fontStyle: 'normal', 
        fill: 'solid', 
        fontSize: 24,
        fontWeight: 'bold', 
        color: '#AEC4F4',
    }, 
    infoValue: {
        fontStyle: 'normal', 
        fill: 'solid', 
        fontSize: 20,
        color: '#AEC4F4', 
    },
    pencilIcon: {
        color: '#AEC4F4'
    }, 
    icon: {
        marginLeft: 'auto',
        paddingRight: 70, 
    },
    submitButton: {
        color: '#AEC4F4', 
        variant: "contained"
    }, 
    button: {
        marginLeft: 'auto',
        paddingRight: 70, 
    }, 

    eventCard: {
        height: 495,
        marginLeft: 40, 
    }, 

    membershipCard: {
        marginLeft: 40,
    },
    
    membershipCardContent: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-around",
        paddingTop: 30,
    }, 
    membershipCardEventNumber: {
        fontWeight: "bold",
        fontSize: 20,  
    }, 
    membershipCardYear: {
        fontWeight: "bold",
        fontSize: 20, 
    }, 
    membershipCardEventNumberText: {
        display: "flex", 
        flexDirection: "row",
        paddingTop: 30,

    }, 
    qr: {
        bgColor: "#FFFFFF",
        fgColor: "#000000",
        level: "Q",
        width: 150, 
        height: 110, 
        paddingTop: 30,
    },
    eventsContent: {
        display: "flex", 
        flexDirection: "column",
        justifyContent: "space-between",
        paddingLeft: 25,
        paddingTop: 30
    }, 
    eventLabel: {
        color: '#96FF50', 
        fontSize: 26, 
        fontWeight: "bold", 
        paddingTop: 25,
    }, 
    eventValue: {
        color: '#AEC4F4',
        fontSize: 26,
    }
}));

function MemberProfile(props) {
    const [isEditingID, setIsEditingID] = React.useState(false); 
    const [isEditingFaculty, setIsEditingFaculty] = React.useState(false);
    const [isEditingEmail, setIsEditingEmail] = React.useState(false);
    const [isEditingDiet, setIsEditingDiet] = React.useState(false);
    const [ID, setID] = React.useState(props.user.id); 
    const [Faculty, setFaculty] = React.useState(props.user.faculty); 
    const [Email, setEmail] = React.useState(props.user.email);
    const [Diet, setDiet] = React.useState(props.user.diet); 
    const Fname = React.useState(props.user.fname); 
    const Lname = React.useState(props.user.lname); 
    const Year = React.useState(props.user.level); 
    const Gender = React.useState(props.user.gender); 

    const body = {
        email: Email,
        fname: Fname,
        lname: Lname,  
        id: ID, 
        faculty: Faculty, 
        year: Year, 
        diet: Diet,
        gender: Gender
      };

    
    const handleEdit = (type) => {
        if (type === 'ID') {
            if (isEditingID) {
                fetchBackend(`/users/${props.user.id}`, 'PATCH' , body).then(response =>
                    console.log(response))
            }
            setIsEditingID(!isEditingID);  
        } else if (type === 'Faculty') {
            if (isEditingFaculty) {
                fetchBackend(`/users/${props.user.id}`, 'PATCH' , body).then(response =>
                    console.log(response))
                }
            setIsEditingFaculty(!isEditingFaculty); 
        } else if (type === 'Email') {
            if (isEditingEmail) {
                fetchBackend(`/users/${props.user.id}`, 'PATCH' , body).then(response =>
                    console.log(response))
                }
            setIsEditingEmail(!isEditingEmail); 
        } else {
            if (isEditingDiet) {
                fetchBackend(`/users/${props.user.id}`, 'PATCH' , body).then(response =>
                    console.log(response))
                }
            setIsEditingDiet(!isEditingDiet); 
        }
    }

    const handleChange = (type, value) => {
        if (type === 'ID') {
            setID(value); 
        } else if (type === 'Faculty') {
            setFaculty(value); 
        } else if (type === 'Email') {
            setEmail(value); 
        } else {
            setDiet(value); 
        }
    }

    console.log(props.user); 
    const classes = useStyles(); 
    return (
        <div className={classes.profilePageContainer}>
            <Typography className={classes.header} variant='h1'>
                Profile
            </Typography>
            <div className={classes.column}>
                 <Card className={classes.profileCard}>
                     <div className={classes.house}>
                         <div> 
                        <House/>
                        </div>
                        <div className={classes.houseLine}>
                        <hr></hr>
                        </div>
                    </div>
                        <Typography className={classes.memberName}>
                            {props.user.fname} {props.user.lname}
                        </Typography>
                <div className={classes.profileInformationContainer}>
                    <div className={classes.infoBox}>
                        <React.Fragment>
                            {
                            !isEditingID ? 
                            <React.Fragment>
                            <div>
                                <Typography className={classes.infoLabel}>
                                    Student ID
                                </Typography>
                                <Typography className={classes.infoValue}>
                                    {ID}
                                </Typography>
                            </div>
                            <div className={classes.icon}>
                                <IconButton onClick={() => handleEdit('ID')}>
                                    <OutlinedPencil className={classes.pencilIcon}/>   
                                </IconButton>
                            </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <div>
                                <TextField
                                    id="standard-helperText"
                                    label="Student ID"
                                    value={ID}
                                    inputProps={{maxLength:8}}
                                    onChange={event => {
                                        handleChange('ID', event.target.value)}
                                    }
                                />
                                </div>
                                <div className={classes.button}>
                                <Button onClick={() => handleEdit('ID')} className={classes.submitButton}>
                                    Submit
                                </Button>
                                </div>
                            </React.Fragment>
                            }
                        </React.Fragment>
                    </div>
                    <div className={classes.infoBox}>
                        <React.Fragment> 
                            { 
                            !isEditingFaculty ?
                            <React.Fragment>
                            <div>
                                <Typography className={classes.infoLabel}>
                                Faculty
                                </Typography> 
                                <Typography className={classes.infoValue} >
                                {Faculty}
                                </Typography>
                            </div>
                            <div className={classes.icon}>
                                <IconButton onClick={() => handleEdit('Faculty')}>
                                <OutlinedPencil className={classes.pencilIcon}/>   
                                </IconButton> 
                            </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <div>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">Faculty</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Faculty}
                                        onChange={event => {
                                            handleChange('Faculty', event.target.value)}
                                        }>
                                        <MenuItem value={"Arts"}>Arts</MenuItem>
                                        <MenuItem value={"Commerce"}>Commerce</MenuItem>
                                        <MenuItem value={"Science"}>Science</MenuItem>
                                        <MenuItem value={"Engineering"}>Engineering</MenuItem>
                                        <MenuItem value={"Kinesiology"}>Kinesiology</MenuItem>
                                        <MenuItem value={"Land and Food Systems"}>Land and Food Systems</MenuItem>
                                        <MenuItem value={"Forestry"}>Forestry</MenuItem>
                                        </Select>
                                </FormControl>
                                </div> 
                                <div className={classes.button}>
                                <Button onClick={() => handleEdit('Faculty')} className={classes.submitButton}>
                                    Submit
                                </Button>
                                </div> 
                            </React.Fragment>
                            }
                        </React.Fragment>
                    </div>
                    <div className={classes.infoBox}>
                        <React.Fragment>
                            {
                            !isEditingEmail ?
                                <React.Fragment>
                                    <div>
                                        <Typography className={classes.infoLabel}>
                                            Email
                                        </Typography> 
                                        <Typography className={classes.infoValue}>
                                            {Email}
                                        </Typography>
                                    </div>
                                    <div onClick={() => handleEdit('Email')} className={classes.icon}>
                                            <IconButton>
                                            <OutlinedPencil className={classes.pencilIcon}/>   
                                            </IconButton> 
                                    </div>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <div>
                                        <TextField
                                            id="standard-helperText"
                                            label="Email"
                                            value={Email}
                                            onChange={event => {
                                                handleChange('Email', event.target.value)}
                                            }
                                        />
                                    </div>
                                <div className={classes.button}>
                                <Button onClick={() => handleEdit('Email')} className={classes.submitButton}>
                                    Submit
                                </Button>
                                </div> 
                                </React.Fragment>

                            }
                        </React.Fragment>
                    </div>
                    <div className={classes.infoBox}>
                        <React.Fragment>
                            {
                            !isEditingDiet ?
                            <React.Fragment>
                           <div>
                                <Typography className={classes.infoLabel}>
                                    Dietary Preference 
                                </Typography> 
                                <Typography className={classes.infoValue}>
                                    {Diet}
                                </Typography>
                            </div>
                            <div onClick={() => handleEdit('Diet')} className={classes.icon}>
                                <IconButton>
                                <OutlinedPencil className={classes.pencilIcon}/>   
                                </IconButton> 
                            </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <div>
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">Dietary Preference</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={Diet}
                                            onChange={event => {
                                                handleChange('Diet', event.target.value)}
                                            }>
                                            <MenuItem value={"None"}>None</MenuItem>
                                            <MenuItem value={"Vegetarian"}>Vegetarian</MenuItem>
                                            <MenuItem value={"Vegan"}>Vegan</MenuItem>
                                            <MenuItem value={"Gluten Free"}>Gluten Free</MenuItem>
                                            </Select>
                                    </FormControl>
                                </div>
                                <div className={classes.button}>
                                    <Button onClick={() => handleEdit('Diet')} className={classes.submitButton}>
                                        Submit
                                    </Button>
                                </div> 
                            </React.Fragment>
                            }
                        </React.Fragment>
                    </div>
                </div>
            </Card>
        </div>

            <div className={classes.column}>
                <div className={classes.membershipCard}>
                    <Card className={classes.card}>
                        <div className={classes.membershipCardContent}>
                            <div>
                                <Typography className={classes.label}>
                                    Membership Card
                                </Typography>
                            <div className={classes.membershipCardEventNumberText}>
                                <Typography className={classes.membershipCardEventNumber} style={{color: '#96FF50'}}>
                                    15  
                                </Typography>
                            <div style={{paddingLeft: 4}}>
                                <Typography style={{color: '#AEC4F4', fontSize: 20}}>
                                    events attended
                                </Typography>
                            </div>
                            </div>
                            </div>

                            <div>
                                <QRCode className={classes.qr}/>
                            </div>
                       </div>
                    </Card>
                </div>

                <div style={{paddingTop: 40}}>
                    <Card className={classes.eventCard}>
                        <div className={classes.eventsContent}>
                            <div>
                                <Typography className={classes.label}>
                                    Events
                                </Typography>
                            </div>
                            <div>
                                <div>
                                <Typography className={classes.eventLabel}>
                                    Most Recent
                                </Typography>
                                <Typography className={classes.eventValue}>
                                    Coding for Noobs
                                </Typography>
                                </div>
                                <div>
                                <Typography className={classes.eventLabel}>
                                    Favourite
                                </Typography>
                                <Typography className={classes.eventValue}>
                                    Blueprint
                                </Typography>
                                </div>
                                <div>
                                <Typography className={classes.eventLabel}>
                                    Favourite
                                </Typography>
                                <Typography className={classes.eventValue}>
                                    Innovation Night
                                </Typography>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      user: state.userState.user,
    };
  };
  
  export default connect(mapStateToProps, { setUser })(MemberProfile);