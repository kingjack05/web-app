import React, { Component } from "react"
import { connect } from "react-redux"
//Components
import Tablist from "../Utilities/Tablist"
import ModuleToWorkup from "./ModuleToWorkup"
import ExportsResultsList from "./ExportsResultsList"

export class Workup extends Component {
    tabs = [
        { label: "Workup", component: () => <ModuleToWorkup /> },
        { label: "Exports", component: () => <ExportsResultsList /> },
    ]
    render() {
        return (
            <div>
                <Tablist tabs={this.tabs} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Workup)
