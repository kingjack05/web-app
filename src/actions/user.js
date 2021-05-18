import api from "../api"
import history from "../history"
import { SIGN_UP, SIGN_IN, SIGN_OUT } from "../actiontypes"

export const signUp = (formValues) => async (dispatch, getState) => {
    const response = await api.post("/users", formValues)

    dispatch({ type: SIGN_UP, payload: response })
    history.push("/")
}

export const signIn = (formValues) => async (dispatch, getState) => {
    const response = await api.post("/users/login", formValues)

    dispatch({ type: SIGN_IN, payload: response })
    history.push("/")
}

export const signOut = () => {
    return {
        type: SIGN_OUT,
    }
}
