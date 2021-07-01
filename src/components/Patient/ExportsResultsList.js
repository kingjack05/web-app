import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

//Actions
import { toggleNoteExported } from "../../actions/patient"
//Components
import ExportsResult from "./ExportsResult"

const ExportsResultsListContainer = styled.div``
const ToggleExportButton = styled.button`
    background-color: ${(props) => (props.exported ? "#00FF00" : "#FFF000")};
`

export class ExportsResultsList extends Component {
    render() {
        return (
            <div>
                <div>
                    <ToggleExportButton
                        onClick={() => this.props.toggleNoteExported()}
                        exported={this.props.patient.noteExported}
                    >
                        {this.props.patient.noteExported ? "Exported" : "Export"}
                    </ToggleExportButton>
                </div>
                <ExportsResultsListContainer>
                    {this.props.module.moduleData.exports.map((element, index) => (
                        <ExportsResult key={index} name={element.name} value={element.content} />
                    ))}
                </ExportsResultsListContainer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ patient: state.patient, module: state.module })

const mapDispatchToProps = {
    toggleNoteExported,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportsResultsList)
