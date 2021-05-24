import React, { Component } from "react"
import { connect } from "react-redux"

// import api from "../api"
import history from "../history"

import { Mobile, Default } from "./Viewport"
import PatientList from "./Patient/PatientList"

export class Mainpage extends Component {
    componentDidMount() {
        if (!this.props.auth.isSignedIn) {
            history.push("/signIn")
        }
    }

    render() {
        return (
            <div>
                <Default>
                    <PatientList></PatientList>
                </Default>
                <Mobile>Mobile view!</Mobile>
                <nav></nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ auth: state.auth })

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Mainpage)
