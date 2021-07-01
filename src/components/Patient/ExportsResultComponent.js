import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

const Wrapper = styled.div`
    position: relative;
    display: inline-flex;
    background-color: ${(props) => (props.exported ? "#00FF00" : "#FFF000")};
`

export class ExportsResultComponent extends Component {
    generateExportedString = (field) => {
        const datapointType = this.props.contentState.getEntity(this.props.entityKey).data
            .datapointType
        const noteData = {
            ...this.props.patient.noteData.workups[this.props.patient.workupIndex].values,
        }
        if (noteData[field]) {
            switch (datapointType) {
                case "String":
                    return noteData[field]
                case "Number":
                    return field + ": " + noteData[field]
                case "Boolean":
                    if (noteData[field] === "true") {
                        return field
                    } else if (noteData[field] === "false") {
                        return "No " + field
                    }
                    break
                default:
                    return field + ": " + noteData[field]
            }
        } else {
            return "No value"
        }
    }
    render() {
        return (
            <Wrapper exported={this.props.patient.noteExported}>
                {this.props.patient.noteExported
                    ? this.generateExportedString(this.props.decoratedText)
                    : this.props.children}
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => ({ patient: state.patient })

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExportsResultComponent)
