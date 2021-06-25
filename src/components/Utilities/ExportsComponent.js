import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

const Wrapper = styled.div`
    position: relative;
    display: inline-flex;
`
const Target = styled.button`
    border: none;
    background: 00ffff;
    padding: 5px;
    margin: -1px;
    font-size: inherit;
    color: inherit;
    cursor: inherit;
    display: flex;
`
const CenterContainer = styled.div`
    position: absolute;
    width: 200px;
    margin-left: -100px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 50%;
    pointer-events: none;
    top: calc(100% + 5px);
`
const Box = styled.div`
    position: relative;
    background-color: #00adb5;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 10px 8px;
    font-size: 1.25rem;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.2);
    &:after {
        border-color: transparent transparent #00adb5 transparent;
        width: 1px;
        bottom: 100%;
        left: calc(50% - 5px);
    }
`
export class ExportsComponent extends Component {
    state = {
        show: false,
    }
    componentDidMount() {
        console.log(this.props)
    }
    onCliick = (e) => {
        e.preventDefault()
        this.setState({ show: !this.state.show })
    }
    render() {
        return (
            <Wrapper onClick={this.onCliick}>
                <Target>{this.props.children}</Target>
                {this.state.show && (
                    <CenterContainer>
                        <Box>
                            {JSON.stringify(
                                this.props.contentState.getEntity(this.props.entityKey).data
                            )}
                        </Box>
                    </CenterContainer>
                )}
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExportsComponent)
