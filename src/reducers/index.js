import { combineReducers } from "redux"

import authReducer from "./authReducer"
import modalReducer from "./modalReducer"
import patientReducer from "./patientReducer"

export default combineReducers({
    auth: authReducer,
    modal: modalReducer,
    patient: patientReducer,
})
