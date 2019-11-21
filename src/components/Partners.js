import React, { Component } from 'react'

export class Partners extends Component {
    render() {
        return this.props.partners.map((partner) => (
            <p>
                {partner}
                {'  '}
                <button onClick={this.props.delPartner.bind(this, partner)}>Delete</button>
            </p>
        ));
    }
}

export default Partners
