import React, { Component } from "react"
import { connect } from "react-redux"
import { getDatapointDetail } from "../../actions/search"
import { updateDiagnosisData } from "../../actions/admin"

import SchemaToForm from "./SchemaToForm"

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

export class DatapointDetails extends Component {
    componentDidMount() {
        this.props.getDatapointDetail(this.props.id)
    }
    onUpdate = (formValues) => {
        this.props.updateDiagnosisData(this.props.id, formValues)
    }
    render() {
        return (
            <div>
                <SchemaToForm
                    schema={datapointSchema}
                    onSubmit={this.onUpdate}
                    initialValues={this.props.search.datapointDetail}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ auth: state.auth, search: state.search })

const mapDispatchToProps = { getDatapointDetail, updateDiagnosisData }

export default connect(mapStateToProps, mapDispatchToProps)(DatapointDetails)
