import api from "../api"
import {
    UPDATE_DIAGNOSIS_DATA,
    UPDATE_DATAPOINT_DATA,
    UPDATE_DRUG_DATA,
    CREATE_DIAGNOSIS_DATA,
    CREATE_DATAPOINT_DATA,
    CREATE_DRUG_DATA,
} from "../actiontypes"

export const createDiagnosisData = (formValues) => async (dispatch, getState) => {
    const response = await api.post(
        "/admin/create/diagnosis",
        formValues,
        getState().auth.authConfig
    )

    dispatch({ type: CREATE_DIAGNOSIS_DATA, payload: response })
}

export const createDatapointData = (formValues) => async (dispatch, getState) => {
    const response = await api.post(
        "/admin/create/datapoint",
        formValues,
        getState().auth.authConfig
    )

    dispatch({ type: CREATE_DATAPOINT_DATA, payload: response })
}

export const createDrugData = (formValues) => async (dispatch, getState) => {
    const response = await api.post("/admin/create/drug", formValues, getState().auth.authConfig)

    dispatch({ type: CREATE_DRUG_DATA, payload: response })
}

export const updateDiagnosisData = (id, formValues) => async (dispatch, getState) => {
    const response = await api.post(
        `/admin/update/diagnosis/${id}`,
        formValues,
        getState().auth.authConfig
    )

    dispatch({ type: UPDATE_DIAGNOSIS_DATA, payload: response })
}
export const updateDatapointData = (id, formValues) => async (dispatch, getState) => {
    const response = await api.post(
        `/admin/update/datapoint/${id}`,
        formValues,
        getState().auth.authConfig
    )

    dispatch({ type: UPDATE_DATAPOINT_DATA, payload: response })
}
export const updateDrugData = (id, formValues) => async (dispatch, getState) => {
    const response = await api.post(
        `/admin/update/drug/${id}`,
        formValues,
        getState().auth.authConfig
    )

    dispatch({ type: UPDATE_DRUG_DATA, payload: response })
}
