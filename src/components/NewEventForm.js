import React, { Component } from 'react'
import AddPartner from './AddPartner'
import Partners from './Partners'


export class NewEventForm extends Component {

    state = {
        title: '',
        description: '',
        capacity: 0,
        partners: [],
        date: '',
        location: ''

    }

    handleChange = (e) => {
        const name = e.target.tagName;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    addPartner = (partner) => {
        if (!this.state.partners.includes(partner)) {
            this.setState({ partners: [...this.state.partners, partner] })
        }
    }

    delPartner = (partnerName) => {
        this.setState({ partners: [...this.state.partners.filter(partner => partner !== partnerName)] })
    }

    setDate = (e) => {
        this.setState({ date: e.target.value })
    }


    render() {
        return (
            <form>
                <h1>New Event Form</h1>
                <p>Event Name:</p>
                <input
                    name='title'
                    type='text'
                    onChange={this.handleChange}
                    required
                    placeholder="required" />
                <p>Description:</p>
                <textarea
                    name='description'
                    cols="60"
                    rows="10"
                    onChange={this.handleChange}></textarea>
                <p>Capacity:</p>
                <input
                    name='capacity'
                    type="number"
                    min="0"
                    required
                    onChange={this.handleChange}
                    placeholder="required"></input>
                <p>Partners & Sponsors:</p>
                <AddPartner addPartner={this.addPartner} />
                <Partners partners={this.state.partners} delPartner={this.delPartner} />
                <p>Date:</p>
                <input
                    type="date"
                    min={todaysDate()}
                    onChange={this.setDate}></input>
                <p>Location:</p>
                <input
                    name="location"
                    type="text"
                    onChange={this.handleChange}
                    required
                    placeholder="required" />

            </form>

        )
    }
}
const todaysDate = () => {
    let today = new Date();
    let year = today.getFullYear();

    let month = (today.getMonth() + 1) + "";
    month = month.padStart(2, '0');

    let day = today.getDate() + "";
    day = day.padStart(2, '0');
    return year + "-" + month + "-" + day;
}



export default NewEventForm