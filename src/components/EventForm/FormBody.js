import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import MuiThemeProvider from '@material-ui/styles/MuiThemeProvider' //TODO - IMPLEMENT THIS

// form parts
import RadioGroupButtons from './formParts/RadioGroupButtons';

const textFieldLabelFontSize = "17px";

export default function MyFormBody(props) {
  var state = {
    textFields: {
      firstName: '',
      lastName: '',
      emailAddress: ''
    }
  }
  

  // onSubmit = (e) => {
  //     e.preventDefault(); //prevent default submission to a file
  //     this.props.addTodo(this.state.title);
  //     this.setState({title: ''});
  // }

  const onChange = (e) => {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // render() { 
    return (
      <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Ever wanted to learn how to code, but don't know where to start? Ready to gain practical skills and level-up your technical understanding? UBC BizTech and Lighthouse Labs invite you to join the beginner-friendly Python coding lesson - Coding For Noobs! 
            📲 Please bring your Mac or PC to participate in the workshop.
            Event Details:
            😁 Who: YOU, any students of any faculty who are interested in learning Python, and professional instructors from Lighthouse Labs
            🏢 Where: Henry Angus Building, Room 295
            📅 When: Monday, November 6th from 5:30 - 8:30pm
            💸 Cost: This event is FREE for BizTech Members. Non-members can purchase membership upon sign-in at the event.
          </Typography>
        <h4 style={{color: 'red'}}>
          *Required
        </h4>
        <Grid container spacing={3}>
          
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              InputLabelProps={{style: {fontSize: textFieldLabelFontSize}}}
              // inputProps={{style: {fontSize: "50px"}}} //to change the style of the text u type
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              InputLabelProps={{style: {fontSize: textFieldLabelFontSize}}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="emailAddress"
              name="emailAddress"
              label="Email Address"
              fullWidth
              autoComplete="email"
              InputLabelProps={{style: {fontSize: textFieldLabelFontSize}}}
            />
          </Grid>
          {/* TODO: make required for my custom radio group. TODO: make other field in radio buttons */}
          <Grid item xs={12} sm={6}>
            <RadioGroupButtons 
              buttonOptions={["Arts","Commerce","Science","Engineering","Kineseology","Land and Food Systems","Forestry", "Other:"]}
              radioGroupTitle={"Faculty"}/>  
          </Grid>
          <Grid item xs={12} sm={6}>
            <RadioGroupButtons 
              buttonOptions={["1st Year","2nd Year","3rd Year","4th Year","5+ Year", "Other:"]}
              radioGroupTitle={"Year"}/>  
          </Grid>
          <Grid item xs={12} sm={6}>
            <RadioGroupButtons 
              buttonOptions={["Facebook","Boothing","Friends","BizTech_Newsletter","Faculty_Newsletter","Other:"]}
              radioGroupTitle={"How did you hear about this event?"}/>  
          </Grid>
          <Grid item xs={12} sm={6}>
            <RadioGroupButtons 
              buttonOptions={["No","Other:"]}
              radioGroupTitle={"Do you have any dietary restrictions? If yes, please specify in 'Other'"}/>  
          </Grid>

        </Grid>
      </React.Fragment>
    );
  // }
} 

// export default MyFormBody

