import React from "react"
import { Button, TextField } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import RadioGroupButtons from './formParts/RadioGroupButtons';

const textFieldLabelFontSize = "17px";

export default function Form(props) {
    const {
        values: { email, fname, lname, id },
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldTouched
    } = props;

    console.log(props);

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    return (
        <form
            onSubmit={handleSubmit}
        >

            <h4 style={{ color: 'red' }}>
                *Required
            </h4>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="First Name*"
                        autoComplete="given-name"
                        helperText={touched.firstname ? errors.firstname : ""}
                        error={touched.firstname && Boolean(errors.firstname)}
                        id="fname"
                        value={fname}
                        onChange={change.bind(null, "fname")}
                        InputLabelProps={{ style: { fontSize: textFieldLabelFontSize } }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Last Name*"
                        autoComplete="family-name"
                        helperText={touched.lastname ? errors.lastname : ""}
                        error={touched.lastname && Boolean(errors.lastname)}
                        id="lname"
                        value={lname}
                        onChange={change.bind(null, "lname")}
                        InputLabelProps={{ style: { fontSize: textFieldLabelFontSize } }}
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
                        InputLabelProps={{ style: { fontSize: textFieldLabelFontSize } }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Student Number*"
                        helperText={touched.id ? errors.id : ""}
                        error={touched.id && Boolean(errors.id)}
                        id="id"
                        value={id}
                        onChange={change.bind(null, "id")}
                        InputLabelProps={{ style: { fontSize: textFieldLabelFontSize } }}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <RadioGroupButtons
                        {...props}
                        otherOptionRequired={true}
                        optionsArray={["Arts", "Commerce", "Science", "Engineering", "Kineseology", "Land and Food Systems", "Forestry"]}
                        groupName={"faculty"}
                        displayName={"Faculty"}
                    />

                </Grid>
                <Grid item xs={12}>
                    <RadioGroupButtons
                        {...props}
                        otherOptionRequired={true}
                        optionsArray={["1st Year", "2nd Year", "3rd Year", "4th Year", "5+ Year"]}
                        groupName={"year"}
                        displayName={"Year"}
                    />

                </Grid>
                <Grid item xs={12}>
                    <RadioGroupButtons
                        {...props}
                        otherOptionRequired={true}
                        optionsArray={["Facebook", "Boothing", "Friends", "BizTech Newsletter", "Faculty Newsletter"]}
                        groupName={"heardFrom"}
                        displayName={"How did you hear about this event?"}
                    />

                </Grid>
                <Grid item xs={12}>
                    <RadioGroupButtons
                        {...props}
                        otherOptionRequired={true}
                        optionsArray={["No"]}
                        groupName={"diet"}
                        displayName={"Do you have any dietary restrictions? If yes, please specify in 'Other'"}
                    />

                </Grid>


            </Grid>
            <br></br>
            <Button
                variant="contained"
                color="primary"
                type="submit"
            // className={classes.button} //ignore styling for now
            >
                Submit
          </Button>
        </form>
    )
}