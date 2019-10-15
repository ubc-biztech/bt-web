import React, { Component } from 'react'

export default class Sheet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [
        {
          id: '81233',
          name: 'ian mah'
        }
      ]
    }
    console.log(this.state)
  }

  render() {
    return (
      <div>
        {this.state.users.map(user => {
          return <p>{user.name}</p>
        })}
      </div>
    )
  }

}
