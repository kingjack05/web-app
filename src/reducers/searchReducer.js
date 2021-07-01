import {
    SEARCH_DIAGNOSIS_AUTOCOMPLETE,
    SEARCH_DATAPOINT_AUTOCOMPLETE,
    SEARCH_DRUG_AUTOCOMPLETE,
    GET_DIAGNOSIS_DETAIL,
    GET_DATAPOINT_DETAIL,
    GET_DRUG_DETAIL,
    SEARCH_PUBLIC_MODULE,
} from "../actiontypes"

const INITIAL_STATE = {
    searchDiagnosisAutocompleteResult: [],
    searchDatapointAutocompleteResult: [],
    searchDrugAutocompleteResult: [],
    diagnosisDetail: null,
    datapointDetail: null,
    drugDetail: null,
    searchPublicModuleResult: [],
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
        case SEARCH_DRUG_AUTOCOMPLETE:
            return { ...state, searchDrugAutocompleteResult: action.payload.data }
        case GET_DIAGNOSIS_DETAIL:
            return { ...state, diagnosisDetail: action.payload.data }
        case GET_DATAPOINT_DETAIL:
            return { ...state, datapointDetail: action.payload.data }
        case GET_DRUG_DETAIL:
            return { ...state, drugDetail: action.payload.data }
        case SEARCH_PUBLIC_MODULE:
            return { ...state, searchPublicModuleResult: action.payload.data }
        default:
            return state
    }
}

export default searchReducer
