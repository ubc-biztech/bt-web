import React, { Component } from 'react'
import { setEvent } from "../actions/indexActions";
import { connect } from "react-redux";
import { Authenticate } from './Authentication'

class EventSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: this.props.events
    }
    this.handleChange = this.handleChange.bind(this);
  }
  createDropdownItems() {
    let items = [];
    if (this.state.events != null) {
      items.push(<option key={"-1"}
        value={-1}>{" "}
      </option>)
      for (let i = 0; i < this.state.events.length; i++) {
        items.push(<option key={i}
          value={i}>{this.state.events[i].ename}
        </option>);
      }
    }
    return items;
  }

  handleChange(event) {
    // eslint-disable-next-line
    if (event.target.value != -1) {
      this.props.setEvent(this.state.events[event.target.value])
    }
  }

  render() {
    let events = this.state.events;

    if (events === null) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
    else {
      return (
        <div>
          <h1>Events Check-in</h1>

          <form>
            <label>
              Select Event:
            <select onChange={this.handleChange}>
                {this.createDropdownItems()}
              </select>
            </label>
          </form>

          <Authenticate />

        </div>
      );
    }
  }
}

export default connect(null, { setEvent })(EventSelector);
