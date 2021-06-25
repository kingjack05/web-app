import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

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
                        <span class="material-icons-outlined" onClick={this.onToggle}>
                            expand_less
                        </span>
                    ) : (
                        <span class="material-icons-outlined" onClick={this.onToggle}>
                            expand_more
                        </span>
                    )}
                </Summary>
                <Details show={this.state.show}>{this.props.children}</Details>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Accordion)
