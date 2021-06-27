import React, { Component } from "react"
import styled from "styled-components"

//*Takes an array of [{label, component(render prop: please pass in a function)}] as props and renders accordingly

const TabContainers = styled.div`
    display: inline-flex;
`
const RenderedComponent = styled.div``
const Tab = styled.span`
    ${(props) => (props.active ? "background: #FFDE03" : "")}
`

export default class Tablist extends Component {
    state = {
        activeTab: 0,
    }

    render() {
        return (
            <div>
                <TabContainers>
                    {this.props.tabs.map((element, index) => (
                        <Tab
                            key={element.label}
                            onClick={(event) => {
                                event.preventDefault()
                                this.setState({ activeTab: index })
                            }}
                            active={this.state.activeTab === index}
                        >
                            {element.label}
                        </Tab>
                    ))}
                </TabContainers>
                <RenderedComponent>
                    {this.props.tabs[this.state.activeTab].component()}
                </RenderedComponent>
            </div>
        )
    }
}
