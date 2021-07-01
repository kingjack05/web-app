import React, { Component } from "react"
import { connect } from "react-redux"

import Modal from "styled-react-modal"
import Tablist from "../Utilities/Tablist"
import SearchModule from "../Search/SearchModule"

import { openImportModuleModal, closeImportModuleModal } from "../../actions/modal"

const StyledModal = Modal.styled`
  width: 60rem;
  height: 60rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
`

const tabs = [
    {
        label: "Search",
        component: () => <SearchModule />,
    },
    {
        label: "My Modules",
        component: () => <div>WIP</div>,
    },
    {
        label: "Starred",
        component: () => <div>WIP</div>,
    },
]

export class ImportModuleModal extends Component {
    render() {
        return (
            <div>
                <StyledModal
                    isOpen={this.props.modal.importModuleModalIsOpen}
                    onBackgroundClick={this.props.closeImportModuleModal}
                    onEscapeKeydown={this.props.closeImportModuleModal}
                >
                    <Tablist tabs={tabs} />
                </StyledModal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    modal: state.modal,
})

const mapDispatchToProps = {
    openImportModuleModal,
    closeImportModuleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportModuleModal)
