import React, { Component } from "react"
import { connect } from "react-redux"
import {
    convertFromRaw,
    Editor,
    EditorState,
    RichUtils,
    CompositeDecorator,
    Modifier,
} from "draft-js"
import Downshift from "downshift"
import "draft-js/dist/Draft.css"
import styled from "styled-components"

import ExportsComponent from "./ExportsComponent"

const EditorWrapper = styled.div`
    div.DraftEditor-root {
        border: 1px solid #000;
        background-color: beige;
        height: 200px;
        width: 300px;
        overflow-y: auto;
    }
    div.DraftEditor-editorContainer,
    div.public-DraftEditor-content {
        height: 100%;
    }
`

const decorator = new CompositeDecorator([
    {
        strategy: findExportsEntity,
        component: ExportsComponent,
    },
])
function findExportsEntity(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity()
        return entityKey !== null && contentState.getEntity(entityKey).getType() === "EXPORTS"
    }, callback)
}

const DatapointSelector = ({ items, onSelect }) => {
    return (
        <Downshift
            onChange={(selection) => {
                onSelect(selection, selection)
            }}
            itemToString={(item) => (item ? item.name : "")}
        >
            {({
                getInputProps,
                getItemProps,
                getMenuProps,
                getLabelProps,
                getToggleButtonProps,
                inputValue,
                isOpen,
            }) => (
                <div>
                    <label {...getLabelProps()}>Add datapoint:</label>
                    <input {...getInputProps()} />
                    <button {...getToggleButtonProps()} aria-label={"toggle menu"}>
                        &#8595;
                    </button>
                    <ul {...getMenuProps()}>
                        {isOpen &&
                            items
                                .filter((item) => !inputValue || item.name.includes(inputValue))
                                .map((item, index) => (
                                    <li
                                        {...getItemProps({
                                            key: `${item.name}${index}`,
                                            item,
                                            index,
                                        })}
                                    >
                                        {item.name}
                                    </li>
                                ))}
                    </ul>
                </div>
            )}
        </Downshift>
    )
}

export class ExportsEditor extends Component {
    constructor(props) {
        super(props)
        const editorState = this.props.value
            ? convertFromRaw(this.props.value, decorator)
            : EditorState.createEmpty(decorator)
        this.state = { editorState }
        this.onChange = (editorState) => {
            this.setState({ editorState })
            this.props.onChange(editorState)
        }
        this.handleKeyCommand = this.handleKeyCommand.bind(this)
    }
    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command)

        if (newState) {
            this.onChange(newState)
            return "handled"
        }
        return "not-handled"
    }
    _insertExportsComponent = (label, meta) => {
        console.log(label, meta)
        const editorState = this.state.editorState
        const currentContent = editorState.getCurrentContent()
        const selection = editorState.getSelection()
        const newContentState = currentContent.createEntity("EXPORTS", "IMMUTABLE", meta)
        const entityKey = newContentState.getLastCreatedEntityKey()
        const textWithEntity = Modifier.replaceText(
            newContentState,
            selection,
            label.name,
            null,
            entityKey
        )

        this.setState({
            editorState: EditorState.push(editorState, textWithEntity, "insert-characters"),
        })
    }
    render() {
        return (
            <EditorWrapper>
                <DatapointSelector
                    items={this.props.module.availableDatapoints}
                    onSelect={this._insertExportsComponent}
                />
                <Editor
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                />
            </EditorWrapper>
        )
    }
}

const mapStateToProps = (state) => ({ module: state.module })

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExportsEditor)
