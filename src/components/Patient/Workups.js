import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import history from "../../history"
//Actions
import { openImportModuleModal } from "../../actions/modal"
import { setWorkupIndex } from "../../actions/patient"
//Components
import ImportModuleModal from "./ImportModuleModal"

const WorkupListItemContainer = styled.div``
const WorkupListItem = styled.div`
    display: flex;
    justify-content: space-between;
`

export class Workups extends Component {
    render() {
        return (
            <div>
                <button onClick={() => this.props.openImportModuleModal()}>Import module</button>
                <ImportModuleModal />
                <WorkupListItemContainer>
                    {this.props.patient.noteData
                        ? this.props.patient.noteData.workups.map((element, index) => (
                              <WorkupListItem
                                  key={index}
                                  onClick={() => {
                                      this.props.setWorkupIndex(index)
                                      history.push("/workup")
                                  }}
                              >
                                  <span>
                                      {element.moduleName +
                                          " @" +
                                          new Date(element.createdAt).getMonth() +
                                          new Date(element.createdAt).getDate()}
                                  </span>
                                  <span
                                      onClick={(event) => {
                                          event.preventDefault()
                                      }}
                                      style={{
                                          cursor: "pointer",
                                      }}
                                  >
                                      ❌
                                  </span>
                              </WorkupListItem>
                          ))
                        : "No workups yet"}
                </WorkupListItemContainer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ patient: state.patient })

const mapDispatchToProps = { openImportModuleModal, setWorkupIndex }

export default connect(mapStateToProps, mapDispatchToProps)(Workups)
