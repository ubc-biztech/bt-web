import React, { Component } from 'react'
import { DataTable } from 'carbon-components-react';
import './Home.scss';

export default class Sheet extends Component {
  constructor(props) {
    super(props)
    if (this.props.users) {
      this.state = {
        users: Object.keys(this.props.users)
      }
    }
  }

  render() {
    return (
      <div>
        <p>hi</p>
        <DataTable
        rows={this.state.users}
        headers={[
          {key: 'name',header: 'Name'},
          {key: 'protocol',header: 'Protocol'},
          {key: 'port',header: 'Port'},
        ]}
        useZebraStyles={false}
        size={null}
        stickyHeader={false}
      />
    </div>
    )
  }

}
