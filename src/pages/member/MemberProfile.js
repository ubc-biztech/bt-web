import React from 'react';
import { makeStyles, useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { setUser } from "../../actions/UserActions";
import { connect } from "react-redux"
import { Auth } from 'aws-amplify'
import Typography from '@material-ui/core/Typography';
import House from '../../assets/house.svg'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'; 
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import OutlinedPencil from '@material-ui/icons/CreateOutlined';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ProfileHouse from '../../assets/profileHouse.svg'
import { fetchBackend, updateEvents } from '../../utils'



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
        minWidth: '281px'
    },
    profileCard: {
        height: 680,
    }, 
    profileBox: {
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center'
    }, 
    MobileProfileCard: {
        color: '#283552',
    }, 
    header: {
        width: '100%',
        fontSize: 36, 
        fill: 'solid', 
        fontStyle: 'bold',
        paddingBottom: 20,
        color: '#96FF50'
    }, 
    house: {
        paddingTop: 60,
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
    line: {
        backgroundColor: 'blue',
        color: 'blue', 
        height: 0.25
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
    profileID: {
        display: 'flex', 
        direction: 'row',
        justifyContent: 'space-between'
    }, 
    MobileInfoLabel: {
        fontStyle: 'normal', 
        fill: 'solid', 
        fontSize: 15,
        fontWeight: 'bold', 
        color: '#AEC4F4',
        paddingTop: 10, 
        paddingLeft: 26,
    }, 
    MobileInfoValue: {
        fontStyle: 'normal', 
        fill: 'solid', 
        fontSize: 15,
        color: '#AEC4F4', 
        paddingLeft: 26
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
    infoIcon: {
        color: '#AEC4F4', 
        variant: "contained"
    },
    MobileIcon: {
        paddingRight: 40,
    },
    membershipCardContent: {
        display: "flex", 
        flexDirection: "row", 
        paddingLeft: 25,
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
        paddingTop: 40,
    }, 
    eventValue: {
        color: '#AEC4F4',
        fontSize: 26,
    }
}));


