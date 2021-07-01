import React, { Component } from "react"
import styled from "styled-components"
import { ChevronUp, ChevronDown } from "@styled-icons/boxicons-regular"

const Summary = styled.div`
    display: flex;
    justify-content: space-between;
    border: solid;
`
const Details = styled.div`
    display: ${(props) => (props.show ? "block" : "none")};
    border: solid;
`
//takes summary and childern as props
export class Accordion extends Component {
    state = {
        show: false,
    }
    onToggle = () => {
        this.setState({ show: !this.state.show })
    }
    render() {
        return (
            <div>
                <Summary>
                    <span>{this.props.summary}</span>
                    {this.state.show ? (
                        <ChevronUp size="24" onClick={this.onToggle} />
                    ) : (
                        <ChevronDown size="24" onClick={this.onToggle} />
                    )}
                </Summary>
                <Details show={this.state.show}>{this.props.children}</Details>
            </div>
        )
    }
}

export default Accordion
