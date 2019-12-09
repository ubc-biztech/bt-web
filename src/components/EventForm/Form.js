import React from "react"
import { Button, TextField } from "@material-ui/core";


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


// form parts
import RadioGroupButtons from './formParts/RadioGroupButtons';

const textFieldLabelFontSize = "17px";


export default function Form(props) {
    const {
        values: { name, email, password, confirmPassword, id, firstname, lastname },
        errors,
        touched,
        handleSubmit,
        handleChange,
        isValid,
        setFieldTouched
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    return (
        <form
            onSubmit={handleSubmit}
        >
            <TextField
                label="Email"
                autoComplete="email"
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                id="email"
                value={email}
                onChange={change.bind(null, "email")}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Name"
                autoComplete="name"
                helperText={touched.name ? errors.name : ""}
                error={touched.name && Boolean(errors.name)}
                id="name"
                value={name}
                onChange={change.bind(null, "name")}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Student ID"
                helperText={touched.id ? errors.id : ""}
                error={touched.id && Boolean(errors.id)}
                id="id"
                value={id}
                onChange={change.bind(null, "id")}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Password"
                type="password"
                autoComplete="new-password"
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                id="password"
                value={password}
                onChange={change.bind(null, "password")}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                value={confirmPassword}
                onChange={change.bind(null, "confirmPassword")}
                onKeyPress={e => handleKey(e)} />
            <br />
            <br />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
            >
                Sign up
            </Button>
            










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
                        label="First Name*"
                        autoComplete="given-name"
                        helperText={touched.firstname ? errors.firstname : ""}
                        error={touched.firstname && Boolean(errors.firstname)}
                        id="firstname"
                        value={firstname}
                        onChange={change.bind(null, "firstname")}
                        onKeyPress={e => handleKey(e)} 
                        InputLabelProps={{style: {fontSize: textFieldLabelFontSize}}}
                        fullWidth
                    />       
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Last Name*"
                        autoComplete="family-name"
                        helperText={touched.lastname ? errors.lastname : ""}
                        error={touched.lastname && Boolean(errors.lastname)}
                        id="lastname"
                        value={lastname}
                        onChange={change.bind(null, "lastname")}
                        onKeyPress={e => handleKey(e)} 
                        InputLabelProps={{style: {fontSize: textFieldLabelFontSize}}}
                        fullWidth
                    />       
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email Address*"
                        autoComplete="email"
                        helperText={touched.email ? errors.email : ""}
                        error={touched.email && Boolean(errors.email)}
                        id="email"
                        value={email}
                        onChange={change.bind(null, "email")}
                        onKeyPress={e => handleKey(e)} 
                        InputLabelProps={{style: {fontSize: textFieldLabelFontSize}}}
                        fullWidth
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
        </form>
    )

    function handleKey(e) {
        if (e.key === 'Enter')
            console.log('hi')
    }
}