import {
    CREATE_NEW_PATIENT,
    READ_PATIENT_LIST,
    READ_PATIENT_DATA,
    UPDATE_PATIENT_DATA,
    DELETE_PATIENT_DATA,
    READ_PATIENT_NOTE_LIST,
    CREATE_PATIENT_NOTE,
    READ_PATIENT_NOTE,
    UPDATE_PATIENT_NOTE,
    DELETE_PATIENT_NOTE,
    SET_WORKUP_INDEX,
    TOGGLE_NOTE_EXPORTED,
} from "../actiontypes"

const INTIAL_STATE = {
    patientData: null,
    patients: [],
    readPatients: false,
    notes: [],
    noteData: null,
    workupIndex: 0,
    noteExported: false,
}

const patientReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_NEW_PATIENT:
            return state
        case READ_PATIENT_LIST:
            if (action.payload.status === 200) {
                return {
                    ...state,
                    patients: action.payload.data,
                    readPatients: true,
                }
            } else {
                return state
            }
        case READ_PATIENT_DATA:
            return { ...state, patientData: action.payload.data }
        case UPDATE_PATIENT_DATA:
            return state
        case DELETE_PATIENT_DATA:
            return state
        case READ_PATIENT_NOTE_LIST:
            return { ...state, notes: action.payload.data }
        case CREATE_PATIENT_NOTE:
            return state
        case READ_PATIENT_NOTE:
            return { ...state, noteData: action.payload.data }
        case UPDATE_PATIENT_NOTE:
            return state
        case DELETE_PATIENT_NOTE:
            return state
        case SET_WORKUP_INDEX:
            return { ...state, workupIndex: action.payload }
        case TOGGLE_NOTE_EXPORTED:
            return { ...state, noteExported: !state.noteExported }
        default:
            return state
    }
}

export default patientReducer
