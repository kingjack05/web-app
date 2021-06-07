import { combineReducers } from "redux"

import authReducer from "./authReducer"
import modalReducer from "./modalReducer"
import moduleReducer from "./moduleReducer"
import patientReducer from "./patientReducer"
import searchReducer from "./searchReducer"

export default combineReducers({
    auth: authReducer,
    modal: modalReducer,
    module: moduleReducer,
    patient: patientReducer,
    search: searchReducer,
})
