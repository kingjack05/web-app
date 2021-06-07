import api from "../api"
import { SEARCH_DIAGNOSIS_AUTOCOMPLETE, SEARCH_DATAPOINT_AUTOCOMPLETE } from "../actiontypes"

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
