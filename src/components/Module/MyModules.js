import React, { Component } from "react"
import { connect } from "react-redux"
//Components
import Switch from "@material-ui/core/Switch"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"

import ModuleListItem from "./ModuleListItem"
//Actions
import {
    getMyModules,
    toggleModuleListStatePublicOrPrivate,
    changeModuleListStateCategory,
} from "../../actions/module"
import styled from "styled-components"

const TopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const Title = styled.h1`
    margin: 0px;
`
const ToggleGroup = styled.div``
const CategoryToggle = styled.div``

export class MyModules extends Component {
    componentDidMount() {
        this.props.getMyModules(this.props.module.moduleListState)
    }
    renderMyModules = () => {
        //Passes props id, name, public and category to <ModuleListItem />
        return this.props.module.modules.map((element) => {
            const { _id, name } = element
            return (
                <div key={_id}>
                    <ModuleListItem
                        id={_id}
                        name={name}
                        public={this.props.module.moduleListState.public}
                        category={this.props.module.moduleListState.category}
                    />
                </div>
            )
        })
    }
    handleCategoryChange = (event) => {
        this.props.changeModuleListStateCategory(event.target.value)
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
                        <span>
                            {this.props.module.moduleListState.public ? "Public" : "Private"}
                        </span>
                        <CategoryToggle onChange={this.onChangeCategory}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Category</FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="category"
                                    name="category"
                                    value={this.props.module.moduleListState.category}
                                    onChange={this.handleCategoryChange}
                                >
                                    <FormControlLabel
                                        value="Standard"
                                        control={<Radio />}
                                        label="Standard"
                                    />
                                    <FormControlLabel
                                        value="DecisionTree"
                                        control={<Radio />}
                                        label="Decision Tree"
                                        disabled
                                    />
                                </RadioGroup>
                            </FormControl>
                        </CategoryToggle>
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

const mapDispatchToProps = {
    getMyModules,
    toggleModuleListStatePublicOrPrivate,
    changeModuleListStateCategory,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModules)
