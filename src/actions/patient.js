import api from "../api"
import {
    CREATE_NEW_PATIENT,
    READ_PATIENT_LIST,
    UPDATE_PATIENT_DATA,
    DELETE_PATIENT_DATA,
} from "../actiontypes"

export const createNewPatient = (formValues) => async (dispatch, getState) => {
    const response = await api.post(
        "/users/me/addPatient",
        formValues,
        getState().auth.authConfig
    )

    dispatch({ type: CREATE_NEW_PATIENT, payload: response })
}

export const readPatientList = () => async (dispatch, getState) => {
    const response = await api.get(
        "/users/me/patients",
        getState().auth.authConfig
    )

    dispatch({ type: READ_PATIENT_LIST, payload: response })
}

export const updatePatientData = (formValues, id) => async (
    dispatch,
    getState
) => {
    const response = await api.patch(
        `/users/me/updatePatient/${id}`,
        formValues,
        getState().auth.authConfig
    )

    dispatch({ type: UPDATE_PATIENT_DATA, payload: response })
}
export const deletePatientData = (id) => async (dispatch, getState) => {
    const response = await api.delete(
        `/users/me/patient/${id}`,
        getState().auth.authConfig
    )

    dispatch({ type: DELETE_PATIENT_DATA, payload: response })
}
