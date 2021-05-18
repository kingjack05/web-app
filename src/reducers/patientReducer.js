import {
    CREATE_NEW_PATIENT,
    READ_PATIENT_LIST,
    UPDATE_PATIENT_DATA,
    DELETE_PATIENT_DATA,
} from "../actiontypes"

const INTIAL_STATE = {
    patients: [],
    readPatients: false,
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
        case UPDATE_PATIENT_DATA:
            return state
        case DELETE_PATIENT_DATA:
            return state
        default:
            return state
    }
}

export default patientReducer
