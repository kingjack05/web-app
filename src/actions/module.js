import api from "../api"
import {
    CREATE_NEW_PUBLIC_MODULE,
    READ_MODULE,
    GET_MY_MODULES,
    UPDATE_MODULE,
    DELETE_MODULE,
    TOGGLE_MODULE_LIST_STATE_PUBLIC_OR_PRIVATE,
    CHANGE_MODULE_LIST_STATE_CATEGORY,
} from "../actiontypes"

export const createNewPublicModule = (formValues) => async (dispatch, getState) => {
    const response = await api.post(
        "/users/me/createModule/PublicStandardModule",
        formValues,
        getState().auth.authConfig
    )

    dispatch({ type: CREATE_NEW_PUBLIC_MODULE, payload: response })
}

export const readModule = (config) => async (dispatch, getState) => {
    let response
    if (config.public && config.category === "Standard") {
        response = await api.get(`publicStandardModule/${config.params.id}`)
    }

    dispatch({ type: READ_MODULE, payload: response })
}
//Get my modules
export const getMyModules = (config) => async (dispatch, getState) => {
    let response
    if (config.public && config.category === "Standard") {
        response = await api.get("/users/me/PublicStandardModules", getState().auth.authConfig)
    }

    dispatch({ type: GET_MY_MODULES, payload: response })
}

export const updateModule = () => async (dispatch, getState) => {
    let response

    dispatch({ type: UPDATE_MODULE, payload: response })
}

export const deleteModule = (config) => async (dispatch, getState) => {
    const response = await api.delete(`/users/me/module/${config.category}/${config.id}`, getState().auth.authConfig)

    dispatch({ type: DELETE_MODULE, payload: response })
}

export const toggleModuleListStatePublicOrPrivate = () => async (dispatch, getState) => {
    const oldState = getState().module.moduleListState
    const newState = { ...oldState, public: !oldState.public }

    dispatch({ type: TOGGLE_MODULE_LIST_STATE_PUBLIC_OR_PRIVATE, payload: newState })
}

export const changeModuleListStateCategory = (category) => async (dispatch, getState) => {
    const oldState = getState().module.moduleListState
    const newState = { ...oldState, category }

    dispatch({ type: CHANGE_MODULE_LIST_STATE_CATEGORY, payload: newState })
}
