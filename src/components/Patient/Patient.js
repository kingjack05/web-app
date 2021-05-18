import React, { Component } from "react"
import { connect } from "react-redux"

import history from "../../history"

export class Patient extends Component {
    onClick = () => {
        history.push(`/patient/${this.props.id}`)
    }
    render() {
        return <div onClick={this.onClick}>{this.props.title}</div>
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Patient)
