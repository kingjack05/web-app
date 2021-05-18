import {
    OPEN_CREATE_NEW_PATIENT_MODAL,
    CLOSE_CREATE_NEW_PATIENT_MODAL,
} from "../actiontypes"

const INITIAL_STATE = {
    createNewPatientModalIsOpen: false,
}

const modalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPEN_CREATE_NEW_PATIENT_MODAL:
            return { ...state, createNewPatientModalIsOpen: true }
        case CLOSE_CREATE_NEW_PATIENT_MODAL:
            return { ...state, createNewPatientModalIsOpen: false }
        default:
            return state
    }
}

export default modalReducer
