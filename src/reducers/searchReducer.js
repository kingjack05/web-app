import {
    SEARCH_DIAGNOSIS_AUTOCOMPLETE,
    SEARCH_DATAPOINT_AUTOCOMPLETE,
} from "../actiontypes"

const INITIAL_STATE = {
    searchDiagnosisAutocompleteResult: [],
    searchDatapointAutocompleteResult: [],
}

const searchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_DIAGNOSIS_AUTOCOMPLETE:
            return {
                ...state,
                searchDiagnosisAutocompleteResult: action.payload.data,
            }
        case SEARCH_DATAPOINT_AUTOCOMPLETE:
            return {
                ...state,
                searchDatapointAutocompleteResult: action.payload.data,
            }
        default:
            return state
    }
}

export default searchReducer