function MemberProfile(props) {
    const [isEditing, setIsEditing] = React.useState(false); 
    const [ID] = React.useState(props.user.id); 
    const [Faculty, setFaculty] = React.useState(props.user.faculty); 
    const [Email, setEmail] = React.useState(props.user.email);
    const [Diet, setDiet] = React.useState(props.user.diet); 
    const [eventsAttended, setEventsAttended] = React.useState();
    const [recentEvent, setRecentEvent] = React.useState();
    const [favouriteEventName1, setFavouriteEventName1] = React.useState()
    const [favouriteEventName2, setFavouriteEventName2] = React.useState() 
    // Won't work unless I pass in Year param exactly like this
    const Year = React.useState(props.user.level); 
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    const body = {
        email: Email,
        fname: props.user.fname,
        lname: props.user.lname,  
        id: ID, 
        faculty: Faculty, 
        year: Year, 
        diet: Diet,
        gender: props.user.gender,
      };
    
    const handleEdit = () => {
            if (isEditing) {
                fetchBackend(`/users/${props.user.id}`, 'PATCH' , body).then(response =>
                    console.log(response))
            }
            setIsEditing(!isEditing);  
    }

    const handleChange = (type, value) => {
        if (type === 'Faculty') {
            setFaculty(value); 
        } else if (type === 'Email') {
            setEmail(value); 
        } else {
            setDiet(value); 
        }
    }

    const logout = () => {
        Auth.signOut()
          .then(() => {
            props.logout()
          })
          .catch(err => console.log(err))
      }

      const cardTheme = createMuiTheme({
          overrides: {
              MuiCard: {
                  root: {
                      background: '#283552',
                  }
              }
          }
      })
       
    const getRecentEvent = async () => {
        const params = new URLSearchParams({
            id: props.user.id
          })
        fetchBackend(`/registrations?${params}`, 'GET')
          .then(async response => {
            if (response && response.size > 0) {
                if (props.events) {
                    var recentEventChecker = ""
                    var eventsAttendedCounter = 0
                    props.events.forEach(event => {
                        const index = response.data.findIndex(registration => registration.eventID === event.id)
                        if (index !== -1) {
                        // checks if they have checked in at the event
                            var recentEventCheckedInChecker = (response.data[index].registrationStatus === 'checkedIn')
                            
                            if (recentEventCheckedInChecker) { 
                                eventsAttendedCounter = eventsAttendedCounter + 1
                                if (recentEventChecker === "") {
                                    setRecentEvent(event.ename)
                                }
                                recentEventChecker = "exists"
                            } 
                        }
                    })
                    if (recentEventChecker === "") {
                        setRecentEvent('None Registered!')
                    }
                    setEventsAttended(eventsAttendedCounter)
                } 
            } else {
              setRecentEvent('None Registered!')
            }
          })
          .catch((error) => {
            setRecentEvent('None Registered!')
          })
        }

        const getFavouriteEvents = () => {
              fetchBackend(`/users/${props.user.id}`, 'GET')
               .then(async response => {
                     const favouriteEventIDs = response.favedEventsID
                        props.events && props.events.forEach(event => {
                        if (favouriteEventIDs.length >= 2) {
                           if (event.id === favouriteEventIDs[0]) {
                                setFavouriteEventName1(event.ename)
                           } else if (event.id === favouriteEventIDs[1]) {
                                setFavouriteEventName2(event.ename)
                        }
                    } else if (favouriteEventIDs.length === 1) {
                          if (event.id === favouriteEventIDs[0]) {
                              setFavouriteEventName1(event.ename)
                        }
                    } 
                })
            })
        }
        

   
      if (!props.events) {
        updateEvents();
      }
    
      if (props.user.id && !recentEvent && !favouriteEventName1) {
            getFavouriteEvents();
            getRecentEvent();
      }



    const classes = useStyles(); 
    return (
        <div className={classes.profilePageContainer}>
            <Typography className={classes.header} variant='h1'>
                Profile
            </Typography>
            <div className={classes.column}>

                {isMobile ?
                   <div >
                       <div className={classes.profileBox}>
                            <div>
                                <img src={ProfileHouse} alt='BizTech Profile House'/>
                            </div>
                            <Typography className={classes.memberName}>
                                {props.user.fname} {props.user.lname}
                            </Typography>
                            {isEditing ? 
                                <Button onClick={handleEdit} style={{color:'#96FF50'}}>Submit</Button> 
                            :
                                <Button onClick={handleEdit} style={{color:'#96FF50'}}>Edit Profile</Button>
                            }
                        </div>

                        <div style={{paddingTop: 20}}>
                        {isEditing ? 
                            <ThemeProvider theme={cardTheme}>
                                <Card className={classes.MobileProfileCard}>
                                        <div className={classes.MobileInfoLabel}>
                                            <div className={classes.profileID}>
                                                <div>
                                                    <TextField
                                                        InputLabelProps={{
                                                            style: {color: '#AEC4F4', fontWeight: 'bold'}
                                                        }}
                                                        id="standard-read-only-input"
                                                        label="Student ID"
                                                        value={ID}
                                                        inputProps={{readOnly:true, style: {color: '#FFFFFF'}}}
                                                    />
                                                </div>
                                                <div className={classes.MobileIcon}>
                                                    <Tooltip title="Contact a BizTech executive your student number is incorrect">
                                                        <InfoOutlinedIcon className={classes.infoIcon}></InfoOutlinedIcon>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={classes.MobileInfoLabel}>
                                            <FormControl>
                                                <InputLabel style={{color: '#AEC4F4', fontWeight: 'bold'}} id="demo-simple-select-label">Faculty</InputLabel>
                                                    <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    style={{color: '#FFFFFF'}}
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
                                        <div className={classes.MobileInfoLabel}>
                                            <TextField
                                                InputLabelProps={{
                                                    style: {color: '#AEC4F4', fontWeight: 'bold'}
                                                }}
                                                id="standard-helperText"
                                                label="Email"
                                                value={Email}
                                                inputProps={{style: {color: '#FFFFFF'}}}
                                                onChange={event => {
                                                    handleChange('Email', event.target.value)}
                                                }
                                            />
                                        </div> 
                                        <div className={classes.MobileInfoLabel}>
                                            <FormControl>
                                                <InputLabel style={{color: '#AEC4F4', fontWeight: 'bold'}} id="demo-simple-select-label">Dietary Preference</InputLabel>
                                                    <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    style={{color: '#FFFFFF'}}
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
                                </Card>
                            </ThemeProvider>
                            :
                            <ThemeProvider theme={cardTheme}>
                                <Card className={classes.MobileProfileCard} >
                                    <Typography className={classes.MobileInfoLabel}>
                                        Student ID
                                    </Typography>
                                    <Typography className={classes.MobileInfoValue}>
                                        {ID}
                                    </Typography>
                                    <hr className={classes.line}></hr>                                   
                                    <Typography className={classes.MobileInfoLabel}>
                                    Faculty
                                    </Typography> 
                                    <Typography className={classes.MobileInfoValue} >
                                    {Faculty}
                                    </Typography>
                                    <hr className={classes.line}></hr>
                                    <Typography className={classes.MobileInfoLabel}>
                                        Email
                                    </Typography> 
                                    <Typography className={classes.MobileInfoValue}>
                                        {Email}
                                    </Typography>
                                    <hr className={classes.line}></hr>
                                    <Typography className={classes.MobileInfoLabel}>
                                        Dietary Preference 
                                    </Typography> 
                                    <Typography className={classes.MobileInfoValue}>
                                        {Diet}
                                    </Typography>
                                </Card>
                            </ThemeProvider>
                        }
                    </div>
                   </div>
                :
                    <Card className={classes.profileCard}>
                        <div>
                            <div className={classes.profileBox}>
                                <div className={classes.house}>
                                    <img src={House} alt='BizTech Profile House'/>
                                </div>

                                <Typography className={classes.memberName}>
                                    {props.user.fname} {props.user.lname}
                                </Typography>
                            </div>

                            <div className={classes.profileInformationContainer}>
                                    <React.Fragment>
                                        {
                                        !isEditing ? 
                                        <React.Fragment>
                                        <div className={classes.infoBox}>
                                            <div>
                                                <Typography className={classes.infoLabel}>
                                                    Student ID
                                                </Typography>
                                                <Typography className={classes.infoValue}>
                                                    {ID}
                                                </Typography>
                                            </div>
                                            <div className={classes.icon}>
                                                <IconButton onClick={() => handleEdit()}>
                                                    <OutlinedPencil className={classes.pencilIcon}/>   
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div className={classes.infoBox}>
                                            <div>
                                                <Typography className={classes.infoLabel}>
                                                Faculty
                                                </Typography> 
                                                <Typography className={classes.infoValue} >
                                                {Faculty}
                                                </Typography>
                                            </div> 
                                        </div>
                                        <div className={classes.infoBox}>
                                            <div>
                                                <Typography className={classes.infoLabel}>
                                                    Email
                                                </Typography> 
                                                <Typography className={classes.infoValue}>
                                                    {Email}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.infoBox}>
                                            <div>
                                                <Typography className={classes.infoLabel}>
                                                    Dietary Preference 
                                                </Typography> 
                                                <Typography className={classes.infoValue}>
                                                    {Diet}
                                                </Typography>
                                            </div>
                                        </div>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                        <div className={classes.infoBox}>
                                            <div>
                                                <TextField
                                                    id="standard-read-only-input"
                                                    label="Student ID"
                                                    value={ID}
                                                    InputLabelProps={{
                                                        style: {fontSize: 16, fontWeight: 'bold'}
                                                    }}
                                                    inputProps={{readOnly:true}}
                                                />
                                            </div>
                                            <div className={classes.button}>
                                            <Button onClick={() => handleEdit()} className={classes.submitButton}>
                                                Submit
                                            </Button>
                                            <Tooltip title="Contact a BizTech executive your student number is incorrect">
                                                <InfoOutlinedIcon className={classes.infoIcon}></InfoOutlinedIcon>
                                            </Tooltip>
                                            </div>
                                        </div>
                                        <div className={classes.infoBox}>
                                            <div>
                                                    <FormControl>
                                                        <InputLabel style={{fontSize: 16, fontWeight: 'bold'}} id="demo-simple-select-label">Faculty</InputLabel>
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
                                        </div> 
                                        <div className={classes.infoBox}>
                                            <div>
                                                    <TextField
                                                        id="standard-helperText"
                                                        label="Email"
                                                        value={Email}
                                                        InputLabelProps={{
                                                            style: {fontSize: 16, fontWeight: 'bold'}
                                                        }}
                                                        onChange={event => {
                                                            handleChange('Email', event.target.value)}
                                                        }
                                                    />
                                            </div> 
                                        </div>
                                        <div className={classes.infoBox}>
                                            <div>
                                                    <FormControl>
                                                        <InputLabel style={{fontSize: 16, fontWeight: 'bold'}} id="demo-simple-select-label">Dietary Preference</InputLabel>
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
                                        </div>
                                        </React.Fragment>
                                        }
                                    </React.Fragment>
                                </div>
                            </div>
                    </Card>
                }
            </div>


            <div className={classes.column}>
                <div style={isMobile ? {marginLeft: 0, paddingTop: 36} : {marginLeft: 40}}>
                    <Card>
                        <div className={classes.membershipCardContent}>
                            <div>
                                <Typography className={classes.label}>
                                    Membership
                                </Typography>
                            <div className={classes.membershipCardEventNumberText}>
                                <Typography className={classes.membershipCardEventNumber} style={{color: '#96FF50'}}>
                                    {eventsAttended}
                                </Typography>
                            <div style={{paddingLeft: 4}}>
                                <Typography style={{color: '#AEC4F4', fontSize: 20}}>
                                    events attended
                                </Typography>
                            </div>
                            </div>
                            </div>
                       </div>
                    </Card>
                </div>

                <div style={isMobile ? {paddingTop: 36} : {paddingTop: 40}}>
                    <Card style={isMobile? { height: 535 , marginLeft: 0 } : { height: 495, marginLeft: 40}}>
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
                                   {recentEvent}
                                </Typography>
                                </div>
                                <div>
                                <Typography className={classes.eventLabel}>
                                    Favourite
                                </Typography>
                                <Typography className={classes.eventValue}>
                                    {favouriteEventName1 || "None Favourited!"}
                                </Typography>
                                </div>
                                <div>
                                <Typography className={classes.eventLabel}>
                                    Favourite
                                </Typography>
                                <Typography className={classes.eventValue}>
                                    {favouriteEventName2 || "None Favourited!"}
                                </Typography>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

            {isMobile && 
                <div style={{paddingTop: 36}}>
                    <Button 
                    onClick={logout}
                    variant="contained">Sign Out</Button>
                </div>
            }

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      user: state.userState.user,
      events: state.pageState.events
    };
  };
  
  export default connect(mapStateToProps, { setUser })(MemberProfile);;