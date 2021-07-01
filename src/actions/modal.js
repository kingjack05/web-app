import {
    OPEN_CREATE_NEW_PATIENT_MODAL,
    CLOSE_CREATE_NEW_PATIENT_MODAL,
    OPEN_CREATE_NEW_NOTE_MODAL,
    CLOSE_CREATE_NEW_NOTE_MODAL,
    OPEN_IMPORT_MODULE_MODAL,
    CLOSE_IMPORT_MODULE_MODAL,
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

export const openCreateNewNoteModal = () => {
    return {
        type: OPEN_CREATE_NEW_NOTE_MODAL,
    }
}
export const closeCreateNewNoteModal = () => {
    return {
        type: CLOSE_CREATE_NEW_NOTE_MODAL,
    }
}
export const openImportModuleModal = () => {
    return {
        type: OPEN_IMPORT_MODULE_MODAL,
    }
}
export const closeImportModuleModal = () => {
    return {
        type: CLOSE_IMPORT_MODULE_MODAL,
    }
}
