import { combineReducers } from "redux"

import authReducer from "./authReducer"
import modalReducer from "./modalReducer"
import patientReducer from "./patientReducer"
import searchReducer from "./searchReducer"

export default combineReducers({
    auth: authReducer,
    modal: modalReducer,
    patient: patientReducer,
    search: searchReducer,
})
