import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import history from "../../history"
//Actions
import { searchPublicModule } from "../../actions/search"
import { readPatientNote, updatePatientNote } from "../../actions/patient"
import { closeImportModuleModal } from "../../actions/modal"

const SearchBarContainer = styled.div`
    display: flex;
`
const SearchResultsContainer = styled.div``
const SearchResultListItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const SearchResultListItem = (props) => {
    return (
        <SearchResultListItemWrapper
            key={props.key}
            onClick={(event) => {
                event.preventDefault()
                history.push("/")
            }}
        >
            <span>{props.name}</span>
            <button
                onClick={(event) => {
                    event.preventDefault()
                    let noteData = props.noteData
                    noteData.workups.push({
                        module: props.id,
                        moduleName: props.name,
                        publicOrNot: true,
                        category: props.category,
                    })
                    props.update(noteData, props.noteID, props.patientID)
                    props.closeModal()
                    props.relaod(props.noteID, props.patientID)
                }}
            >
                Import
            </button>
        </SearchResultListItemWrapper>
    )
}
export class SearchModule extends Component {
    state = {
        category: "Standard",
        searchTerm: null,
    }
    onSearch = async () => {
        await this.props.searchPublicModule(this.state.category, this.state.searchTerm)
    }
    render() {
        return (
            <div>
                <SearchBarContainer>
                    <input
                        value={this.state.searchTerm}
                        onChange={(event) => this.setState({ searchTerm: event.target.value })}
                    />
                    <button onClick={this.onSearch}>Search</button>
                </SearchBarContainer>
                <SearchResultsContainer>
                    {this.props.search.searchPublicModuleResult.map((item, index) => (
                        <SearchResultListItem
                            key={index}
                            name={item.name}
                            id={item._id}
                            category={this.state.category}
                            update={this.props.updatePatientNote}
                            noteID={this.props.patient.noteData._id}
                            noteData={this.props.patient.noteData}
                            patientID={this.props.patient.patientData._id}
                            reload={this.props.readPatientNote}
                            closeModal={this.props.closeImportModuleModal}
                        />
                    ))}
                </SearchResultsContainer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ search: state.search, patient: state.patient })

const mapDispatchToProps = {
    searchPublicModule,
    readPatientNote,
    updatePatientNote,
    closeImportModuleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchModule)
