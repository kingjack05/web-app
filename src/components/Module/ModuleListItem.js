import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import { getMyModules, deleteModule } from "../../actions/module"

const Name = styled.span`
    font-family: "Philosopher", serif;
    font-size: large;
    padding: 1px 10px;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

export class ModuleListItem extends Component {
    handleDelete = async (event) => {
        event.stopPropagation()
        await this.props.deleteModule({ category: this.props.category, id: this.props.id })
        await this.props.getMyModules(this.props.module.moduleListState)
    }
    render() {
        return (
            <Wrapper>
                <Name>{this.props.name}</Name>
                <span
                    onClick={this.handleDelete}
                    style={{
                        cursor: "pointer",
                    }}
                >
                    ❌
                </span>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => ({ module: state.module })

const mapDispatchToProps = { getMyModules, deleteModule }

export default connect(mapStateToProps, mapDispatchToProps)(ModuleListItem)
