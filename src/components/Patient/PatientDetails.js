import React, { Component } from "react"
import { connect } from "react-redux"

export class PatientDetails extends Component {
    render() {
        return <div>Details here!</div>
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails)
