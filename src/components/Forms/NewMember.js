import React from "react"
import { Button, TextField } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RadioGroupButtons from '../RadioGroupButtons';

export default function NewMemberForm(props) {
    const {
        initialValues,
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldTouched
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <br/>
            <Typography variant="caption" color={'error'}>* Indicates required field</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={!!initialValues.fname}
                        defaultValue={initialValues.fname}
                        label="First Name*"
                        autoComplete="given-name"
                        helperText={touched.fname ? errors.fname : ""}
                        error={touched.fname && Boolean(errors.fname)}
                        id="fname"
                        onChange={change.bind(null, "fname")}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled={!!initialValues.lname}
                        defaultValue={initialValues.lname}
                        label="Last Name*"
                        autoComplete="family-name"
                        helperText={touched.lname ? errors.lname : ""}
                        error={touched.lname && Boolean(errors.lname)}
                        id="lname"
                        onChange={change.bind(null, "lname")}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        disabled={!!initialValues.email}
                        defaultValue={initialValues.email}
                        label="Email Address*"
                        autoComplete="email"
                        helperText={touched.email ? errors.email : ""}
                        error={touched.email && Boolean(errors.email)}
                        id="email"
                        onChange={change.bind(null, "email")}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Student Number*"
                        helperText={touched.id ? errors.id : ""}
                        error={touched.id && Boolean(errors.id)}
                        id="id"
                        onChange={change.bind(null, "id")}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <RadioGroupButtons
                        {...props}
                        otherOption={true}
                        options={["Arts", "Commerce", "Science", "Engineering", "Kinesiology", "Land and Food Systems", "Forestry"]}
                        groupName={"faculty"}
                        displayName={"Faculty*"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <RadioGroupButtons
                        {...props}
                        otherOption={false}
                        options={["1st Year", "2nd Year", "3rd Year", "4th Year", "5+ Year"]}
                        groupName={"year"}
                        displayName={"Level of study*"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <RadioGroupButtons
                        {...props}
                        otherOption={true}
                        options={["None", "Vegetarian", "Vegan", "Gluten Free"]}
                        groupName={"diet"}
                        displayName={"Dietary restrictions*"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <RadioGroupButtons
                        {...props}
                        otherOption={false}
                        options={["Male", "Female", "Other/Prefer not to say"]}
                        groupName={"gender"}
                        displayName={"Gender"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <RadioGroupButtons
                        {...props}
                        otherOption={true}
                        options={["Facebook", "Boothing", "Friends", "BizTech Newsletter", "Faculty Newsletter"]}
                        groupName={"heardFrom"}
                        displayName={"How did you hear about UBC BizTech?"}
                    />
                </Grid>

            </Grid>
            <br></br>
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                Submit
            </Button>
        </form>
    )
}
