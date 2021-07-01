import api from "../api"
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

export const createNewPatient = (formValues) => async (dispatch, getState) => {
    const response = await api.post("/users/me/addPatient", formValues, getState().auth.authConfig)

    dispatch({ type: CREATE_NEW_PATIENT, payload: response })
}

export const readPatientList = () => async (dispatch, getState) => {
    const response = await api.get("/users/me/patients", getState().auth.authConfig)

    dispatch({ type: READ_PATIENT_LIST, payload: response })
}

export const readPatientData = (config) => async (dispatch, getState) => {
    const response = await api.get(`/users/me/patient/${config.id}`, getState().auth.authConfig)
    dispatch({ type: READ_PATIENT_DATA, payload: response })
}

export const updatePatientData = (formValues, id) => async (dispatch, getState) => {
    const response = await api.patch(
        `/users/me/updatePatient/${id}`,
        formValues,
        getState().auth.authConfig
    )

    dispatch({ type: UPDATE_PATIENT_DATA, payload: response })
}

export const deletePatientData = (id) => async (dispatch, getState) => {
    const response = await api.delete(`/users/me/patient/${id}`, getState().auth.authConfig)

    dispatch({ type: DELETE_PATIENT_DATA, payload: response })
}

export const readPatientNoteList = (patientID) => async (dispatch, getState) => {
    const response = await api.get(`/notes?patientID=${patientID}`, getState().auth.authConfig)

    dispatch({ type: READ_PATIENT_NOTE_LIST, payload: response })
}

export const createPatientNote = (formValues, patientID) => async (dispatch, getState) => {
    const response = await api.post(
        `/notes/create?patientID=${patientID}`,
        formValues,
        getState().auth.authConfig
    )

    dispatch({ type: CREATE_PATIENT_NOTE, payload: response })
}

export const readPatientNote = (noteID, patientID) => async (dispatch, getState) => {
    const response = await api.get(
        `/notes/${noteID}?patientID=${patientID}`,
        getState().auth.authConfig
    )

    dispatch({ type: READ_PATIENT_NOTE, payload: response })
}

export const updatePatientNote = (formValues, noteID, patientID) => async (dispatch, getState) => {
    const response = await api.post(
        `/notes/update/${noteID}?patientID=${patientID}`,
        formValues,
        getState().auth.authConfig
    )

    dispatch({ type: UPDATE_PATIENT_NOTE, payload: response })
}

export const deletePatientNote = (noteID, patientID) => async (dispatch, getState) => {
    const response = await api.delete(
        `/notes/${noteID}?patientID=${patientID}`,
        getState().auth.authConfig
    )

    dispatch({ type: DELETE_PATIENT_NOTE, payload: response })
}

export const setWorkupIndex = (index) => {
    return { type: SET_WORKUP_INDEX, payload: index }
}

export const toggleNoteExported = () => {
    return { type: TOGGLE_NOTE_EXPORTED }
}
