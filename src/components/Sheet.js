import React, { Component } from 'react'
import { DataTable, Table, TableRow, TableBody, TableCell, TableHead, TableHeader, TableContainer } from 'carbon-components-react';

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
        <DataTable
        rows={this.state.users}
        headers={[
          {key: 'id',header: 'Student ID'},
          {key: 'name',header: 'Name'},
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
