import {createStore,applyMiddleware} from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { persistStore } from 'redux-persist';

const middleware = [thunk];
if(process.env.NODE_ENV === "development"){
    middleware.push(logger);
}
//const pReducer = persistReducer(persistConfigRoot,rootReducer);
export const store = createStore(rootReducer,applyMiddleware(...middleware));
export const persistor = persistStore(store);





