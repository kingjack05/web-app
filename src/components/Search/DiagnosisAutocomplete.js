import React, { Component } from "react"
import { connect } from "react-redux"
import Downshift from "downshift"

import { searchDiagnosisAutocomple } from "../actions/search"

export class DiagnosisAutocomplete extends Component {
    handleonChange = () => {}
    handleonInput = (event) => {
        if (event.target.value.length >= 4) {
            this.props.searchDiagnosisAutocomple(event.target.value)
        }
    }
    render() {
        return (
            <div>
                <Downshift onChange={this.handleonChange}>
                    {({
                        getInputProps,
                        getItemProps,
                        getMenuProps,
                        isOpen,
                        highlightedIndex,
                        getRootProps,
                    }) => (
                        <div>
                            <div
                                style={{ display: "inline-block" }}
                                {...getRootProps(
                                    {},
                                    { suppressRefError: true }
                                )}
                            >
                                <input
                                    {...getInputProps({
                                        onInput: this.handleonInput,
                                    })}
                                />
                            </div>
                            <ul {...getMenuProps()}>
                                {isOpen
                                    ? this.props.search.searchDiagnosisAutocompleteResult.map(
                                          (item, index) => (
                                              <li
                                                  {...getItemProps({
                                                      key: item._id,
                                                      index,
                                                      item,
                                                      style: {
                                                          backgroundColor:
                                                              highlightedIndex ===
                                                              index
                                                                  ? "lightgray"
                                                                  : "white",
                                                      },
                                                  })}
                                              >
                                                  {item.name}
                                              </li>
                                          )
                                      )
                                    : null}
                            </ul>
                        </div>
                    )}
                </Downshift>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ search: state.search })

const mapDispatchToProps = { searchDiagnosisAutocomple }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DiagnosisAutocomplete)
