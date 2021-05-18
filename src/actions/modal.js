import {
    OPEN_CREATE_NEW_PATIENT_MODAL,
    CLOSE_CREATE_NEW_PATIENT_MODAL,
} from "../actiontypes"

export const openCreateNewPatientModal = () => {
    return {
        type: OPEN_CREATE_NEW_PATIENT_MODAL,
    }
}

export const closeCreateNewPatientModal = () => {
    return {
        type: CLOSE_CREATE_NEW_PATIENT_MODAL,
    }
}
