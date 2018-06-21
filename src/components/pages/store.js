
import {
    createStore,
    combineReducers,
} from "redux"

import { reducer as tooltip } from "redux-tooltip"


export const initStore = () => {

    return createStore(combineReducers({ tooltip }))
}
