import api from "../api"
import {
    SEARCH_DIAGNOSIS_AUTOCOMPLETE,
    SEARCH_DATAPOINT_AUTOCOMPLETE,
    SEARCH_DRUG_AUTOCOMPLETE,
    GET_DIAGNOSIS_DETAIL,
    GET_DATAPOINT_DETAIL,
    GET_DRUG_DETAIL,
} from "../actiontypes"

export const searchDatapointAutocomplete = (formValues) => async (dispatch, getState) => {
    const response = await api.get("/search/datapoint", {
        params: { query: `${formValues}` },
    })

    dispatch({ type: SEARCH_DATAPOINT_AUTOCOMPLETE, payload: response })
}

export const searchDiagnosisAutocomplete = (formValues) => async (dispatch, getState) => {
    const response = await api.get("/search/diagnosis", {
        params: { query: `${formValues}` },
    })

    dispatch({ type: SEARCH_DIAGNOSIS_AUTOCOMPLETE, payload: response })
}

export const searchDrugAutocomplete = (formValues) => async (dispatch, getState) => {
    const response = await api.get("/search/drug", {
        params: { query: `${formValues}` },
    })

    dispatch({ type: SEARCH_DRUG_AUTOCOMPLETE, payload: response })
}

export const getDatapointDetail = (id) => async (dispatch, getState) => {
    const response = await api.get(`/datapoint/${id}`)

    dispatch({ type: GET_DATAPOINT_DETAIL, payload: response })
}

export const getDiagnosisDetail = (id) => async (dispatch, getState) => {
    const response = await api.get(`/diagnosis/${id}`)

    dispatch({ type: GET_DIAGNOSIS_DETAIL, payload: response })
}

export const getDrugDetail = (id) => async (dispatch, getState) => {
    const response = await api.get(`/drug/${id}`)

    dispatch({ type: GET_DRUG_DETAIL, payload: response })
}
