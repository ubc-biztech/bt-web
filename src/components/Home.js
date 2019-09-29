import React, { Component } from 'react'

export default class Home extends Component {
  state = {
    events: null,
  }
    componentDidMount() {
      fetch(process.env.REACT_APP_AMAZON_API+"/events/get", {
      })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          events: response
        })
        console.log(response)
        console.log(this.state.events)
      })
    }

    render() {
      if (this.state.events === null){
        return (
          <div>
            <p>Loading...</p>
          </div>
      )}
      else {
        return (
          <div>
            <h1>Events</h1>
            {this.state.events.map(event => <p>{event.ename}</p>)}
          </div>
        );
      }
  }
}
