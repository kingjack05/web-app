import React, { Component } from "react"
import { connect } from "react-redux"

import { createDatapointData } from "../../actions/admin"

import SchemaToForm from "../Browse/SchemaToForm"

const datapointSchema = [
    { fieldname: "name", data: { type: "String" } },
    {
        fieldname: "datapointType",
        data: {
            type: "Single Choice",
            enum: ["String", "Boolean", "Number", "Single Choice", "Multiple Choice", "Array"],
        },
    },
    {
        fieldname: "category",
        data: {
            type: "Single Choice",
            enum: [
                "Symptom",
                "Sign",
                "Physical Examination",
                "Lab Data",
                "Imaging",
                "Test",
                "Other",
            ],
        },
    },
    { fieldname: "normalValue", data: { type: "String" } },
    { fieldname: "SCTID", data: { type: "String" } },
    { fieldname: "LOINCNUM", data: { type: "String" } },
]

export class CreateDatapoint extends Component {
    onUpdate = (formValues) => {
        this.props.createDatapointData(formValues)
    }
    render() {
        return (
            <div>
                {this.props.auth.userData.authorization === "Administrator" ? (
                    <SchemaToForm schema={datapointSchema} onSubmit={this.onUpdate} />
                ) : (
                    "Access forbidden"
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ auth: state.auth })

const mapDispatchToProps = {
    createDatapointData,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDatapoint)
