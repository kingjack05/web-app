import React, { Component } from "react"
import { connect } from "react-redux"
import { convertFromRaw, Editor, EditorState, RichUtils, CompositeDecorator } from "draft-js"
import "draft-js/dist/Draft.css"
import styled from "styled-components"
import { ChevronUp, ChevronDown } from "@styled-icons/boxicons-regular"
//Components
import ExportsResultComponent from "./ExportsResultComponent"

const EditorWrapper = styled.div`
    border: solid;
    div.DraftEditor-root {
        border: 1px solid #000;
        background-color: beige;
        height: 400px;
        width: 600px;
        overflow-y: auto;
    }
    div.DraftEditor-editorContainer,
    div.public-DraftEditor-content {
        height: 100%;
    }
`
const ExportsNameWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border: solid;
`
const ExportsName = styled.span``
const ExportsContent = styled.div`
    display: ${(props) => (props.show ? "block" : "none")};
    border: solid;
`

const decorator = new CompositeDecorator([
    {
        strategy: findExportsEntity,
        component: ExportsResultComponent,
    },
])
function findExportsEntity(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity()
        return entityKey !== null && contentState.getEntity(entityKey).getType() === "EXPORTS"
    }, callback)
}
//*takes name and value props
export class ExportsResult extends Component {
    constructor(props) {
        super(props)
        const editorState = this.props.value
            ? EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.value)), decorator)
            : EditorState.createEmpty(decorator)
        this.state = { editorState, show: false }
        this.onChange = (editorState) => {
            this.setState({ editorState })
        }
        this.handleKeyCommand = this.handleKeyCommand.bind(this)
    }
    onToggle = () => {
        this.setState({ show: !this.state.show })
    }
    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command)

        if (newState) {
            this.onChange(newState)
            return "handled"
        }
        return "not-handled"
    }
    render() {
        return (
            <div>
                <ExportsNameWrapper>
                    <ExportsName>{this.props.name}</ExportsName>
                    {this.state.show ? (
                        <ChevronUp size="24" onClick={this.onToggle} />
                    ) : (
                        <ChevronDown size="24" onClick={this.onToggle} />
                    )}
                </ExportsNameWrapper>
                <ExportsContent show={this.state.show}>
                    <EditorWrapper>
                        <Editor
                            editorState={this.state.editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                        />
                    </EditorWrapper>
                </ExportsContent>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ module: state.module })

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExportsResult)
