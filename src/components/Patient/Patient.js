import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import history from "../../history"

const Wrapper = styled.div`
    &:hover {
        box-shadow: inset 3px 0px #53caff;
    }
`
const Title = styled.span`
    font-family: "Philosopher", serif;
    font-size: large;
    padding: 1px 10px;
`
const Text = styled.span`
    font-family: "Lora", serif;
    font-size: medium;
`
const PropertyContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export class Patient extends Component {
    onClick = () => {
        history.push(`/patient/${this.props.id}`)
    }
    render() {
        return (
            <Wrapper onClick={this.onClick}>
                {" "}
                <PropertyContainer>
                    <Title>{this.props.title}</Title>
                    <Text>{`${this.props.age} year-old ${
                        this.props.sex ? "male" : "female"
                    }`}</Text>
                </PropertyContainer>
                <div></div>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Patient)
