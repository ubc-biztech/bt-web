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
    
    return optionsArr.map((option) => (option==='Other:') ?
        <React.Fragment>
          <FormControlLabel value={option} control={<Radio/>} label={option} /> 
          <TextField
                required
                id="otherOption"
                name="otherOption"
                label=""
          />
        </React.Fragment> :
        <FormControlLabel value={option} control={<Radio/>} label={option} />
      );
    }
    
    
    render() { return (
    <ThemeProvider theme={theme}>
      <FormControl component="fieldset">
        <FormLabel component="legend" style={{fontSize: radioGroupLabelFontSize}}>{this.props.radioGroupTitle}</FormLabel>
        {/* <RadioGroup defaultValue={this.buttonOptions[0]} aria-label={this.radioGroupTitle} name={this.radioGroupTitle}> */}
        <RadioGroup defaultValue={this.props.buttonOptions[0]}>
          {this.createButtons(this.props.buttonOptions)}
        </RadioGroup>
      </FormControl>
    </ThemeProvider>
  );
} }

export default RadioGroupButtons
