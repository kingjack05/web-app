import React, { Component } from "react"
import { connect } from "react-redux"
//Components
import Switch from "@material-ui/core/Switch"

import ModuleListItem from "./ModuleListItem"
//Actions
import { getMyModules, toggleModuleListStatePublicOrPrivate, changeModuleListStateCategory } from "../../actions/module"
import styled from "styled-components"

const TopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const Title = styled.h1`
    margin: 0px;
`
const ToggleGroup = styled.div``

export class MyModules extends Component {
    componentDidMount() {
        this.props.getMyModules({ public: true, category: "Standard" })
    }
    renderMyModules = () => {
        return this.props.module.modules.map((element) => {
            const { _id, name } = element
            return (
                <div key={_id}>
                    <ModuleListItem id={_id} name={name} />
                </div>
            )
        })
    }
    render() {
        return (
            <div>
                <TopWrapper>
                    <Title>My modules</Title>
                    <ToggleGroup>
                        <Switch
                            checked={this.props.module.moduleListState.public}
                            onChange={this.props.toggleModuleListStatePublicOrPrivate}
                        />
                        <span>{this.props.module.moduleListState.public ? "Public" : "Private"}</span>
                    </ToggleGroup>
                </TopWrapper>
                {this.renderMyModules()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    module: state.module,
})

const mapDispatchToProps = { getMyModules, toggleModuleListStatePublicOrPrivate, changeModuleListStateCategory }

export default connect(mapStateToProps, mapDispatchToProps)(MyModules)
