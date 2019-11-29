import React, { Component } from 'react'

export class AddPartner extends Component {
    state = {
        partner: ''
    }

    handleChange = (e) => {
        this.setState({ partner: e.target.value })
    }

    handleAdd = (e) => {
        e.preventDefault();
        if (this.state.partner !== '') {
            this.props.addPartner(this.state.partner);
            this.setState({ partner: '' })
        }
    }

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.handleAdd(e);
        }
    }


    render() {
        return (
            <div style={{ display: 'flex' }}>
                <input
                    type="text"
                    name="partner"
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Add Partner..."
                    onChange={this.handleChange}
                    value={this.state.partner}
                    onKeyPress={this.handleKeyPress} />
                <button
                    type="button"
                    style={{ flex: '1' }}
                    onClick={this.handleAdd}>Add Partner</button>
            </div>
        )
    }
}

export default AddPartner
