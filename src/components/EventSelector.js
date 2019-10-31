import React, { Component } from 'react'

export default class EventSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: this.props.events
    }
    this.handleChange = this.handleChange.bind(this);
}
    createDropdownItems(){
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
      if (event.target.value !== -1) {
        // this.setState({selected: event.target.value});
        window.location = '/?event=' + this.state.events[event.target.value].id
      }
    }

    render() {
      let events = this.state.events;

      if (events === null){
        return (
          <div>
            <p>Loading...</p>
          </div>
      )}
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

        </div>
        );
      }
  }
}
