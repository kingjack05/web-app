import { SIGN_UP, SIGN_IN, SIGN_OUT } from "../actiontypes"

const INTIAL_STATE = {
    isSignedIn: null,
    userId: null,
    token: null,
    authConfig: null,
}

const authReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                isSignedIn: true,
                userId: action.payload.data.user._id,
                token: action.payload.data.token,
                authConfig: {
                    headers: {
                        Authorization: `Bearer ${action.payload.data.token}`,
                    },
                },
            }
        case SIGN_IN:
            return {
                ...state,
                isSignedIn: true,
                userId: action.payload.data.user._id,
                token: action.payload.data.token,
                authConfig: {
                    headers: {
                        Authorization: `Bearer ${action.payload.data.token}`,
                    },
                },
            }
        case SIGN_OUT:
            return {
                ...state,
                isSignedIn: false,
                userId: null,
                token: null,
                authConfig: null,
            }
        default:
            return state
    }
}

export default authReducer
