import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles'

const radioButtonFontSize = '15px'
const radioGroupLabelFontSize = '17px'

const theme = createMuiTheme({
  overrides: {
      MuiFormControlLabel: {
          label: {
              fontSize: radioButtonFontSize,
          }
      }
  }
});


export class RadioGroupButtons extends Component {

  createButtons(optionsArr) {
    
    return optionsArr.map((option) => 
        <FormControlLabel value={option} control={<Radio/>} label={option} />
      );
    }

    createOtherOption(addOtherOption){
      var option = "Other:"
      if (addOtherOption) {
          return (
              <React.Fragment>
                  <FormControlLabel value={option} control={<Radio/>} label={option} /> 
                  <TextField
                      // required
                      id="other_option"
                      name="other_option"
                      label=""
                      onChange={change.bind(null, "other_option")}                    
                      helperText={touched.other_option ? errors.other_option : ""}
                      error={touched.other_option && Boolean(errors.other_option)}
                      // value={other_option}
                      disabled={otherButtDisabled}
                  />
              </React.Fragment>
          )
      };
  }

  // createButtons(optionsArr) {
    
  //   return optionsArr.map((option) => (option==='Other:') ?
  //       <React.Fragment>
  //         <FormControlLabel value={option} control={<Radio/>} label={option} /> 
  //         <TextField
  //               required
  //               id="otherOption"
  //               name="otherOption"
  //               label=""
  //         />
  //       </React.Fragment> :
  //       <FormControlLabel value={option} control={<Radio/>} label={option} />
  //     );
  //   }

    
    render() { return (
    <ThemeProvider theme={theme}>
      <FormControl component="fieldset">
        {/* <FormLabel component="legend" style={{fontSize: radioGroupLabelFontSize}}>{this.props.radioGroupTitle}</FormLabel> */}
        <FormLabel component="legend" style={{fontSize: radioGroupLabelFontSize}}>{"THIS IS A LABEL from a diff comp"}</FormLabel>
        {/* <RadioGroup defaultValue={this.props.buttonOptions[0]}>
          {this.createButtons(this.props.buttonOptions)}
        </RadioGroup> */}
        <RadioGroup onChange={(e) => {this.props.toggleOtherState(e)}}> {/* TODO: I removed the default option here so form validation for a selected option needs to happen here */}
            {this.createButtons(["ANDYSTEST-POSTTEST","Commerce","Science","Forestry"])}
            {this.createOtherOption(true)}
        </RadioGroup>
      </FormControl>
    </ThemeProvider>
  );
} }

export default RadioGroupButtons


toggleOtherState