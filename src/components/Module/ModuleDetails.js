import React, { Component } from "react"
import { connect } from "react-redux"

import { readModule } from "../../actions/module"

export class ModuleDetails extends Component {
    componentDidMount() {
        this.props.readModule({ id: this.props.id })
    }
    render() {
        return <div>My id is {this.props.id}</div>
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    readModule,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleDetails)
