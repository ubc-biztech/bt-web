import React, { Component } from 'react'
import { DataTable, Table, TableRow, TableBody, TableCell, TableHead, TableHeader, TableContainer } from 'carbon-components-react';
import './Home.scss';

export default class Sheet extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.users)
    let users = Object.keys(this.props.users);
    let rowData = [];
    users.forEach(thing => {
      rowData[thing] = {
        id: thing,
        status: 'something'
      }
    })
    this.state = {
      users: rowData
    }
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <p>hi</p>
        <DataTable
        rows={this.state.users}
        headers={[
          {key: 'id',header: 'Name'},
          {key: 'status',header: 'Status'},
        ]}
        useZebraStyles={false}
        size={null}
        stickyHeader={false}
        render={({ rows, headers, getHeaderProps }) => (
                <TableContainer title="DataTable">
                  <Table>
                    <TableHead>
                      <TableRow>
                        {headers.map(header => (
                          <TableHeader {...getHeaderProps({ header })}>
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.id}>
                          {row.cells.map(cell => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
      />
    </div>
    )
  }

}
