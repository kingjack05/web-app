import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import history from "../../history"

//Actions
import { openCreateNewNoteModal } from "../../actions/modal"
import { readPatientNoteList, createPatientNote, deletePatientNote } from "../../actions/patient"
//Components
import CreateNewNoteModal from "./CreateNewNoteModal"

const NotesContainer = styled.div``
const NoteListItem = styled.div`
    display: flex;
    justify-content: space-between;
`
export class Notes extends Component {
    componentDidMount() {
        this.props.readPatientNoteList(this.props.patientID)
    }
    render() {
        return (
            <div>
                <button onClick={this.props.openCreateNewNoteModal}>Create Note</button>
                <CreateNewNoteModal patientID={this.props.patientID} />
                <NotesContainer>
                    {this.props.patient.notes.map((element, index) => (
                        <NoteListItem key={index}>
                            <span
                                onClick={() =>
                                    history.push(`/note/${element._id}/${this.props.patientID}`)
                                }
                            >
                                {element.title}
                            </span>
                            <span
                                onClick={(event) => {
                                    event.preventDefault()
                                    this.props.deletePatientNote(element._id, this.props.patientID)
                                }}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                ❌
                            </span>
                        </NoteListItem>
                    ))}
                </NotesContainer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ patient: state.patient })

const mapDispatchToProps = {
    openCreateNewNoteModal,
    readPatientNoteList,
    createPatientNote,
    deletePatientNote,
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
