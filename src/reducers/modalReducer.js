import {
    OPEN_CREATE_NEW_PATIENT_MODAL,
    CLOSE_CREATE_NEW_PATIENT_MODAL,
    OPEN_CREATE_NEW_NOTE_MODAL,
    CLOSE_CREATE_NEW_NOTE_MODAL,
    OPEN_IMPORT_MODULE_MODAL,
    CLOSE_IMPORT_MODULE_MODAL,
} from "../actiontypes"

const INITIAL_STATE = {
    createNewPatientModalIsOpen: false,
    createNewNoteModalIsOpen: false,
    importModuleModalIsOpen: false,
}

const modalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPEN_CREATE_NEW_PATIENT_MODAL:
            return { ...state, createNewPatientModalIsOpen: true }
        case CLOSE_CREATE_NEW_PATIENT_MODAL:
            return { ...state, createNewPatientModalIsOpen: false }
        case OPEN_CREATE_NEW_NOTE_MODAL:
            return { ...state, createNewNoteModalIsOpen: true }
        case CLOSE_CREATE_NEW_NOTE_MODAL:
            return { ...state, createNewNoteModalIsOpen: false }
        case OPEN_IMPORT_MODULE_MODAL:
            return { ...state, importModuleModalIsOpen: true }
        case CLOSE_IMPORT_MODULE_MODAL:
            return { ...state, importModuleModalIsOpen: false }
        default:
            return state
    }
}

export default modalReducer
