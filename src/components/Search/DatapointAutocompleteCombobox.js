import React, { Component } from "react"
import { connect } from "react-redux"
import Downshift from "downshift"

import { searchDatapointAutocomplete } from "../../actions/search"

export class DatapointAutocomplete extends Component {
    handleonChange = (selectedItem) => {
        this.props.onChange(selectedItem.name)
    }
    handleonInput = (event) => {
        if (event.target.value.length >= 4) {
            this.props.searchDatapointAutocomplete(event.target.value)
        }
    }
    render() {
        return (
            <div>
                <Downshift
                    onChange={this.handleonChange}
                    itemToString={(item) => (item ? item.name : "")}
                >
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
                                    ? this.props.search.searchDatapointAutocompleteResult.map(
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

const mapDispatchToProps = { searchDatapointAutocomplete }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DatapointAutocomplete)
