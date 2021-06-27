import {
    CREATE_NEW_PUBLIC_MODULE,
    READ_MODULE,
    GET_MY_MODULES,
    UPDATE_MODULE,
    DELETE_MODULE,
    TOGGLE_MODULE_LIST_STATE_PUBLIC_OR_PRIVATE,
    CHANGE_MODULE_LIST_STATE_CATEGORY,
} from "../actiontypes"

const INITIAL_STATE = {
    availableDatapoints: [],
    moduleData: null,
    modules: [],
    moduleListState: {
        public: true,
        category: "Standard",
    },
    updateResult: null,
}

const moduleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_NEW_PUBLIC_MODULE:
            return state
        case READ_MODULE:
            let moduleDatapoints = []
            action.payload.data.content.forEach((element) => {
                element.content.forEach((element) => {
                    moduleDatapoints.push(element.field)
                })
            })
            return {
                ...state,
                moduleData: action.payload.data,
                availableDatapoints: moduleDatapoints,
            }
        case GET_MY_MODULES:
            if (action.payload.status === 200) {
                return {
                    ...state,
                    modules: action.payload.data,
                }
            } else {
                return state
            }
        case UPDATE_MODULE:
            console.log(action.payload.data)
            if (action.payload.status === 200) {
                return {
                    ...state,
                    updateResult: "Successful update!",
                }
            } else {
                return state
            }
        case DELETE_MODULE:
            return state
        case TOGGLE_MODULE_LIST_STATE_PUBLIC_OR_PRIVATE:
            return { ...state, moduleListState: action.payload }
        case CHANGE_MODULE_LIST_STATE_CATEGORY:
            return { ...state, moduleListState: action.payload }
        default:
            return state
    }
}

export default moduleReducer
