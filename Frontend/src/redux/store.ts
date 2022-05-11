import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "./slices/userSlice";


let reducers = combineReducers({
    user: userReducer,
});

let store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk, logger)
));

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
