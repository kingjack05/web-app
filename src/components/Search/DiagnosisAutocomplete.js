import React, { Component } from "react"
import { connect } from "react-redux"
import Downshift from "downshift"
import styled from "styled-components"

import { searchDiagnosisAutocomplete } from "../../actions/search"

const Dropdown = styled.ul`
    height: auto;
    max-height: 8rem;
    overflow-x: hidden;
`

export class DiagnosisAutocomplete extends Component {
    handleonChange = (selectedItem) => {
        this.props.onChange(selectedItem._id)
    }
    handleonInput = (event) => {
        if (event.target.value.length >= 4) {
            this.props.searchDiagnosisAutocomplete(event.target.value)
        }
    }
    render() {
        return (
            <div>
                <Downshift onChange={this.handleonChange} itemToString={(item) => (item ? item.name : "")}>
                    {({ getInputProps, getItemProps, getMenuProps, isOpen, highlightedIndex, getRootProps }) => (
                        <div>
                            <div style={{ display: "inline-block" }} {...getRootProps({}, { suppressRefError: true })}>
                                <input
                                    {...getInputProps({
                                        onInput: this.handleonInput,
                                    })}
                                />
                            </div>
                            <Dropdown {...getMenuProps()}>
                                {isOpen
                                    ? this.props.search.searchDiagnosisAutocompleteResult.map((item, index) => (
                                          <li
                                              {...getItemProps({
                                                  key: item._id,
                                                  index,
                                                  item,
                                                  style: {
                                                      backgroundColor:
                                                          highlightedIndex === index ? "lightgray" : "white",
                                                  },
                                              })}
                                          >
                                              {item.name}
                                          </li>
                                      ))
                                    : null}
                            </Dropdown>
                        </div>
                    )}
                </Downshift>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ search: state.search })

const mapDispatchToProps = { searchDiagnosisAutocomplete }

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosisAutocomplete)
