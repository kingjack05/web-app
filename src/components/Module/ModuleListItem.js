import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import history from "../../history"

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
    onClick = () => {
        history.push(
            `/module/${this.props.public ? "Public" : "Private"}/${this.props.category}/${
                this.props.id
            }`
        )
    }
    handleDelete = async (event) => {
        const publicOrNot = this.props.public ? "public" : "private"
        event.stopPropagation()
        await this.props.deleteModule({
            category: publicOrNot + this.props.category,
            id: this.props.id,
        })
        await this.props.getMyModules(this.props.module.moduleListState)
    }
    render() {
        return (
            <Wrapper onClick={this.onClick}>
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
