import React, { Component } from 'react'
import { Loading } from 'carbon-components-react';
import './Home.scss';
import Sheet from './Sheet';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
      selected: -1,
    }
    this.handleChange = this.handleChange.bind(this);
}
  componentDidMount() {
    fetch(process.env.REACT_APP_AMAZON_API+"/events/get", {
    })
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        events: response
      })
      console.log(this.state.events)
    })
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
      this.setState({selected: event.target.value});
    }
  }

  render() {
    let events = this.state.events;
    let index = this.state.selected;

    if (events === null){
      return (
        <div className="Home">
          <Loading withOverlay={false}/>
        </div>
    )}
    else if (index === -1) {
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
    } else {
      return (
        <div>
          <h1>Events Check-in</h1>

      <form>
      <label>
          Select Event:
          <select value={this.state.selected} onChange={this.handleChange}>
          {this.createDropdownItems()}
          </select>
      </label>
      </form>
      <p># Registered: {events[index].regNum}</p>
      <p># Checked In: {events[index].checkedNum}</p>
      <p># Waitlisted: {events[index].waitNum}</p>
      <Sheet users={events[index].users}/>
      </div>
      );
    }
  }
}
