import React, { Component } from "react"
import { connect } from "react-redux"
import history from "../../history"

import Tablist from "../Utilities/Tablist"

const tabs = [
    { label: "User", component: () => <div>User</div> },
    {
        label: "Admin",
        component: () => (
            <div>
                <button
                    onClick={() => {
                        history.push("/admin/create/datapoint")
                    }}
                >
                    Create datapoint
                </button>
            </div>
        ),
    },
]

export class Settings extends Component {
    render() {
        return (
            <div>
                <Tablist tabs={tabs} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ auth: state.auth })

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
