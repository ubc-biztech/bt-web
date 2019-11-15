import React, { Component } from 'react'
import { setEvent, setPage } from "../actions/indexActions";
import { connect } from "react-redux";

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pw: '',
            verified: false
        }
    }

    handleChange = (e) => {
        this.setState({ pw: e.target.value });
    }

    handleSubmit = (e) => {
        /* replace the value of v with backend function*/
        const v = this.state.pw === 'password';
        this.setState({ verified: v });
        this.setState({ pw: '' })
        if (v) {
            this.props.setPage('home');
        }
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    Enter Password<br />
                    <input type='password' onChange={this.handleChange} value={this.state.pw} />
                    <input type='submit' value='Submit' />
                    {/* following paragraph element can be deleted - it's just used to demonstrate that verified is being changed*/}
                    <p>{this.state.verified.toString()}</p>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        page: state.pageState.page
    };
};

export default connect(mapStateToProps, { setEvent, setPage })(Login);

